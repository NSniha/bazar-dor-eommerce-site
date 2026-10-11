<div align="center">

# Bazar Dor

### Smarter market insights for everyday essentials

Explore grocery prices, follow market movements, and compare products across local markets — all in one place.

<br />

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Website-16A34A?style=for-the-badge&logo=vercel&logoColor=white)](https://bazar-dor-eommerce-site.vercel.app/)
[![Source Code](https://img.shields.io/badge/Source_Code-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/NSniha/bazar-dor-eommerce-site)

<br />

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Application Routes](#application-routes)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Quality Checklist](#quality-checklist)
- [Project Goals](#project-goals)
- [Author](#author)
- [Acknowledgements](#acknowledgements)

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

<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,tailwind,js,mongodb,nodejs,npm,git,github,vercel&perline=10" alt="Technology stack icons" />
</p>

| Category           | Technologies |
| ------------------ | ------------ |
| **Framework & UI** | ![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) |
| **Language**       | ![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) |
| **Styling**        | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) |
| **Authentication** | ![Better Auth](https://img.shields.io/badge/Better_Auth-1F2937?style=for-the-badge) ![Google OAuth](https://img.shields.io/badge/Google_OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white) ![GitHub OAuth](https://img.shields.io/badge/GitHub_OAuth-181717?style=for-the-badge&logo=github&logoColor=white) |
| **Database**       | ![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white) |
| **UI Libraries**   | ![Lucide](https://img.shields.io/badge/Lucide_React-F56565?style=for-the-badge&logo=lucide&logoColor=white) ![React Hot Toast](https://img.shields.io/badge/React_Hot_Toast-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) |
| **Tooling**        | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) |
| **Deployment**     | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) |

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

| Provider | Callback URL                                   |
| -------- | ---------------------------------------------- |
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

   | Provider | Callback URL                                                         |
   | -------- | -------------------------------------------------------------------- |
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

**Nobonita Saha Niha** — Front-End Developer

[![GitHub](https://img.shields.io/badge/GitHub-NSniha-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/NSniha)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Nobonita_Saha_Niha-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nobonita-saha-niha-04b501214/)

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
