# Gold redesign

The approved Asia Tours design is implemented as native Next.js App Router pages and typed React components. No exported HTML document or standalone DOM scripts are embedded at runtime.

## Components

- `Components/gold/Shell.tsx` and `Footer.tsx`: public navigation and shared footer.
- `StaticPages.tsx`: approved homepage, About, Services and Contact compositions in JSX.
- `Interactive.tsx`: responsive hero slideshow, fleet filtering, gallery, area search and inquiry forms.
- `Sections.tsx`: reusable fleet cards, rate table, area links, FAQ and calls to action.
- `Details.tsx`: fleet, service and city detail templates.
- `gold.css`: approved styling scoped to `.gold-site`; admin screens keep their existing styles.

## Data and integrations

- Fleet images, galleries, prices and specifications are imported from `Data/cars.ts`.
- Service and city records remain in `app/services/serviceTypeData.ts` and `app/areas/areasData.ts`.
- Campaign backgrounds, logo and fonts are local files in `public/gold/assets`.
- Existing SEO metadata layouts, Supabase inquiry action, admin routes and authentication remain in use.
- The Contact form sends through `app/actions/submitInquiry.ts`. Its separate WhatsApp action prepares a message for review. A failed submission keeps the entered details and presents retry/contact options.
- City, service and vehicle selections carry through to Contact via query parameters.

## Local verification

Run `npm run build` for the production and TypeScript checks. Run `npm run dev` for development on port 3001, or `npm run start` to serve the production build on port 3001.

Browser verification covers mobile/desktop layouts, fleet filters, city search, galleries, booking context, WhatsApp preparation, failed-submit handling and public/admin style separation. No test inquiry was inserted into the live database.
