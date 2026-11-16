# METRO INDIA — starter project

This is a working Next.js starter for a public Indian metro information directory, with Supabase email authentication and a database schema designed for stations, lines, projects, fares, booking providers and audit logs.

## Important scope boundary
This starter is **not yet a complete live national metro service**. It contains a small starter directory and official links, not a verified exhaustive list of all states/districts/stations. Live train tracking and direct ticket issuing require authorized operator feeds/APIs. Do not represent external booking redirects as bookings made by Metro India.

## Requirements
- Node.js 20.9+ (recommended)
- npm
- Supabase project (free tier is sufficient for initial testing)

## Public website deployment (Vercel)
1. Create a GitHub repository and upload this project folder (do not upload `.env.local`).
2. Create a Vercel account and choose **Add New → Project**, then import the GitHub repository.
3. In Vercel Project Settings → Environment Variables, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Deploy. Vercel will build the Next.js website and provide a public `*.vercel.app` URL.
5. In Supabase Authentication → URL Configuration, set the deployed website URL as Site URL and add `https://YOUR-DOMAIN/**` to Redirect URLs.
6. Add your custom domain in Vercel if you own one. A domain name may cost money; the Vercel-provided subdomain is enough for initial testing.

## Optional local preview
1. Extract the ZIP and open `metro-india` in VS Code.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add your Supabase URL and anon/public key.
4. Run the SQL schema in Supabase SQL Editor.
5. Run `npm run dev` and open `http://localhost:3000` only for development/testing.

## Supabase setup
- Use only the anon/public key in `.env.local`.
- Never expose the `service_role` key in frontend code, GitHub, screenshots or a public repository.
- The initial SQL creates public-read-only directory policies and user-only booking/profile policies. There are no admin roles, admin tables or admin write permissions.
- Metro directory changes must be imported through a trusted, reviewed deployment process; do not add public write access.

## What works in this starter
- Responsive landing page
- Search/filter starter metro directory
- Official information and ticketing links (external)
- Email sign-up, sign-in and account page (when Supabase is configured)
- Database schema for states, districts, authorities, networks, lines, stations, projects, fares, providers, bookings and logs

## Still requires implementation/approval
- Complete verified India state/UT and district seed dataset
- Verified station-by-station directory and line sequence
- Interactive map and route engine
- Real-time train positions (operator feed/API required)
- Automated project progress updates and source verification workflow
- No admin dashboard or admin permissions by design
- Operator-approved direct ticket API, payment gateway hosted checkout, QR ticket validation and refund/cancellation rules
- Security review, accessibility testing, load testing, backups and production deployment

## Data governance
Every dynamic fact should include `source_url`, `last_verified_at` and (where relevant) the authority responsible. Show “last verified” to users. If data is missing, show “not available” instead of inventing it.

## Suggested build phases
1. Foundation + verified directory
2. States/districts/stations + map
3. Routes, interchanges and fare data
4. Admin workflows and approval
5. External ticket links and user booking history
6. Operator API integrations for live train status and direct booking
7. Security audit and public launch

## Hosting note
This ZIP prepares the project for public deployment, but it does not publish the site by itself. A Vercel account and a connected GitHub repository are required. Do not share passwords or private API keys in chat.
