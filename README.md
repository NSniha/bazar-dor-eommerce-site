<div align="center">

# Bazar Dor

**A grocery price-tracking web application for everyday essentials.**

Track price movements, browse by category, and compare prices across local markets in one clean interface.

[Live Demo](https://bazar-dor-eommerce-site.vercel.app/) · [Source Code](https://github.com/NSniha/bazar-dor-eommerce-site) · [Report an Issue](https://github.com/NSniha/bazar-dor-eommerce-site/issues)

<br />

<img src="https://skillicons.dev/icons?i=nextjs,react,tailwind,js,mongodb,nodejs,vercel,git,github&perline=9" alt="Next.js, React, Tailwind CSS, JavaScript, MongoDB, Node.js, Vercel, Git, GitHub" />

</div>

<br />

## Overview

Bazar Dor turns scattered grocery price lists into a single, easy-to-read experience. Users can see which products are getting more expensive, which are becoming more affordable, and how prices differ from one market to another.

The public site lets anyone browse prices by category. Signed-in users unlock detailed product pages with minimum, maximum, and average prices and a market-by-market breakdown.

**Highlights**

- Price-change indicators with a live-style market ticker
- Top six price increases and top six price decreases at a glance
- Eight product categories with dynamic routing
- Protected product pages with email/password, Google, and GitHub sign-in
- Fully responsive layout for mobile, tablet, and desktop

> **Data notice:** Prices come from the Programming Hero Bazar Dor API and are provided for demonstration. They are not verified, real-time retail quotations.

<!--
## Screenshots

Add screenshots to docs/screenshots/ and uncomment this section.

| Home | Product Details |
| ---- | --------------- |
| ![Home](docs/screenshots/home.png) | ![Product Details](docs/screenshots/product.png) |
-->

## Features

| Feature | Description |
| ------- | ----------- |
| **Market overview** | Current price, unit, and percentage change for each product, with clear up, down, and unchanged indicators. |
| **Price movers** | Dedicated sections for the six largest price increases and six largest price decreases. |
| **Category browsing** | Eight categories (rice, lentils, oil, vegetables, fish, meat, eggs & dairy, spices) with dynamic category pages. |
| **Product details** | Minimum, maximum, and average prices plus a market-wise comparison. Available to signed-in users. |
| **Authentication** | Email/password, Google OAuth, and GitHub OAuth through Better Auth, with a return to the originally requested page after sign-in. |
| **Profile management** | View account details and avatar, update the display name, and sign out securely. |
| **Responsive UI** | Mobile navigation drawer, consistent design system, loading states, accessible labels, and focus styles. |
| **Notifications** | Toast feedback for authentication and account actions. |

## Tech Stack

| Layer | Technology | Purpose |
| ----- | ---------- | ------- |
| Framework | Next.js 16 (App Router) | Routing, server rendering, and app architecture |
| UI | React 19 | Component-based interface |
| Language | JavaScript (ES6+) | Application logic |
| Styling | Tailwind CSS 4 | Responsive, utility-first styling |
| Authentication | Better Auth | Email/password and social sign-in |
| Database | MongoDB Atlas | Authentication and account records |
| Icons | Lucide React | Interface iconography |
| Notifications | React Hot Toast | User feedback |
| Data source | Bazar Dor REST API | Product and category data |
| Hosting | Vercel | Production deployment |

## Routes

| Route | Description | Access |
| ----- | ----------- | ------ |
| `/` | Homepage with market highlights and product listings | Public |
| `/category/[slug]` | Products in a selected category | Public |
| `/product/[slug]` | Product details and market comparison | Sign-in required |
| `/signin` | Sign in | Public |
| `/signup` | Create an account | Public |
| `/profile` | Account information | Sign-in required |
| `/profile/update` | Edit profile | Sign-in required |
| `/api/auth/[...all]` | Better Auth handler | System |

## Project Structure

```text
bazar-dor/
├── public/                     # Static assets
├── src/
│   ├── app/
│   │   ├── api/auth/[...all]/  # Better Auth route handler
│   │   ├── category/[slug]/    # Dynamic category pages
│   │   ├── product/[slug]/     # Protected product details
│   │   ├── profile/            # Profile and profile update
│   │   ├── signin/             # Sign-in page
│   │   ├── signup/             # Registration page
│   │   ├── layout.js           # Root layout
│   │   └── page.js             # Homepage
│   ├── components/
│   │   ├── layout/             # Header and navigation
│   │   └── shared/             # Reusable UI components
│   └── lib/
│       ├── auth.js             # Better Auth server config
│       ├── auth-client.js      # Better Auth client
│       ├── bazar-api.js        # API helpers
│       └── db.js               # MongoDB connection
├── next.config.mjs
└── package.json
```

## API

Product and category data is read from the Programming Hero Bazar Dor API.

**Base URL:** `https://openapi.programming-hero.com/api/bazardor`

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| `GET` | `/products` | All products |
| `GET` | `/products?category=chal` | Products filtered by category |
| `GET` | `/products/1` | A single product |
| `GET` | `/categories` | All categories |
| `GET` | `/categories/chal` | A single category |

MongoDB stores authentication records only. It does not replace the product API.

## Getting Started

### Prerequisites

- Node.js (current LTS) and npm
- A MongoDB Atlas database and user
- Google and GitHub OAuth credentials

### Installation

```bash
git clone https://github.com/NSniha/bazar-dor-eommerce-site.git
cd bazar-dor-eommerce-site
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/?retryWrites=true&w=majority
MONGODB_DB_NAME=bazar_dor

BETTER_AUTH_SECRET=<long-random-secret>
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=<google-client-id>
GOOGLE_CLIENT_SECRET=<google-client-secret>

GITHUB_CLIENT_ID=<github-client-id>
GITHUB_CLIENT_SECRET=<github-client-secret>
```

Replace every placeholder with your own values, without the angle brackets.

> **Security:** Never commit `.env.local` or any secret to version control.

### OAuth callback URLs

Register these redirect URLs with each provider for local development:

| Provider | Callback URL |
| -------- | ------------ |
| Google | `http://localhost:3000/api/auth/callback/google` |
| GitHub | `http://localhost:3000/api/auth/callback/github` |

### Run locally

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

## Deployment

The app is deployed on [Vercel](https://vercel.com/).

1. Import the repository into Vercel.
2. Add the environment variables from `.env.local` in the project settings.
3. Set `BETTER_AUTH_URL=https://bazar-dor-eommerce-site.vercel.app`.
4. Register the production callback URLs with Google and GitHub:
   - `https://bazar-dor-eommerce-site.vercel.app/api/auth/callback/google`
   - `https://bazar-dor-eommerce-site.vercel.app/api/auth/callback/github`
5. Deploy and verify sign-in, protected pages, and page refresh behavior.

**Production notes**

- Use long, unique secrets and rotate any that have been exposed.
- Restrict MongoDB network access appropriately for production.
- Keep secrets server-side and out of source files, logs, and screenshots.
- Make sure OAuth redirect URIs match the production domain exactly.

## Author

**Nobonita Saha Niha** · Front-End Developer

<a href="https://github.com/NSniha"><img src="https://skillicons.dev/icons?i=github" width="40" alt="GitHub" /></a>
&nbsp;
<a href="https://www.linkedin.com/in/nobonita-saha-niha-04b501214/"><img src="https://skillicons.dev/icons?i=linkedin" width="40" alt="LinkedIn" /></a>

## Acknowledgements

Built as part of Programming Hero, Batch 14, Assignment 07 (B14-A7). Thanks to Programming Hero for the project brief and API, and to the Next.js, React, Tailwind CSS, Better Auth, MongoDB, and Vercel teams for the tools behind it.

<div align="center">

<sub>© 2026 Bazar Dor · Developed by Nobonita Saha Niha</sub>

</div>
