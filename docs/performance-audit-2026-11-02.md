# Performance audit — 2 November 2026

Audited commit: `2915b8c`. The largest opportunities are unnecessary initial media downloads, oversized portraits, the single application bundle, and continuous decorative animation. Application source and assets were not changed.

## Scope and measurements

Reviewed the React entry point, locale data, components, animation effects, media pipeline, font CSS, and Vite build. Built production output and exercised its local preview in headless Chrome with fresh browser contexts: Vietnamese desktop and narrow viewport, English, Japanese, Korean, and reduced motion. Desktop viewport was 1440×900; narrow viewport was 390×844, both at device scale factor 1. The narrow viewport is not a physical phone or a CPU emulation.

The browser probe recorded resource requests, resource sizes, long tasks, layout shifts, page errors, canvas stroke calls, and Chrome performance counters. Measurements used localhost without bandwidth or CPU throttling; they establish resource behavior and local work, not production Core Web Vitals or promised user-visible speedups. Canvas instrumentation adds overhead. Production CDN latency, caching policy, and real-user metrics were not tested.

| Baseline | Observed result |
| --- | --- |
| Production JavaScript | One chunk: 668.55 KB minified / 222.63 KB gzip |
| Production CSS | One file: 127.39 KB / 31.05 KB gzip |
| Hero portrait assets | 1,579,687 bytes for five avatars |
| Vietnamese initial video traffic, verified rerun | About 6.27 MB of media response bodies before scrolling, including a partial main-site download |
| Video assets for one locale | Vietnamese 9.48 MB; English 6.73 MB |
| Desktop idle canvas work | 43,200 strokes over 120 frames in a two-second sample |
| Narrow viewport idle canvas work | 35,040 strokes over 120 frames in two seconds |
| Reduced-motion idle sample | Zero canvas strokes and zero application rAF callbacks |
| Initial font resources | vi/en: 4 files, 157 KB; ja: 43 files, 897 KB; ko: 19 files, 432 KB |
| Runtime validation | No page errors in the six baseline cases |
| Existing tests | All 6 navigation preference tests passed |

Sizes use decimal KB/MB. The video transfer figure comes from Chrome network data events, including a canceled partial request; incomplete media can report zero bytes in Resource Timing. It is not the sum of all video file sizes. Transfer amount varies with timing and browser buffering.

## Prioritized findings

### 1. High — delay video sources and posters until near the viewport

