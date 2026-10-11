<div align="center">

# Bazar Dor

### Smarter market insights for everyday essentials

Explore grocery prices, follow market movements, and compare products across local markets — all in one place.

<br />

<a href="https://bazar-dor-eommerce-site.vercel.app/" title="Live Demo"><img src="https://skillicons.dev/icons?i=vercel" width="52" height="52" alt="Live Demo" /></a>
&nbsp;&nbsp;
<a href="https://github.com/NSniha/bazar-dor-eommerce-site" title="Source Code"><img src="https://skillicons.dev/icons?i=github" width="52" height="52" alt="Source Code" /></a>

<sub>**Live Demo** &nbsp;·&nbsp; **Source Code**</sub>

<br />

<img src="https://skillicons.dev/icons?i=nextjs,react,tailwind,js,mongodb,vercel&perline=6" alt="Next.js, React, Tailwind CSS, JavaScript, MongoDB, Vercel" />

</div>

---

## Overview

**Bazar Dor** is a modern, responsive grocery price-tracking web application built to make everyday market information more accessible. It brings essential product prices, price-change indicators, category-based browsing, and market-level comparisons into a clean, intuitive interface.

Instead of navigating scattered price lists, users can quickly understand **what is getting more expensive, what is becoming more affordable, and how prices differ between markets**. The application pairs a streamlined browsing experience with account-based access to detailed product information.

The project demonstrates REST API integration, modern authentication, dynamic routing, protected routes, responsive interface design, and cloud deployment, using **Next.js App Router**, **React**, **Tailwind CSS**, **Better Auth**, and **MongoDB Atlas**.

> **Project context:** Programming Hero — Batch 14, Assignment 07 (B14-A7).
>
> **Data notice:** Displayed prices are sourced from the project API and are intended for demonstration. They should not be treated as independently verified, real-time retail quotations.

---

## Key Features

### Market Price Overview

- Explore everyday essentials through an organized, easy-to-scan interface.
- View each product's current price, unit, and percentage change.
- Identify price movements through clear upward, downward, and unchanged indicators.
- Follow a horizontally scrolling market-price ticker for quick updates.

### Price Increase & Decrease Highlights

- Dedicated sections showcase the **top six price increases** and **top six price decreases**.
- Visual price-change badges make market trends easy to recognize.
- Product cards link directly to detailed product information.

### Category-Based Product Discovery

Browse essential grocery products across eight categories:

| Category     | Route                |
| ------------ | -------------------- |
| Rice         | `/category/chal`     |
| Lentils      | `/category/dal`      |
| Oil          | `/category/tel`      |
| Vegetables   | `/category/shobji`   |
| Fish         | `/category/mach`     |
| Meat         | `/category/mangsho`  |
| Eggs & Dairy | `/category/dim-dudh` |
| Spices       | `/category/mosla`    |

- Dynamic category pages are generated from the selected category slug.
- Product cards communicate essential pricing information at a glance.
- A consistent interface connects the homepage, category pages, and product details.

### Detailed Product & Market Comparisons

Registered users can open individual product pages for in-depth information:

- Product name, category, description, and unit details.
- **Minimum, maximum, and average** price summaries.
- Market-wise price breakdowns for easy comparison.
- Clear visual separation between summary data and market details.

Product-detail pages are **protected routes**. Visitors who are not signed in are redirected to authentication before gaining access.

### Secure Authentication

Authentication is implemented with **Better Auth** and backed by **MongoDB Atlas**.

- Register with a name, email address, and password.
- Sign in with email and password.
- Continue with **Google OAuth** or **GitHub OAuth**.
- Maintain authenticated sessions across supported routes.
- Receive contextual toast notifications for authentication success and failure.
- Return to the originally requested protected page after signing in.

### Profile Management

- View account name, email address, and profile avatar.
- Display profile images from connected social providers.
- Update the account display name.
- Sign out securely.
- Access profile features through a session-aware navigation menu.

### Responsive, Accessible Interface

