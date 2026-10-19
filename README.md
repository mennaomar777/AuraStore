# AuraStore

AuraStore is a full-stack storefront frontend built with the Next.js App Router and an existing external e-commerce API. Visitors can browse products and collections, search and sort listings, manage a cart and wishlist, and use account features such as checkout, order history, profile settings, and password reset.

## Features

- Homepage with a hero carousel, category and promotional sections, and featured products.
- Product catalog with product details, category, subcategory, and brand pages.
- Product search with category, brand, and price filters, sorting, and paginated results.
- Cart management, quantity changes, coupon application, and checkout with cash or online payment options.
- Wishlist management and cart/wishlist item counts in the navigation.
- Credential-based sign-up and sign-in, sign-out, and protected account routes.
- Forgot-password, reset-code verification, and password-reset flows.
- Product reviews with create, edit, and delete actions.
- Profile information and password updates, saved address management, and order history.
- Responsive layouts, light/dark theme support, loading UI, a global error page, and a not-found page.

The application delegates product, cart, order, and account data to the external API; frontend code does not replace backend authorization or payment validation.

## Tech Stack

- **Framework:** Next.js 16.2.6 App Router, React 19.2.4, TypeScript
- **Styling:** Tailwind CSS v4, PostCSS
- **UI:** shadcn/ui-style components built on Radix UI, class-variance-authority, lucide-react
- **State:** Redux Toolkit and React Redux
- **Authentication:** NextAuth.js 4 credentials provider
- **Forms and validation:** React Hook Form, Zod, and `@hookform/resolvers`
- **Notifications and themes:** Sonner, next-themes
- **Carousels:** Embla Carousel and Swiper
- **Other libraries:** `jwt-decode`, `clsx`, `tailwind-merge`

## Getting Started

### Prerequisites

- Node.js 20.9 or newer (the installed Next.js package declares this minimum)
- npm
- Access to the configured e-commerce API

### Install and run

```bash
git clone <repository-url>
cd <repository-directory>
npm ci
```

Create a local environment file as described in [Environment Variables](#environment-variables), then start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

The repository ignores `.env*` files and does not include an environment-variable template. The application references these variables:

| Variable | Purpose | Example placeholder |
| --- | --- | --- |
| `NEXTAUTH_SECRET` | Secret used by NextAuth to sign and decode session tokens. Set a strong, private value. | `replace-with-a-long-random-secret` |
| `NEXTAUTH_URL` | Canonical application URL used by NextAuth and when constructing the online checkout request. | `http://localhost:3000` |

For deployment, set `NEXTAUTH_URL` to the canonical HTTPS URL of the deployed app and configure the same `NEXTAUTH_SECRET` for the running application. Do not commit real values. The external API base URL is currently defined in the service files rather than configured through an environment variable.

Create `.env.local` in the project root, for example:

```dotenv
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-a-long-random-secret
```

## Available Scripts

These are the scripts defined in `package.json`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build. Run `npm run build` first. |
| `npm run lint` | Run ESLint. |

There is no test or standalone type-check script defined in `package.json`.

## Project Structure

```text
src/
├── app/                  App Router pages, layouts, route handlers, and global styles
│   ├── (pages)/          Store, account, and authentication routes
│   ├── _components/      Components shared by route pages
│   └── api/auth/         NextAuth route handler
├── components/ui/        Reusable UI primitives
├── hooks/                Client-side cart and wishlist hooks
├── images/               Local image assets
├── lib/                  Authentication configuration and utilities
├── providers/            Redux, session, theme, cart, and wishlist providers
├── redux/                Store and Redux slices
├── schemas/              Zod validation schemas
├── services/             External API requests
└── types/                Shared TypeScript types
```

Root-level configuration includes `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `tsconfig.json`, and `components.json`.

## Pages and Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage and featured storefront content |
| `/products` | Paginated product catalog |
| `/products/[id]` | Product details and reviews |
| `/categories` | Category directory |
| `/categories/[id]` | Category details, subcategories, and products |
| `/subcategories/[id]` | Paginated subcategory products |
| `/brands` | Brand directory |
| `/brands/[id]` | Brand product listing |
| `/search?q=...` | Search results, filters, sorting, and pagination |
| `/cart` | Shopping cart and coupon entry |
| `/checkout/[cartId]` | Checkout and payment selection |
| `/wishlist` | Saved products |
| `/allorders` | Order history |
| `/profile` | Profile and password settings |
| `/profile/addresses` | Saved address management |
| `/contact` | Contact page |
| `/signIn`, `/signUp` | Authentication pages |
| `/forgetPassword`, `/verifyResetCode`, `/resetPassword` | Password recovery flow |

The `src/app/api/auth/[...nextauth]` route serves NextAuth requests. Several catalog routes also define route-level loading UI; the app includes shared root loading, error, and not-found UI.

## API Integration

The frontend calls the existing API at `https://ecommerce.routemisr.com`. Service functions are grouped under `src/services/` for products, categories, subcategories, brands, cart, wishlist, checkout/orders, reviews, profile, addresses, and authentication.

Catalog requests use the API's `/api/v1` product, category, subcategory, brand, and review routes. Cart operations use `/api/v2/cart`; wishlist, authentication, orders, addresses, and profile operations use the paths declared in their respective service files. Authenticated service requests read the access token from the NextAuth session cookie on the server and send it to the API in a `token` header. API responses are consumed by the frontend; this repository does not contain the backend implementation.

Product search currently retrieves products through the product service and filters titles in the application. Category and brand product pages request paginated data from the API. Review the service files before changing request shapes or depending on backend-specific response behavior.

## Authentication and State Management

NextAuth.js is configured with a credentials provider. Its API route is `src/app/api/auth/[...nextauth]/route.ts`, while `src/lib/authOptions.ts` configures authentication and session callbacks. `src/proxy.ts` redirects unauthenticated requests away from protected cart, wishlist, order, checkout, profile, and product-detail routes.

Redux Toolkit holds cart and wishlist items for client UI, including navigation counts. The root layout provides Redux and NextAuth contexts and mounts providers that synchronize cart and wishlist data with the authenticated session. A separate Redux slice temporarily stores the email used during password reset.

## Production Build

Build the app and start the production server with:

```bash
npm run build
npm run start
```

The server uses the configured environment variables and must be able to reach the external API. `next.config.ts` allows optimized remote images from `ecommerce.routemisr.com` over HTTPS.

## Deployment Notes

- Configure `NEXTAUTH_SECRET` and the canonical `NEXTAUTH_URL` in the hosting environment. Use HTTPS for the deployed URL.
- Confirm the host can reach `ecommerce.routemisr.com` and that the API remains available to the application.
- The API origin is hardcoded in service files; changing environments or API origins requires a code/configuration change.
- Online checkout constructs its request using `NEXTAUTH_URL`; verify the payment provider's expected return URL behavior in the target environment.
- No deployment platform or live deployment configuration is included in the files inspected.
