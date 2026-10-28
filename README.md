# ICUE — New React landing page

A standalone Vietnamese landing page built with React 19 and Vite. The design takes its oversized typography, dark navigation rail, expansive imagery, and accordion interactions from the four supplied references.

## Local development

```sh
npm ci
npm run dev
```

The development URL is `http://127.0.0.1:5188`. Run `npm run build` for the production bundle in `dist/`.

## Content and assets

The page uses a portable snapshot of the existing `../ICUE-mainsite-vn` project. The original project is not modified. Refresh the snapshot with:

```sh
npm run sync:content
# Or specify another checkout:
node scripts/sync-content.mjs /absolute/path/to/ICUE-mainsite-vn
```

Sources:

- `home-app/src/locales/vi.json`: institute name, about copy, project records, news.
- `home-app/src/data/pastProjectsContent.js`: project IDs and years.
- `ourwork-app/src/data/ourWorkScopes.js`: service descriptions, deliverables, and workflow.
- `people-app/src/data/people.json`: real names, roles, biographies, and portraits.
- `shared/faq-content/content/vi.js`: FAQ answers.
- `contact-app/src/data/contactChannels.js`: address, telephone, and email.
- Existing `pastProjects`, `work`, `aboutUs`, `news`, recruitment media, logo icons, and Archivo fonts.

The hero shows the existing Park City Xuân An project visualization. Marketing headings and the four editorial value statements are adapted from the institute's existing material. The establishment date and staff count come from the About content, rather than the inconsistent statistics in other subapps.

## Interactions

The page includes accessible service and value accordions, a project selector, team filters with profile dialogs, FAQ accordions, and a keyboard-accessible menu. Detail links lead to existing pages on `icue.vn`; email and phone links use the institute's actual contact details. There is no placeholder submission form.

The original `icue.vn` deployment is separate from this project. Sites configuration, when present, publishes a private review copy.