**Evidence:** [PlatformVideo.jsx:52](../src/components/PlatformVideo.jsx#L52) renders `src`, `poster`, and `autoPlay` immediately for all three videos. [App.jsx:124](../src/App.jsx#L124) mounts all three cards during initial rendering. The observer at [PlatformVideo.jsx:25](../src/components/PlatformVideo.jsx#L25) controls playback but does not gate discovery of the resource.

**Measured effect:** Chrome requested all three videos and all three posters while the cards were roughly 6,460 CSS pixels below the desktop viewport. The corrected Vietnamese run received about 6.27 MB of video data before any scrolling. The three posters add 358 KB, even though the underlying card images have `loading="lazy"`.

**Change:** Initially render the lazy card image and video controls. Attach the video source and poster when the section approaches the viewport, and start playback only when visible. Retain explicit pause state, background-tab pausing, and failure handling. `preload="metadata"` is insufficient because autoplay takes precedence over that hint, as documented by [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video#preload).

**Effort:** Small to medium. Verify that no MP4 requests occur before the threshold and that pause/resume and locale switches still work.

### 2. High — generate avatar thumbnails and optimized profile images

**Evidence:** [App.jsx:137](../src/App.jsx#L137) selects five portraits and [App.jsx:175](../src/App.jsx#L175) renders them eagerly. [styles.css:75](../src/styles.css#L75) displays these images at 39×39 CSS pixels on desktop, while the originals range from 408×612 to 638×984. Those five PNGs total 1.58 MB.

**Change:** Generate dedicated 80–120px avatar variants, with appropriate alternatives for device pixel ratios, and separate larger variants for the directory and dialogs. Preserve transparent backgrounds. Incorporate generation into [sync-content.mjs:94](../scripts/sync-content.mjs#L94) so later content imports retain the optimization.

**Evidence of upside:** A read-only Pillow encoding experiment generated five 96px WebP thumbnails totaling 14.2 KB, about 99% smaller. Optimizing all nine portraits at their original dimensions produced 275 KB of WebP versus 3.07 MB of PNG. These are trial quality-82 encodes; visual review is required before adoption. Savings from the two approaches overlap and must not be added together.

**Effort:** Small to medium. This is the clearest image optimization and should precede further hero-photo compression; the two comparison images already total only 156 KB.

### 3. High — reduce the initial JavaScript dependency and content set

**Evidence:** [App.jsx:7](../src/App.jsx#L7) statically imports the menu, gallery, founder reader, video controls, and their dependencies. [LocaleProvider.jsx:2](../src/i18n/LocaleProvider.jsx#L2) imports all six locales of site content and messages. [Founder.jsx:5](../src/components/Founder.jsx#L5) also imports all six biographies. The build emits one 668.55 KB JavaScript chunk and reports Vite's chunk-size warning.

**Change:** Load the selected locale's data rather than every translation at startup. Defer the founder reader and gallery implementation until they approach the viewport, with reserved space to avoid layout shifts. GSAP is shared by the menu and gallery, so deferring only one will leave it reachable through the other. Keep menu response immediate by prefetching its chunk on intent or during idle time. Evaluate Motion's smaller feature-loading options only after measuring the resulting bundle.

Splitting a vendor file without deferring its consumers changes file boundaries, but still downloads the same dependencies initially. Verify the initial network graph and bytes after each change.

**Effort:** Medium. Test all six languages, direct hash navigation, keyboard menu access, and section observers when introducing deferred section mounting.

### 4. Medium — reduce continuous rail animation work

**Evidence:** [App.jsx:167](../src/App.jsx#L167) configures two animated stars on the fixed navigation rail. [StarBorder.jsx:184](../src/components/StarBorder.jsx#L184) draws each trail using up to 90 segments with two strokes per segment. [StarBorder.jsx:327](../src/components/StarBorder.jsx#L327) rebuilds geometry each frame, and [StarBorder.jsx:375](../src/components/StarBorder.jsx#L375) keeps scheduling while moving.

**Measured effect:** The desktop idle sample recorded 21,600 stroke calls per second, matching 360 strokes per frame at 60 Hz. Chrome recorded roughly 155–186 ms of main-thread task time during two-second desktop idle samples; the reduced-motion control recorded about 0.6 ms, no strokes, and no rAF callbacks. These are local instrumented samples, not whole-device CPU percentages or battery measurements.

**Change:** Cache geometry and reusable glow artwork, lower trail segment density, and assess a 30 fps cap or interaction-triggered animation. Use visual comparison to choose the least noticeable reduction. Existing reduced-motion and background visibility behavior should be retained.

**Effort:** Medium. Measure sustained idle task time and visual quality on a real lower-powered device.

### 5. Medium — separate gallery previews from full-size originals

**Evidence:** [sync-content.mjs:64](../scripts/sync-content.mjs#L64) writes only the original `image` URL. The gallery already has distinct preview and full-size source helpers at [AccordionGallery.jsx:84](../src/components/AccordionGallery.jsx#L84) and [AccordionGallery.jsx:91](../src/components/AccordionGallery.jsx#L91), including `fullImage` support.

**Effect:** The three “People at the centre” JPEGs total 1.81 MB; “Connected for progress” totals 1.14 MB. These downloads happen when the gallery is used, rather than at initial page load, because intersection gating and serial prefetch are already implemented.

**Change:** Generate appropriately sized WebP previews and retain originals through `fullImage`. An in-memory same-dimension WebP experiment reduced these groups to 841 KB and 458 KB respectively; resizing can improve this further. Avoid replacing full-size viewer images with small thumbnails.

**Effort:** Small to medium, sharing the portrait asset pipeline work.

### 6. Medium — reduce Japanese and Korean font payloads

**Evidence:** [main.jsx:4](../src/main.jsx#L4) loads the CJK stylesheet globally. [cjk-fonts.css](../src/cjk-fonts.css) contains 67 font-face declarations. Japanese initially fetched 43 font files totaling about 897 KB; Korean fetched 19 totaling 432 KB, compared with 157 KB for Vietnamese/English. These counts include the Latin font resources.

**Change:** Evaluate page-specific CJK subsets derived from the shipped translations, and defer below-page content rendering where practical. All eight founder chapter bodies currently mount at [Stepper.jsx:81](../src/components/Stepper.jsx#L81), including collapsed chapters. Measure font requests after reducing hidden text rendering rather than assuming `aria-hidden` or `inert` prevents font loads. Keep Unicode coverage, fallback behavior, and language-switch support intact.

The current Unicode-range subsets and `font-display: swap` are useful. Merely moving their declarations to another stylesheet will not reduce required glyph downloads.

**Effort:** Medium. Lower priority than video and portraits, but significant for Japanese visitors.

### 7. Medium — keep comparison movement outside broad React updates

**Evidence:** [ImageComparison.jsx:53](../src/components/ImageComparison.jsx#L53) updates a MotionValue and React state for each pointer movement, while [line 62](../src/components/ImageComparison.jsx#L62) reads geometry on every event. The context value at [line 209](../src/components/ImageComparison.jsx#L209) changes with the position, updating image, label, and slider consumers.

**Change:** Keep visual position in the MotionValue, coalesce incoming events to animation frames, and cache bounds with invalidation for resizing and scrolling. Isolate ARIA value updates so they do not invalidate the image consumers; preserve keyboard operation and correct announcements. Motion values can update styles without React rendering, as described in the [Motion documentation](https://motion.dev/docs/react-motion-value).

**Confidence:** The unnecessary state updates are code-confirmed. User-visible drag jank was not established by this audit; profile interaction traces before treating this as a larger priority than the measured download issues.

**Effort:** Small to medium.

## Smaller follow-ups

- **Gallery observer and timeline churn:** `applyLayout` depends on `active` at [AccordionGallery.jsx:600](../src/components/AccordionGallery.jsx#L600). Each active change recreates the resize observer and runs layout at [line 641](../src/components/AccordionGallery.jsx#L641), followed by another layout effect at [line 648](../src/components/AccordionGallery.jsx#L648). These calls kill and recreate the GSAP timeline. Keep the observer stable and run one selection animation. There are only three or four panels, so this is secondary.
- **Broad page rerenders:** The section observer updates state in `LandingPage` at [App.jsx:140](../src/App.jsx#L140), rerendering the section tree at [line 178](../src/App.jsx#L178). Move section and branding state into the rail or introduce a stable page-body boundary. This happens at section transitions, not every scroll frame.
- **MP4 packaging and dimensions:** All six videos are 1920×1080 with their `moov` metadata after media data. Remux with fast-start metadata and assess 720p preview encodes after source deferral is implemented. Keep visual quality and text legibility in the portal recordings.
- **Earlier hero discovery:** [index.html:16](../index.html#L16) contains an empty root, so hero image discovery waits for JavaScript. The measured LCP element was one of the two comparison images, depending on viewport. Consider preloading the appropriate image(s), and evaluate static prerendering if more startup improvement is needed. Avoid blindly adding high-priority downloads before reducing existing contention. This follows the resource-discovery guidance in [web.dev's LCP guide](https://web.dev/articles/optimize-lcp#1_eliminate_resource_load_delay).

## Recommended sequence and acceptance checks

1. Defer platform media and generate portrait variants. Confirm zero initial MP4 requests and a substantial avatar byte reduction; visually review all portraits.
2. Separate gallery preview assets and package preview videos efficiently. Confirm full-size images remain available in the viewer.
3. Reduce initial locale/module loading. Record initial gzip bytes and dependency requests, rather than only individual chunk sizes.
4. Reduce idle rail work and then profile comparison/gallery interactions. Preserve reduced motion, touch, keyboard, and dialog behavior.
5. Optimize CJK font coverage and hero discovery, validating on throttled connections and real devices.

Repeat the production build and navigation tests after implementation. Add focused performance checks for media deferral and bundle budgets, and collect production LCP/INP/CLS before claiming field improvements. Existing strengths include explicit image dimensions, WebP hero assets, passive/rAF scroll handling, serial gallery prefetch, modal images mounted on demand, and animation cleanup.
