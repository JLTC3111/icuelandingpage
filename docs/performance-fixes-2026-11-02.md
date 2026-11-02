# Performance improvements — 2 November 2026

Implemented the findings from [the performance audit](performance-audit-2026-11-02.md). Changes are local and have not been deployed.

## Results

| Cost | Before | After |
| --- | --- | --- |
| Initial JavaScript, gzip, Vietnamese | 222.63 KB | 132.18 KB, including the selected locale |
| Offscreen startup video response bodies | About 6.27 MB in the verified run | Zero MP4 requests before scrolling |
| Five hero avatars | 1,579,687 bytes | 17,030 bytes at 96px; 28,002 bytes at 144px |
| All nine profile images | 3,067,063 bytes | 329,984 bytes |
| All six video preview files | 16,216,266 bytes of supplied recordings | 6,268,918 bytes of 720p previews |
| “People at the centre” gallery previews | 1.81 MB | 587 KB |
| “Connected for progress” gallery previews | 1.14 MB | 354 KB |
| Japanese initial font response bodies | 896,588 bytes / 43 resources | 423,212 bytes / 38 resources |
| Korean initial font response bodies | 432,372 bytes / 19 resources | 254,728 bytes / 19 resources |
| Desktop idle rail strokes | 43,200 in about two seconds | 11,712 in 2.004 seconds, about 73% fewer |
| Initial CSS, gzip | 31.05 KB | 35.10 KB |

CSS grew slightly because compact font-face declarations and recovery styling were added, and small deferred-section styles remain eager. This avoids a failed lazy stylesheet request leaving a recovered section unstyled. The large JavaScript dependencies still load on demand.

Sizes are decimal units. Browser results come from fresh Chrome contexts against the local production preview, with no CPU or bandwidth throttling. They establish payload and work reductions, not a production Core Web Vitals improvement. Font totals include Latin font resources. Avatar, profile, and gallery savings describe separate display uses; do not add overlapping variants as startup savings.

The final browser suite recorded initial resource response-body totals of approximately 630 KB for Vietnamese, 628 KB for English, 629 KB for German/French, 895 KB for Japanese, and 726 KB for Korean. These Resource Timing totals can include cache reuse and omit incomplete requests, so they are payload observations rather than precise wire-byte accounting. All cases were below the new 1 MB startup budget.

## Changes

- Videos receive neither a source nor a poster until within 300px of the viewport. Playback starts on visibility; explicit pause state survives scrolling and background-tab handling remains. Smaller preview recordings have fast-start metadata; supplied recordings are preserved.
- Portraits now have dedicated avatar and profile variants. Gallery previews retain original full-size images for the viewer. Asset generation is part of content synchronization.
- Only the selected language loads initially. Founder biography translations load with the reader; gallery, menu, and reader code load on approach or interaction. The menu has immediately usable links and a close action while its animated version loads. Deferred section failures remain contained and offer localized retry.
- Navigation section/branding state is owned by the rail, so section changes no longer rerender the whole page.
- Rail geometry is cached, trails use fewer segments, and decorative drawing is capped at 30 fps. Reduced-motion and background visibility handling remain.
- Comparison pointer movement is coalesced to animation frames with cached bounds. Visual updates use MotionValues; React accessibility updates are isolated to the slider.
- Gallery measurement observers remain stable across selection changes, and duplicate timeline creation is removed. Unopened founder chapters defer their body content.
- Japanese and Korean subsets retain original outlines, advances, and variable weights. Original faces provide fallback glyph coverage. Known page text, including the new retry controls, is included in the subsets.
- The expected LCP comparison image is preloaded according to viewport width.

## Validation

- Production build passed without the original large-chunk warning.
- All seven Node tests passed, including canonical locale pack consistency and navigation preferences.
- Browser suite passed all six languages in both themes with no unexpected page errors or HTTP errors.
- Browser checks covered startup resource budgets, no initial video sources/posters, only the selected locale loading, avatar decoding, idle stroke budget, keyboard slider controls, menu Escape behavior, all four gallery groups and their original viewer images, video pause memory, founder chapter/photo behavior, native touch dragging, direct `#founder` navigation, and delayed language-switch races.
- Additional Chrome probes checked all six same-page language switches, a failed locale download followed by successful retry, and a failed gallery JavaScript request followed by successful recovery.
- Image validation confirmed profile dimensions and alpha channels. Font validation compared 6,548 glyph outline/advance combinations at weights 400/500/600/700; full current corpus coverage checks passed.
- Reviewed desktop, mobile, Japanese hero, gallery, and video previews visually.

Run `npm test` and `npm run test:performance` to repeat the checked-in checks. The browser command uses installed Chrome and prints a temporary directory containing screenshots and resource measurements. See [README](../README.md#performance-and-validation) for browser overrides and regeneration commands.

Normal builds consume checked-in optimized assets. Use `npm run assets:optimize` after source media or translation changes, and `npm run videos:optimize` after recording changes. The image/font command requires Pillow, fontTools and Brotli; the video command requires FFmpeg. Original sources remain available for regeneration and full-size viewing.
