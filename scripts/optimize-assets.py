"""Build checked-in image variants and exact-text CJK subsets.

Requires Pillow, fonttools and Brotli. Original media and font subsets remain
available for full-size viewing, future content imports and fallback glyphs.
Normal production builds consume the checked-in outputs without Python.
"""

import json
import re
import sys
from pathlib import Path

from PIL import Image, ImageOps
from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont


def source_path(root, url):
    path = (root / "public" / url.lstrip("/")).resolve()
    if not path.is_relative_to((root / "public").resolve()):
        raise ValueError(f"Asset outside public directory: {url}")
    return path


def webp(image, destination, quality):
    destination.parent.mkdir(parents=True, exist_ok=True)
    image.save(destination, "WEBP", quality=quality, method=6)


def unicode_ranges(points):
    ordered = sorted(points)
    if not ordered:
        return ""
    ranges = []
    start = end = ordered[0]
    for point in ordered[1:]:
        if point == end + 1:
            end = point
        else:
            ranges.append(f"U+{start:X}" if start == end else f"U+{start:X}-{end:X}")
            start = end = point
    ranges.append(f"U+{start:X}" if start == end else f"U+{start:X}-{end:X}")
    return ",".join(ranges)


def parse_ranges(value):
    points = set()
    for interval in value.split(","):
        bounds = interval.strip().upper().removeprefix("U+").split("-")
        start = int(bounds[0], 16)
        end = int(bounds[-1], 16)
        points.update(range(start, end + 1))
    return points


def optimize_images(root, data):
    portraits = {}
    galleries = {}
    for locale in data["locales"].values():
        for person in locale["people"]:
            original_url = person.get("originalPhoto", person["photo"])
            original = source_path(root, original_url)
            stem = original.stem
            photo_url = f"/media/{stem}-profile.webp"
            avatar_url = f"/media/{stem}-avatar-96.webp"
            avatar2x_url = f"/media/{stem}-avatar-144.webp"
            if original_url not in portraits:
                with Image.open(original) as source:
                    image = ImageOps.exif_transpose(source).convert("RGBA")
                    webp(image, source_path(root, photo_url), quality=88)
                    for size, url in [(96, avatar_url), (144, avatar2x_url)]:
                        # Matches the hero's object-fit:cover; object-position:top.
                        avatar = ImageOps.fit(image, (size, size), Image.Resampling.LANCZOS, centering=(0.5, 0))
                        webp(avatar, source_path(root, url), quality=88)
                portraits[original_url] = {
                    "original": original.stat().st_size,
                    "profile": source_path(root, photo_url).stat().st_size,
                    "avatar96": source_path(root, avatar_url).stat().st_size,
                    "avatar144": source_path(root, avatar2x_url).stat().st_size,
                }
            person.update(photo=photo_url, avatar=avatar_url, avatar2x=avatar2x_url, originalPhoto=original_url)
        for group in locale["valuesGallery"]["groups"]:
            for item in group:
                original_url = item.get("fullImage", item["image"])
                original = source_path(root, original_url)
                # Existing 960px WebPs are already suitable previews.
                preview_url = original_url if original.suffix.lower() == ".webp" else f"/media/{original.stem}-preview.webp"
                if original_url not in galleries:
                    if preview_url != original_url:
                        with Image.open(original) as source:
                            image = ImageOps.exif_transpose(source).convert("RGB")
                            image.thumbnail((960, 960), Image.Resampling.LANCZOS)
                            webp(image, source_path(root, preview_url), quality=86)
                    galleries[original_url] = {
                        "original": original.stat().st_size,
                        "preview": source_path(root, preview_url).stat().st_size,
                    }
                item.update(image=preview_url, fullImage=original_url)
    return {"portraits": portraits, "galleries": galleries}


def optimize_fonts(root, specification):
    faces = re.findall(r"@font-face\s*\{[^}]+\}", specification["cssBase"])
    generated = []
    statistics = {}
    for locale, family in [("ja", "Noto Sans JP"), ("ko", "Noto Sans KR")]:
        required = {ord(character) for character in specification["corpora"][locale]}
        original_coverage = set()
        generated_coverage = set()
        original_bytes = generated_bytes = count = 0
        for rule in faces:
            if family not in rule:
                continue
            url = re.search(r'url\(["\']?([^"\')]+)', rule).group(1)
            declared = parse_ranges(re.search(r"unicode-range:\s*([^;]+)", rule).group(1))
            source = source_path(root, url)
            with TTFont(source) as font:
                available = set(font.getBestCmap()).intersection(declared)
                original_coverage.update(available)
                keep = required.intersection(available)
                if not keep:
                    continue
                options = Options()
                options.recalc_timestamp = False
                subsetter = Subsetter(options=options)
                subsetter.populate(unicodes=keep)
                subsetter.subset(font)
                font.flavor = "woff2"
                destination_url = f"/fonts/landing/{source.name}"
                destination = source_path(root, destination_url)
                destination.parent.mkdir(parents=True, exist_ok=True)
                font.save(destination)
            with TTFont(destination) as verification:
                covered = set(verification.getBestCmap())
                if not keep.issubset(covered):
                    raise ValueError(f"Missing glyphs after subsetting {source.name}")
                if "fvar" not in verification or not any(axis.axisTag == "wght" for axis in verification["fvar"].axes):
                    raise ValueError(f"Lost variable weights in {source.name}")
                generated_coverage.update(covered)
            # Later same-family faces take precedence for the known page text;
            # untouched original rules still cover all other existing glyphs.
            generated.append(
                f'@font-face{{font-family:"{family}";font-style:normal;font-weight:300 900;'
                f'font-display:swap;src:url("{destination_url}") format("woff2");'
                f'unicode-range:{unicode_ranges(keep)}}}'
            )
            original_bytes += source.stat().st_size
            generated_bytes += destination.stat().st_size
            count += 1
        expected = required.intersection(original_coverage)
        if not expected.issubset(generated_coverage):
            raise ValueError(f"Page glyph coverage incomplete for {locale}")
        statistics[locale] = {"originalBytes": original_bytes, "subsetBytes": generated_bytes, "files": count, "coveredPageCodepoints": len(expected)}
    (root / "src/cjk-fonts.css").write_text(
        specification["cssBase"] + "\n\n" + specification["generatedMarker"] + "\n" + "\n".join(generated) + "\n"
    )
    return statistics


def main():
    specification = json.loads(Path(sys.argv[1]).read_text())
    root = Path(specification["root"])
    data = specification["data"]
    statistics = optimize_images(root, data)
    statistics["fonts"] = optimize_fonts(root, specification)
    Path(sys.argv[2]).write_text(json.dumps({"data": data, "statistics": statistics}, ensure_ascii=False))


if __name__ == "__main__":
    main()