- Responsive layouts for desktop, tablet, and mobile devices.
- Mobile-friendly navigation with a dedicated menu drawer.
- Consistent spacing, typography, product cards, and brand colors.
- Clear focus states, accessible labels, and interactive feedback.
- Loading indicators and route-specific loading UI.

---

## Technology Stack

<div align="center">

<table>
  <tr>
    <td align="center" width="120"><img src="https://skillicons.dev/icons?i=nextjs" width="56" height="56" alt="Next.js" /><br /><sub><b>Next.js 16</b></sub></td>
    <td align="center" width="120"><img src="https://skillicons.dev/icons?i=react" width="56" height="56" alt="React" /><br /><sub><b>React 19</b></sub></td>
    <td align="center" width="120"><img src="https://skillicons.dev/icons?i=tailwind" width="56" height="56" alt="Tailwind CSS" /><br /><sub><b>Tailwind CSS 4</b></sub></td>
    <td align="center" width="120"><img src="https://skillicons.dev/icons?i=js" width="56" height="56" alt="JavaScript" /><br /><sub><b>JavaScript</b></sub></td>
  </tr>
  <tr>
    <td align="center" width="120"><img src="public/icons/better-auth.svg" width="56" height="56" alt="Better Auth" /><br /><sub><b>Better Auth</b></sub></td>
    <td align="center" width="120"><img src="https://cdn.simpleicons.org/google/4285F4" width="56" height="56" alt="Google OAuth" /><br /><sub><b>Google OAuth</b></sub></td>
    <td align="center" width="120"><img src="https://skillicons.dev/icons?i=github" width="56" height="56" alt="GitHub OAuth" /><br /><sub><b>GitHub OAuth</b></sub></td>
    <td align="center" width="120"><img src="https://skillicons.dev/icons?i=mongodb" width="56" height="56" alt="MongoDB Atlas" /><br /><sub><b>MongoDB Atlas</b></sub></td>
  </tr>
  <tr>
    <td align="center" width="120"><img src="https://cdn.simpleicons.org/lucide/F56565" width="56" height="56" alt="Lucide React" /><br /><sub><b>Lucide React</b></sub></td>
    <td align="center" width="120"><img src="public/icons/react-hot-toast.svg" width="56" height="56" alt="React Hot Toast" /><br /><sub><b>React Hot Toast</b></sub></td>
    <td align="center" width="120"><img src="https://skillicons.dev/icons?i=nodejs" width="56" height="56" alt="Node.js" /><br /><sub><b>Node.js</b></sub></td>
    <td align="center" width="120"><img src="https://skillicons.dev/icons?i=npm" width="56" height="56" alt="npm" /><br /><sub><b>npm</b></sub></td>
  </tr>
  <tr>
    <td align="center" width="120"><img src="https://skillicons.dev/icons?i=eslint" width="56" height="56" alt="ESLint" /><br /><sub><b>ESLint</b></sub></td>
    <td align="center" width="120"><img src="https://skillicons.dev/icons?i=git" width="56" height="56" alt="Git" /><br /><sub><b>Git</b></sub></td>
    <td align="center" width="120"><img src="https://skillicons.dev/icons?i=vercel" width="56" height="56" alt="Vercel" /><br /><sub><b>Vercel</b></sub></td>
    <td align="center" width="120"></td>
  </tr>
</table>

</div>

| Area             | Technology                     | Purpose                                                 |
| ---------------- | ------------------------------ | ------------------------------------------------------- |
| Framework        | **Next.js 16 (App Router)**    | Routing, server rendering, and application architecture |
| UI               | **React 19**                   | Reusable components and interactive interfaces          |
| Language         | **JavaScript (ES6+)**          | Application logic and client-side behavior              |
| Styling          | **Tailwind CSS 4**             | Responsive design and utility-based styling             |
| Authentication   | **Better Auth**                | Email/password and social authentication                |
| Database         | **MongoDB Atlas**              | Persistent authentication and account records           |
| Database adapter | **@better-auth/mongo-adapter** | Better Auth integration with MongoDB                    |
| Icons            | **Lucide React**               | Consistent interface iconography                        |
| Notifications    | **React Hot Toast**            | Success, error, and informational feedback              |
| Data             | **Bazar Dor REST API**         | Product and category information                        |
| Deployment       | **Vercel**                     | Production hosting and deployment                       |

