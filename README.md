# ICUE — React landing page

A standalone React 19 and Vite landing page using ICUE's existing content and imagery.

## Development

```sh
npm ci
npm run dev
npm run build
```

The dev server prefers `http://127.0.0.1:5188` and prints an alternative port if that port is busy. Production output is in `dist/`.

## Content and languages

Refresh the portable snapshot from the existing Vietnamese repository:

```sh
npm run sync:content
# Or:
node scripts/sync-content.mjs /absolute/path/to/ICUE-mainsite-vn
```

The original project is not modified. The sync imports all six existing translations (`vi`, `en`, `de`, `fr`, `ko`, `ja`) for projects, service descriptions, profiles, FAQs, and platform links, including five experts and four staff members. The logo is the existing `logoIcons/original_logo.png` asset. Landing-page headings and controls are translated in `src/i18n/messages.js`. Japanese and Korean use the existing self-hosted Noto Sans subsets; Latin-script languages use Archivo.

Language selection updates `?lang=` and the shared `icue_news_lang` storage key. Main-site links use the canonical `https://vi.icue.vn` origin and carry both `lang` and the selected `theme=light` or `theme=dark`. The HR and Contract links retain their portal hosts and carry the selected theme. External links, mail/telephone actions, and in-page anchors remain unchanged. Theme detection accepts an incoming URL preference before checking `icue-landing-theme` and the system setting. Open landing tabs also react to saved theme changes.

The main-site receiver seeds its existing Home, About/shared-page, Our Work, and Newsroom preferences before rendering. People pages also honor the incoming theme, including a static dark palette when background animation is disabled. Portal receivers accept the same query parameter. The legacy hash-route forwarder preserves explicit theme and language parameters and supplies the saved theme when needed. Browser referrer headers continue to identify the originating page; they are not forged as destination URLs.

Run `node --test tests/navigationPreferences.test.js` to check all six locales, both themes, portal URLs, document downloads, and every Netlify redirect target.

The palettes live in `src/theme-tokens.css`. Text, surfaces, icons, borders, button states, dialogs, the navigation rail, and the platform tiles use semantic colors for both themes.

Content sources include:

- `home-app/src/locales/*.json` and `home-app/src/data/pastProjectsContent.js`
- `ourwork-app/src/data/ourWorkScopes.js`
- `people-app/src/data/people.json`
- `shared/faq-content/content/*.js`
- `shared/app-switcher/appLinks.js`
- `contact-app/src/data/contactChannels.js`
- The existing project, office, community, service, portrait, logo, and font assets

The hero uses existing planning and fieldwork imagery from ICUE. Projects use images from their corresponding galleries. Establishment date and staff count come from the original About content.

The cover displays the current planning and fieldwork images through the newsroom's `motion-primitives/ImageComparison` component. The landing adaptation keeps pointer hover, click-to-hold, and touch dragging, and adds an accessible keyboard slider. Labels and instructions are translated into all six languages, controls follow the active theme, and reduced-motion preference disables hover scrubbing. Cover links and the caption remain accessible above the comparison.

## Menu and interactions

The hamburger opens [React Bits' Staggered Menu](https://reactbits.dev/components/staggered-menu), adapted from its JavaScript/CSS source. The original layered slide and staggered text animation use GSAP. ICUE additions include the external rail trigger, native dialog focus containment, Escape and backdrop dismissal, closing on navigation, reduced-motion support, localized controls, and theme styling. The upstream copyright and permission notice is retained in [licenses/react-bits.md](licenses/react-bits.md).

The menu has five links in every language: Discover (the main website), Expertise, Projects, Our people, and Newsroom. Its two-line icon morphs into an X and reverses on dismissal, with reduced-motion support.

The page retains service and value accordions, project selection, team filters and profile dialogs, and FAQs. The news section and large closing contact callout have been removed. Actual contact information is available in the compact footer.

All four values use the About page's optimized Accordion Gallery: four event photos for “Grounded in science” and three assigned photos each for “People at the centre,” “Connected for progress,” and “A sustainable outlook.” Originals are copied from the mainsite without changing the source files. The component retains responsive measurement, serial background prefetch, available blur placeholders, hover/focus animation, and the full-size viewer. Every assigned photo remains available on compact screens. The landing adaptation adds localized captions, alt text and viewer controls, native dialog focus containment, and a wider layout on laptops. Photo assignments and the additional captions live in `scripts/value-gallery-content.mjs`.

The three adjacent platform panels follow the additional reference design and link to Mainsite, HR, and Contract. Hovering or keyboard-focusing a panel expands its grid track while the other two contract together over the same eased transition. Mobile keeps three stacked cards. Labels and portal URLs come from the existing ICUE app switcher; the main-site link uses `vi.icue.vn` in every language. Staff portals retain their existing sign-in requirements.

Each platform card plays its supplied local MP4 preview, muted, looping and inline. Vietnamese uses `public/videos/vi`; English, German, French, Korean and Japanese use `public/videos/en`. The play/pause button appears on hover or keyboard focus, and remains available on touch devices. Playback pauses offscreen or in a background tab and remembers an explicit pause until the reader resumes it. The video control and platform link are separate elements.

The navigation rail reuses the mainsite's canvas-based Star Border, including its reduced-motion and background-tab handling. An IntersectionObserver fades and hides the rail logo and text whenever either the header or footer logo is visible; the rail brand returns between those two positions. The hidden branding is replaced by a localized scroll cue with a circular reading-progress indicator. At the footer it becomes a back-to-top link; on compact screens it uses a horizontal layout.

Sites configuration publishes the separate private review copy. It does not replace the current `icue.vn` deployment.
# icuelandingpage
