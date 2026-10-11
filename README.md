<div align="center">

# 🛒 Bazar Dor

### Smarter market insights for everyday essentials.

**Explore grocery prices, follow market movements, and compare products across local markets—all in one place.**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<br />

**[🌐 Explore Live Website](https://bazar-dor-eommerce-site.vercel.app/)** · **[💻 View Source Code](https://github.com/NSniha/bazar-dor-eommerce-site)**

</div>

---

## 📖 Overview

**Bazar Dor** is a modern, responsive grocery price-tracking web application built to make everyday market information more accessible. It brings essential product prices, price-change indicators, category-based browsing, and market-level comparisons into a clean, intuitive interface.

Instead of navigating scattered price lists, users can quickly understand **what is getting more expensive, what is becoming more affordable, and how prices differ between markets**. The application pairs a streamlined browsing experience with account-based access to detailed product information.

Developed with **Next.js App Router**, **React**, **Tailwind CSS**, **Better Auth**, and **MongoDB Atlas**, Bazar Dor demonstrates API integration, modern authentication, dynamic routing, responsive interface design, and cloud deployment.

> **Project context:** Programming Hero — Batch 14, Assignment 07 (B14-A7).  
> **Data notice:** Displayed prices are sourced from the project API and are intended for demonstration; they should not be treated as independently verified, real-time retail quotations.

## ✨ Key Features

### 📊 1. Market Price Overview

- Explore everyday essentials through an organized, easy-to-scan interface.
- See each product's current displayed price, unit, and percentage change.
- Identify price movements using clear upward, downward, and unchanged indicators.
- Follow a horizontally scrolling market-price ticker for quick updates.

### 📈 2. Price Increase & Decrease Highlights

- Dedicated sections highlight the **top six price increases** and **top six price decreases**.
- Visual price-change badges make market trends easier to recognize.
- Product cards offer direct navigation to more detailed information.

### 🧺 3. Category-Based Product Discovery

Browse essential grocery products across eight categories:

| Category | Route |
| --- | --- |
| Rice | `/category/chal` |
| Lentils | `/category/dal` |
| Oil | `/category/tel` |
| Vegetables | `/category/shobji` |
| Fish | `/category/mach` |
| Meat | `/category/mangsho` |
| Eggs & Dairy | `/category/dim-dudh` |
| Spices | `/category/mosla` |

- Dynamic category pages use the selected category's URL slug.
- Product cards communicate essential pricing information at a glance.
- A consistent interface connects the homepage, category pages, and product details.

### 🏪 4. Detailed Product & Market Comparisons

Registered users can open individual product pages to explore more than the headline price:

- Product name, category, description, and unit information.
- **Minimum, maximum, and average** price summaries.
- Market-wise price breakdowns for comparison.
- Clear visual separation between summary information and market details.

Product-detail pages are **protected routes**. Visitors who are not signed in are redirected to authentication before accessing them.

### 🔐 5. Secure Account Authentication

Authentication is implemented with **Better Auth** and backed by **MongoDB Atlas**.

- Register using a name, email address, and password.
- Sign in using email and password.
- Authenticate through **Google OAuth** or **GitHub OAuth**.
- Maintain authenticated sessions across supported application routes.
- Receive contextual toast notifications for authentication success and failure.
- Return to the originally requested protected page after signing in.

### 👤 6. Personal Profile Management

- View account name, email address, and profile avatar.
- Display available profile images from connected social providers.
- Update the account's display name using Better Auth.
- Sign out securely using the authentication client.
- Access profile features through a session-aware navigation menu.

### 📱 7. Responsive, Accessible Interface

- Responsive layouts for desktop, tablet, and mobile devices.
- Mobile-friendly navigation with a dedicated menu drawer.
- Consistent spacing, typography, product cards, and brand colors.
- Clear focus states, accessible labels, and interactive feedback.
- Loading indicators and route-specific loading UI where implemented.

---

## 🛠️ Technology Stack

| Area | Technology | Purpose |
| --- | --- | --- |
| Framework | **Next.js 16 (App Router)** | Routing, server rendering, and application architecture |
| UI | **React 19** | Reusable components and interactive interfaces |
| Language | **JavaScript (ES6+)** | Application logic and client-side behavior |
| Styling | **Tailwind CSS 4** | Responsive design and utility-based styling |
| Authentication | **Better Auth** | Email/password and social authentication |
| Database | **MongoDB Atlas** | Persistent authentication and account records |
| Database adapter | **@better-auth/mongo-adapter** | Better Auth integration with MongoDB |
| Icons | **Lucide React** | Consistent interface iconography |
| Notifications | **React Hot Toast** | Success, error, and informational feedback |
| Data | **Bazar Dor REST API** | Product and category information |
| Deployment | **Vercel** | Production hosting and deployment |

## 🧭 Application Routes

| Route | Description | Access |
| --- | --- | --- |
| `/` | Homepage, market highlights, and product listings | Public |
| `/category/[slug]` | Products in a selected category | Public |
| `/product/[slug]` | Product details and market comparisons | Sign-in required |
| `/signin` | Email/password and social sign-in | Public |
| `/signup` | Account registration and social sign-up | Public |
| `/profile` | User information and account management | Sign-in required |
| `/profile/update` | Edit user profile information | Sign-in required |
| `/api/auth/[...all]` | Better Auth API handler | System route |

> Authentication redirects retain the destination of protected pages so users can continue where they left off.

## 📁 Project Structure

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
│       ├── bazar-api.js            # Product/category API utilities
│       └── db.js                   # MongoDB connection
├── .env.local                      # Local secrets; never commit
├── next.config.mjs                 # Next.js configuration
├── package.json
└── README.md
```

*The structure above highlights the main application files. Additional components and assets are omitted for readability.*

---

## 🔌 API Integration

The application consumes product and category data from the Programming Hero Bazar Dor API.

**Base URL**

```text
https://openapi.programming-hero.com/api/bazardor
```

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/products` | Fetch all products |
| `GET` | `/products?category=chal` | Fetch products filtered by category |
| `GET` | `/products/1` | Fetch a single product |
| `GET` | `/categories` | Fetch available categories |
| `GET` | `/categories/chal` | Fetch information about one category |

The API is the source of product and pricing information. **MongoDB is used for authentication-related records**, rather than as a replacement for the product API.

## 🚀 Getting Started

### Prerequisites

Make sure the following are available:

- **Node.js** (a current supported LTS release)
- **npm**
- A **MongoDB Atlas** database and database user
- Google and GitHub OAuth credentials to enable social authentication

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

```dotenv
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/?retryWrites=true&w=majority
MONGODB_DB_NAME=bazar_dor

BETTER_AUTH_SECRET=<generate-a-long-random-secret>
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>

GITHUB_CLIENT_ID=<your-github-client-id>
GITHUB_CLIENT_SECRET=<your-github-client-secret>
```

Replace all placeholders with credentials from your own services. Do not include angle brackets (`< >`) in actual values.

> **Security:** Never commit `.env.local`, database passwords, OAuth client secrets, or authentication secrets to version control. Store production credentials in the deployment platform's environment-variable settings.

### 4. Configure OAuth callback URLs

For local development, register these callback URLs with the corresponding OAuth providers:

**Google**

```text
http://localhost:3000/api/auth/callback/google
```

**GitHub**

```text
http://localhost:3000/api/auth/callback/github
```

The OAuth client IDs and secrets must match the applications where these redirect URLs are registered.

### 5. Start the development server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

### 6. Create a production build

```bash
npm run build
npm run start
```

---

## ☁️ Deployment on Vercel

1. Push the project to GitHub.
2. Import the repository into **Vercel**.
3. Add the environment variables from `.env.local` to the Vercel project settings.
4. Set the production authentication URL:

   ```dotenv
   BETTER_AUTH_URL=https://bazar-dor-eommerce-site.vercel.app
   ```

5. Register the production OAuth callback URLs:

   **Google:** `https://bazar-dor-eommerce-site.vercel.app/api/auth/callback/google`  
   **GitHub:** `https://bazar-dor-eommerce-site.vercel.app/api/auth/callback/github`

6. Deploy and verify sign-in, sign-up, social authentication, protected pages, and page refresh behavior.

### Production security checklist

- Use long, unique secrets and rotate credentials that have been exposed.
- Avoid making database access broadly public unless a temporary diagnostic requires it.
- Restrict MongoDB network access through an appropriate production networking strategy.
- Keep secrets server-side and out of source files, logs, and screenshots.
- Confirm Google and GitHub OAuth redirect URIs match the production domain exactly.

## 🧪 Suggested Verification Checklist

Before submitting or deploying updates, verify the following flows:

- [ ] Homepage, categories, and product cards load correctly.
- [ ] Price increase/decrease data and product details render correctly.
- [ ] Product prices sort numerically when sorting is enabled.
- [ ] Protected product pages redirect unauthenticated visitors to sign-in.
- [ ] Email registration and email/password sign-in work correctly.
- [ ] Google and GitHub authentication complete successfully.
- [ ] Profile information is displayed and name updates are saved.
- [ ] Sign-out ends the authenticated session.
- [ ] Invalid routes display a helpful not-found experience.
- [ ] Loading states, mobile navigation, and responsive layouts behave correctly.
- [ ] All dynamic routes continue to work after a hard refresh in production.
- [ ] No sensitive credentials are committed to the repository.

## 🎯 Project Goals

Bazar Dor was created to demonstrate how modern web technologies can simplify access to practical market information. Its key goals are to:

- Make essential grocery pricing easier to understand.
- Bring price movement and market comparisons into one consistent experience.
- Deliver responsive navigation and readable product information across devices.
- Apply secure authentication patterns to user-specific and protected features.
- Build maintainable, component-based application architecture with Next.js.

## 👩‍💻 Author

**Nobonita Saha Niha**  
Front-End Developer

- **GitHub:** [@NSniha](https://github.com/NSniha)
- **Project Repository:** [Bazar Dor on GitHub](https://github.com/NSniha/bazar-dor-eommerce-site)
- **Live Website:** [Bazar Dor](https://bazar-dor-eommerce-site.vercel.app/)

## 🙏 Acknowledgements

- **Programming Hero** for the B14-A7 assignment and project design brief.
- **Next.js, React, Tailwind CSS, Better Auth, and MongoDB** for the core development ecosystem.
- **Vercel** for application hosting.

---

<div align="center">

**Built with care to make everyday market information easier to explore.**

© 2026 **Bazar Dor** · Developed by **Nobonita Saha Niha**

</div>