---

## Application Routes

| Route                | Description                                       | Access           |
| -------------------- | ------------------------------------------------- | ---------------- |
| `/`                  | Homepage, market highlights, and product listings | Public           |
| `/category/[slug]`   | Products in a selected category                   | Public           |
| `/product/[slug]`    | Product details and market comparisons            | Sign-in required |
| `/signin`            | Email/password and social sign-in                 | Public           |
| `/signup`            | Account registration and social sign-up           | Public           |
| `/profile`           | User information and account management          | Sign-in required |
| `/profile/update`    | Edit profile information                          | Sign-in required |
| `/api/auth/[...all]` | Better Auth API handler                           | System route     |

> Authentication redirects preserve the destination of protected pages so users can continue where they left off.

---

## Project Structure

```text
bazar-dor/
├── public/                         # Static images and assets
│   └── icons/                      # README icons (better-auth.svg, react-hot-toast.svg)
├── src/
│   ├── app/
│   │   ├── api/auth/[...all]/
│   │   │   └── route.js            # Better Auth request handler
│   │   ├── category/[slug]/
│   │   │   └── page.js             # Dynamic category pages
│   │   ├── product/[slug]/
│   │   │   ├── page.js             # Protected product details
│   │   │   └── loading.js          # Product loading state
│   │   ├── profile/
│   │   │   ├── page.js             # Protected profile route
│   │   │   ├── ProfileClient.jsx   # Profile UI and actions
│   │   │   └── update/
│   │   │       └── page.js         # Profile update route
│   │   ├── signin/page.js          # Sign-in page
│   │   ├── signup/page.js          # Registration page
│   │   ├── layout.js               # Root layout
│   │   └── page.js                 # Homepage
│   ├── components/
│   │   ├── layout/                 # Header and navigation
│   │   └── shared/                 # Shared UI components
│   └── lib/
│       ├── auth.js                 # Better Auth server configuration
│       ├── auth-client.js          # Better Auth React client
│       ├── bazar-api.js            # Product and category API utilities
│       └── db.js                   # MongoDB connection
├── .env.local                      # Local secrets (never commit)
├── next.config.mjs                 # Next.js configuration
├── package.json
└── README.md
```

*The structure highlights the main application files. Additional components and assets are omitted for readability.*

---

## API Integration

The application consumes product and category data from the Programming Hero Bazar Dor API.

**Base URL**

```text
https://openapi.programming-hero.com/api/bazardor
```

| Method | Endpoint                  | Description                          |
| ------ | ------------------------- | ------------------------------------ |
| `GET`  | `/products`               | Fetch all products                   |
| `GET`  | `/products?category=chal` | Fetch products filtered by category  |
| `GET`  | `/products/1`             | Fetch a single product               |
| `GET`  | `/categories`             | Fetch available categories           |
| `GET`  | `/categories/chal`        | Fetch information about one category |

> The REST API is the source of product and pricing data. **MongoDB is used for authentication-related records** and does not replace the product API.

---

## Getting Started

### Prerequisites

- **Node.js** (current supported LTS release)
- **npm**
- A **MongoDB Atlas** database and database user
- Google and GitHub OAuth credentials (for social authentication)

### 1. Clone the repository

```bash
git clone https://github.com/NSniha/bazar-dor-eommerce-site.git
cd bazar-dor-eommerce-site
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/?retryWrites=true&w=majority
MONGODB_DB_NAME=bazar_dor

BETTER_AUTH_SECRET=<generate-a-long-random-secret>
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>

GITHUB_CLIENT_ID=<your-github-client-id>
GITHUB_CLIENT_SECRET=<your-github-client-secret>
```

