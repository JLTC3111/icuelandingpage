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

The dedicated `#founder` section closes the main page, after the platforms and before the footer. It presents Dr. Phạm Sỹ Liêm (1931–2018), founder and first director of ICUE, through an eight-chapter biography. The chapters cover his origins, engineering education, public service and federation leadership, both research institutes, urban policy contributions, Người Đô Thị and editorial work, his final scholarly book, and colleagues’ personal recollections. The full narrative in all six languages lives in `src/data/founderBiography.js`; identity and photograph metadata live in `src/data/founderContent.js`. A link opens the 30 November 2019 Người Đô Thị remembrance, [Nghĩ về một người cống hiến](https://nguoidothi.net.vn/nghi-ve-mot-nguoi-cong-hien-21097.html).

`src/components/Stepper.jsx` implements the supplied `Stepper` / `Step` interface as a vertical accordion reader: numbered sections, clickable chapter headings, Back and Continue controls, completion callbacks, animated expansion, keyboard heading navigation, inactive-panel focus exclusion and reduced-motion support. The final action keeps the last chapter available. The component uses the React Bits Stepper interface and existing license notice, with ICUE theme colors and responsive reading typography.

The section starts with text only. In the policy chapter, opening the 2017 event reveals the VTV1 television interview (`dr.phamsyliem_1.jpg`, retained as `pham-sy-liem-portrait.jpg`). In the editorial chapter, opening the 2018 event reveals a meeting with editorial colleagues, one of his final documented editorial meetings (`dr.phamsyliem_2.jpg`, retained as `pham-sy-liem-meeting.jpg`). Photos mount only for the active chapter and an explicitly opened event; changing chapters closes the photo. Dates and contexts were confirmed by the user and are included in all six languages. The supplied images are preserved, including the user's later image updates.

Leadership additions live in `src/data/leadershipContent.js`, separately from the imported snapshot so `sync:content` preserves them. The people section shows the 2022–2027 appointments announced on 14 March 2024, including Dr. Nguyễn Hồng Hạnh’s reappointment under Decision 19/QĐ-THXDVN and the three deputy directors named in that announcement. The existing directory is retained; the dated announcement is not treated as an exhaustive later staff roster. Hạnh’s profile adds her research perspective from the 20 October 2020 interview; her profile and the existing profiles of Trần Quốc Toản and Trần Thị Lan Anh include linked appointment details. Both additions support all six languages and the light and dark palettes.

Leadership sources:

- [Tổng hội Xây dựng Việt Nam — appointment announcement, 14 March 2024](https://tonghoixaydung.vn/bo-nhiem-ts-nguyen-hong-hanh-giu-chuc-vien-truong-vien-nghien-cuu-kinh-te-xay-dung-va-do-thi.html)
- [Kinh tế xanh — interview with Dr. Nguyễn Hồng Hạnh, 20 October 2020](https://kinhtexanh.vn/ts-nguyen-hong-hanh-phu-nu-la-dong-luc-lon-cho-su-phat-trien-14752.html)


The cover displays the current planning and fieldwork images through the newsroom's `motion-primitives/ImageComparison` component. The landing adaptation keeps pointer hover, click-to-hold, and touch dragging, and adds an accessible keyboard slider. Labels and instructions are translated into all six languages, controls follow the active theme, and reduced-motion preference disables hover scrubbing. Cover links and the caption remain accessible above the comparison.

## Menu and interactions

The hamburger opens [React Bits' Staggered Menu](https://reactbits.dev/components/staggered-menu), adapted from its JavaScript/CSS source. The original layered slide and staggered text animation use GSAP. ICUE additions include the external rail trigger, native dialog focus containment, Escape and backdrop dismissal, closing on navigation, reduced-motion support, localized controls, and theme styling. The upstream copyright and permission notice is retained in [licenses/react-bits.md](licenses/react-bits.md).

The menu has six links in every language: Discover (the main website), Expertise, Projects, Our people, Newsroom, and Our founder. Its two-line icon morphs into an X and reverses on dismissal, with reduced-motion support.

The page retains service and value accordions, project selection, team filters and profile dialogs, and FAQs. The news section and large closing contact callout have been removed. Actual contact information is available in the compact footer.

All four values use the About page's optimized Accordion Gallery: four event photos for “Grounded in science” and three assigned photos each for “People at the centre,” “Connected for progress,” and “A sustainable outlook.” Originals are copied from the mainsite without changing the source files. The component retains responsive measurement, serial background prefetch, available blur placeholders, hover/focus animation, and the full-size viewer. Every assigned photo remains available on compact screens. The landing adaptation adds localized captions, alt text and viewer controls, native dialog focus containment, and a wider layout on laptops. Photo assignments and the additional captions live in `scripts/value-gallery-content.mjs`.

The three adjacent platform panels follow the additional reference design and link to Mainsite, HR, and Contract. Hovering or keyboard-focusing a panel expands its grid track while the other two contract together over the same eased transition. Mobile keeps three stacked cards. Labels and portal URLs come from the existing ICUE app switcher; the main-site link uses `vi.icue.vn` in every language. Staff portals retain their existing sign-in requirements.

Each platform card plays its supplied local MP4 preview, muted, looping and inline. Vietnamese uses `public/videos/vi`; English, German, French, Korean and Japanese use `public/videos/en`. The play/pause button appears on hover or keyboard focus, and remains available on touch devices. Playback pauses offscreen or in a background tab and remembers an explicit pause until the reader resumes it. The video control and platform link are separate elements.

The navigation rail reuses the mainsite's canvas-based Star Border, including its reduced-motion and background-tab handling. An IntersectionObserver fades and hides the rail logo and text whenever either the header or footer logo is visible; the rail brand returns between those two positions. The hidden branding is replaced by a localized scroll cue with a circular reading-progress indicator. At the footer it becomes a back-to-top link; on compact screens it uses a horizontal layout.

Sites configuration publishes the separate private review copy. It does not replace the current `icue.vn` deployment.
# icuelandingpage
