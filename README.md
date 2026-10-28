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

The original project is not modified. The sync imports all six existing translations (`vi`, `en`, `de`, `fr`, `ko`, `ja`) for projects, service descriptions, profiles, FAQs, and platform links. Landing-page headings and controls are translated in `src/i18n/messages.js`. Japanese and Korean use the existing self-hosted Noto Sans subsets; Latin-script languages use Archivo.

Language selection updates `?lang=` and the shared `icue_news_lang` storage key. Detail links preserve that language when opening the existing site. Light and dark themes follow the system preference initially and remember explicit choices under `icue-landing-theme`.

The palettes live in `src/theme-tokens.css`. Text, surfaces, icons, borders, button states, dialogs, the navigation rail, and the platform tiles use semantic colors for both themes.

Content sources include:

- `home-app/src/locales/*.json` and `home-app/src/data/pastProjectsContent.js`
- `ourwork-app/src/data/ourWorkScopes.js`
- `people-app/src/data/people.json`
- `shared/faq-content/content/*.js`
- `shared/app-switcher/appLinks.js`
- `contact-app/src/data/contactChannels.js`
- The existing project, office, community, service, portrait, logo, and font assets

The hero uses the Park City Xuân An visualization. Project 6B uses a drawing from its own gallery. Establishment date and staff count come from the original About content.

## Menu and interactions

The hamburger opens [React Bits' Staggered Menu](https://reactbits.dev/components/staggered-menu), adapted from its JavaScript/CSS source. The original layered slide and staggered text animation use GSAP. ICUE additions include the external rail trigger, native dialog focus containment, Escape and backdrop dismissal, closing on navigation, reduced-motion support, localized controls, and theme styling. The upstream copyright and permission notice is retained in [licenses/react-bits.md](licenses/react-bits.md).

The menu has five section links in every language: About ICUE, Expertise, Projects, Our people, and Platforms.

The page retains service and value accordions, project selection, team filters and profile dialogs, and FAQs. The news section and large closing contact callout have been removed. Actual contact information is available in the compact footer.

The three adjacent platform panels follow the additional reference design and link to the existing Mainsite, HR, and Contract platforms. Labels and URLs come from the existing ICUE app switcher; the main-site link follows the original English-host routing. Staff portals retain their existing sign-in requirements.

Sites configuration publishes the separate private review copy. It does not replace the current `icue.vn` deployment.