Replace every placeholder with credentials from your own services, and do not include the angle brackets (`< >`) in actual values.

> **Security:** Never commit `.env.local`, database passwords, OAuth client secrets, or authentication secrets to version control. Store production credentials in your deployment platform's environment-variable settings.

### 4. Configure OAuth callback URLs

For local development, register these callback URLs with the corresponding providers:

| Provider | Callback URL                                     |
| -------- | ------------------------------------------------ |
| Google   | `http://localhost:3000/api/auth/callback/google` |
| GitHub   | `http://localhost:3000/api/auth/callback/github` |

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Create a production build

```bash
npm run build
npm run start
```

---

## Deployment

The application is deployed on **Vercel**.

1. Push the project to GitHub.
2. Import the repository into **Vercel**.
3. Add the environment variables from `.env.local` to the Vercel project settings.
4. Set the production authentication URL:

   ```env
   BETTER_AUTH_URL=https://bazar-dor-eommerce-site.vercel.app
   ```

5. Register the production OAuth callback URLs:

   | Provider | Callback URL                                                          |
   | -------- | --------------------------------------------------------------------- |
   | Google   | `https://bazar-dor-eommerce-site.vercel.app/api/auth/callback/google` |
   | GitHub   | `https://bazar-dor-eommerce-site.vercel.app/api/auth/callback/github` |

6. Deploy, then verify sign-in, sign-up, social authentication, protected pages, and refresh behavior.

### Production Security Checklist

- Use long, unique secrets and rotate any credentials that have been exposed.
- Restrict MongoDB network access through an appropriate production networking strategy.
- Keep secrets server-side and out of source files, logs, and screenshots.
- Confirm Google and GitHub OAuth redirect URIs match the production domain exactly.

---

## Quality Checklist

<details>
<summary><strong>Flows to verify before deploying updates</strong></summary>

<br />

- [ ] Homepage, categories, and product cards load correctly.
- [ ] Price increase/decrease data and product details render correctly.
- [ ] Product prices sort numerically where sorting is enabled.
- [ ] Protected product pages redirect unauthenticated visitors to sign-in.
- [ ] Email registration and email/password sign-in work correctly.
- [ ] Google and GitHub authentication complete successfully.
- [ ] Profile information is displayed and name updates are saved.
- [ ] Sign-out ends the authenticated session.
- [ ] Invalid routes display a helpful not-found page.
- [ ] Loading states, mobile navigation, and responsive layouts behave correctly.
- [ ] All dynamic routes continue to work after a hard refresh in production.
- [ ] No sensitive credentials are committed to the repository.

</details>

---

## Project Goals

Bazar Dor was created to demonstrate how modern web technologies can simplify access to practical market information. Its key goals are to:

- Make essential grocery pricing easier to understand.
- Bring price movements and market comparisons into one consistent experience.
- Deliver responsive navigation and readable product information across devices.
- Apply secure authentication patterns to user-specific and protected features.
- Build a maintainable, component-based architecture with Next.js.

---

## Author

<div align="center">

**Nobonita Saha Niha** — Front-End Developer

<a href="https://github.com/NSniha" title="GitHub"><img src="https://skillicons.dev/icons?i=github" width="48" height="48" alt="GitHub" /></a>
&nbsp;&nbsp;
<a href="https://www.linkedin.com/in/nobonita-saha-niha-04b501214/" title="LinkedIn"><img src="https://skillicons.dev/icons?i=linkedin" width="48" height="48" alt="LinkedIn" /></a>

</div>

---

## Acknowledgements

- **Programming Hero** for the B14-A7 assignment and project design brief.
- **Next.js, React, Tailwind CSS, Better Auth, and MongoDB** for the core development ecosystem.
- **Vercel** for application hosting.

---

<div align="center">

**Built with care to make everyday market information easier to explore.**

© 2026 Bazar Dor · Developed by Nobonita Saha Niha

</div>