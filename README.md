# Olivé

Olivé is a responsive e-commerce front-end built with React and Vite. Visitors can browse products, filter by category, search the catalog, open product details, and switch between English and Macedonian. After creating a local demo account, they can save favorites and manage a shopping cart.

Product data comes from the public [DummyJSON](https://dummyjson.com/) API. Authentication, carts, favorites, theme, and language preferences are stored in the browser with `localStorage`. The project has no backend, database, or real payment processing.

**Live application:** [tanjabalalovska1-arch.github.io/Online-Shop](https://tanjabalalovska1-arch.github.io/Online-Shop/)

## Table of Contents

1. [Features](#features)
2. [Technologies and APIs](#technologies-and-apis)
3. [Requirements](#requirements)
4. [Local Setup](#local-setup)
5. [Available Scripts](#available-scripts)
6. [Environment Variables](#environment-variables)
7. [Project Structure](#project-structure)
8. [How the Application Works](#how-the-application-works)
9. [Routes](#routes)
10. [Local Storage](#local-storage)
11. [Styling](#styling)
12. [GitHub Pages Deployment](#github-pages-deployment)
13. [Legacy Files](#legacy-files)
14. [Limitations and Security](#limitations-and-security)

## Features

- Browse products from DummyJSON in a responsive product grid.
- Filter products by category using the Shop sidebar.
- Search products with a 500 ms debounced search input and a clear-search button.
- Keep `search`, `category`, and `page` state in the URL query string.
- Paginate the Shop catalog at 16 products per page.
- Open a product page with breadcrumbs, image, description, brand, category, price, and add-to-cart action.
- Save and restore scroll position when returning from a product opened from the Shop or search results.
- Scroll back to the products section after selecting a different category.
- Register and log in with a local demo account.
- Add products to a cart, change quantities, remove items, clear the cart, and view a total.
- Save products to a favorites list and see the favorites count in the header.
- Open the cart in a slide-in drawer from the header.
- Toggle between light and dark themes; the choice persists after reload.
- Switch the interface between English and Macedonian; the choice persists after reload.
- Use a custom 404 page for unknown routes.
- Deploy automatically to GitHub Pages with GitHub Actions.

## Technologies and APIs

Versions below reflect the current lockfile (`package-lock.json`).

| Technology | Version | Purpose |
| --- | ---: | --- |
| React | 19.3.0 | UI components, hooks, context, and reducers |
| React DOM | 19.3.0 | Renders the React application in the browser |
| Vite | 8.3.5 | Development server and production build |
| React Router DOM | 7.18.4 | Client-side routing with `HashRouter` |
| React Context API | - | Shared auth, cart, favorites, search, theme, and language state |
| `useReducer` | - | Cart and search state management |
| `localStorage` | Browser API | Persists users, cart, favorites, theme, and language |
| DummyJSON | - | Demo product, category, and product-detail data |
| CSS and CSS Modules | - | Global design system and component-scoped styles |
| Oxlint | 1.86.0 | Static code checking via `npm run lint` |
| GitHub Actions and GitHub Pages | - | Builds and hosts the production site |

### Build tooling

- `@vitejs/plugin-react` enables React support in Vite.
- `@rolldown/plugin-babel` and `babel-plugin-react-compiler` enable the React Compiler preset.

### External assets

- The Home hero uses a remote Unsplash image with a local fallback (`src/assets/hero.png`). Product images also fall back to the local image if a remote thumbnail fails.

### DummyJSON endpoints

The active app accesses DummyJSON through `src/api/client.js` and `src/api/products.js`.

| Function | Endpoint | Purpose |
| --- | --- | --- |
| `getProducts(limit, signal)` | `GET /products?limit=...` | Load products for the Shop and the full catalog for local search |
| `getProductById(id)` | `GET /products/:id` | Load a single product |
| `getProductsByCategory(category, signal)` | `GET /products/category/:category` | Load products in a category |
| `getCategories(signal)` | `GET /products/categories` | Load the category sidebar |
| `searchProducts(query, signal)` | `GET /products/search?q=...` | Search helper used only by the unused `useProducts` hook |

The active search is implemented in `SearchContext`. It loads the full product list with `getProducts(0)` and filters locally by title, description, brand, category, and translated category names. The Shop input debounces calls to that search function.

## Requirements

- Node.js 22.12 or newer (recommended; the deployment workflow uses Node 22)
- npm, included with Node.js
- Git for cloning the repository

Vite 8 also supports Node.js 20.19+, but Node.js 22 LTS is recommended for consistency with the GitHub Actions workflow.

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/tanjabalalovska1-arch/Online-Shop.git
cd Online-Shop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API URL (optional)

The app falls back to `https://dummyjson.com`, so an environment file is optional for local development.

To customize the API base URL, create `.env` from `.env.example`.

```bash
# macOS or Linux
cp .env.example .env
```

```powershell
# Windows PowerShell
Copy-Item .env.example .env
```

Set the value in `.env`.

```env
VITE_API_URL=https://dummyjson.com
```

### 4. Start the development server

```bash
npm run dev
```

Because `vite.config.js` sets `base: "/Online-Shop/"`, open:

```text
http://localhost:5173/Online-Shop/
```

The app uses hash routing, so application routes appear after `#`. For example:

```text
http://localhost:5173/Online-Shop/#/shop
```

### 5. Create a production build

```bash
npm run build
```

The optimized files are written to `dist/`.

### 6. Preview the production build

```bash
npm run preview
```

With the configured base path, the preview is normally available at:

```text
http://localhost:4173/Online-Shop/
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot module replacement |
| `npm run build` | Create an optimized production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run Oxlint using `.oxlintrc.json` |

There is no automated test script. Build and lint are the available automated checks.

## Environment Variables

| Variable | Required | Description | Example |
| --- | --- | --- | --- |
| `VITE_API_URL` | No | Base URL for the DummyJSON API | `https://dummyjson.com` |

- `src/api/client.js` reads `import.meta.env.VITE_API_URL` and falls back to `https://dummyjson.com` when it is not set.
- Vite exposes only variables prefixed with `VITE_` to browser code.
- `.env` and `.env.local` are ignored by Git. `.env.example` is tracked.
- The GitHub Actions workflow sets `VITE_API_URL=https://dummyjson.com` at build time.
- Do not place secrets or private credentials in a Vite environment file. All `VITE_*` values are included in the client bundle.

### API client behavior

`src/api/client.js` provides a central `apiClient(endpoint, options)` function.

- It prefixes the endpoint with `VITE_API_URL`.
- It adds `Content-Type: application/json`.
- It throws an `ApiError` containing the HTTP status and response data for failed requests.
- It retries network errors and HTTP 5xx responses up to three total attempts, with a one-second delay.
- It does not retry HTTP 4xx responses or aborted requests.
- It respects `AbortSignal`, allowing components and hooks to cancel stale requests.

## Project Structure

```text
Online-Shop/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages build and deployment
├── public/
│   ├── favicon.svg                 # Browser tab icon
│   └── icons.svg                   # Unused icon asset
├── src/
│   ├── api/
│   │   ├── client.js               # Fetch wrapper, retries, ApiError
│   │   └── products.js             # Product and category API functions
│   ├── assets/
│   │   ├── hero.png                # Local fallback image
│   │   ├── react.svg               # Unused asset
│   │   └── vite.svg                # Unused asset
│   ├── components/
│   │   ├── Breadcrumbs.jsx
│   │   ├── Breadcrumbs.css
│   │   ├── Cart.jsx                # Cart drawer content
│   │   ├── Footer.jsx
│   │   ├── Header.jsx              # Navigation, badges, account, theme, language
│   │   ├── ProductCard.jsx
│   │   ├── ProductCard.module.css
│   │   ├── AccessibleDropdown.jsx  # Unused learning demo
│   │   ├── CounterDemo.jsx         # Unused learning demo
│   │   ├── FetchDemo.jsx           # Unused learning demo
│   │   ├── SignupForm.jsx          # Unused learning demo
│   │   └── ToggleDemo.jsx          # Unused learning demo
│   ├── context/
│   │   ├── AuthContext.jsx         # Registration, login, logout
│   │   ├── CartContext.jsx         # Per-user cart state
│   │   ├── FavoritesContext.jsx    # Per-user favorites
│   │   ├── LanguageContext.jsx     # English and Macedonian UI
│   │   ├── SearchContext.jsx       # Search state and local filtering
│   │   └── ThemeContext.jsx        # Light and dark theme
│   ├── hooks/
│   │   ├── useApi.js               # API runner with loading and error state
│   │   ├── useLocalStorage.js      # localStorage-backed state
│   │   ├── useFetch.js             # Unused by the active app
│   │   ├── useProducts.js          # Unused by the active app
│   │   ├── useCounter.js           # Used only by an unused demo
│   │   └── useToggle.js            # Used only by an unused demo
│   ├── layouts/
│   │   └── MainLayout.jsx          # Shared routed content wrapper
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── About.css
│   │   ├── Favorites.jsx
│   │   ├── Favorites.module.css
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   ├── NotFound.jsx
│   │   ├── ProductPage.jsx
│   │   ├── Register.jsx
│   │   ├── Register.css
│   │   ├── SearchPage.jsx
│   │   ├── SearchPage.css
│   │   └── Shop.jsx                # Legacy Shop page; not routed
│   ├── ProductDetails/
│   │   ├── ProductDetails.jsx
│   │   └── ProductDetails.module.css
│   ├── translations/
│   │   └── translations.js         # English and Macedonian strings
│   ├── App.jsx                     # App shell, routes, active Shop, cart drawer
│   ├── App.css                     # Main design system and responsive styles
│   ├── index.css                   # Base reset, tokens, and theme variables
│   ├── main.jsx                    # React entry point and providers
│   ├── data.js                     # Unused static product data
│   ├── DocumentTitle.jsx           # Unused learning demo
│   ├── PostList.jsx                # Unused JSONPlaceholder demo
│   └── UserList.jsx                # Unused JSONPlaceholder demo
├── .env.example
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

Development reports such as `SESSION-21-REVIEW.md` and `STAGE-*.md` are present at the repository root. They are documentation and are not imported by the app.

## How the Application Works

### Providers

`src/main.jsx` mounts the app with this provider order:

```text
StrictMode
  └── LanguageProvider
        └── AuthProvider
              └── HashRouter
                    └── CartProvider
                          └── ThemeProvider
                                └── SearchProvider
                                      └── FavoritesProvider
                                            └── App
```

`AuthProvider` wraps `CartProvider` and `FavoritesProvider` because those contexts use the signed-in user to select per-user storage keys.

### Routing

`src/App.jsx` renders the persistent `Header`, lazy-loaded routes inside `Suspense`, the `Footer`, and the cart drawer. Most page routes are loaded with `React.lazy()`; the Shop component is defined directly inside `App.jsx`.

### Shop

The active Shop is defined inside `src/App.jsx`. The older `src/pages/Shop.jsx` is not routed.

The Shop:

- Loads categories through `getCategories()`.
- Loads all products through `getProducts(0)` or category products through `getProductsByCategory()`.
- Uses `SearchContext` results when a search term is active.
- Filters search results by category when both are selected.
- Keeps `search`, `category`, and `page` in the URL query string.
- Shows 16 products per page.
- Resets to page 1 when the search term or category changes.
- Updates the URL when the search term, category, or page changes.
- Saves `window.scrollY` when opening a product and restores it when returning.
- Scrolls to the products section after selecting a different category.

### Product details

`ProductPage` reads `:id` from the route, calls `getProductById(id)`, and renders `ProductDetails`. The back action uses `location.state.from` when available and restores the saved scroll position.

### Authentication

`AuthContext` provides `user`, `users`, `register`, `login`, and `logout`.

- Registration rejects duplicate emails case-insensitively.
- The Register page requires a password of at least 6 characters and matching confirmation.
- Login checks the stored email and password.
- Logout clears the current user; the header account menu then navigates home.

### Cart and favorites

`CartContext` uses `useReducer` with four actions.

| Action | Effect |
| --- | --- |
| `ADD_ITEM` | Add a product or increase its quantity |
| `REMOVE_ITEM` | Decrease quantity and remove the item at zero |
| `DELETE_ITEM` | Remove an item completely |
| `CLEAR_CART` | Empty the cart |

Both the cart and favorites require a signed-in user. Adding to the cart or toggling a favorite while signed out returns `false`, and the UI shows a login reminder.

Cart and favorites providers are keyed by the current user ID, so each local account has separate data.

### Theme and language

- `ThemeContext` toggles between `"light"` and `"dark"`, stores the choice under `localStorage["theme"]`, and applies it through `document.body[data-theme]`.
- `LanguageContext` supports `"en"` and `"mk"`, stores the choice under `localStorage["olive-language"]`, and sets `document.documentElement.lang`.
- `src/translations/translations.js` contains UI strings and category name translations for both languages.

## Routes

The app uses `HashRouter`, so routes appear after `#` in the browser URL.

| Route | Page | Description |
| --- | --- | --- |
| `/` | `src/pages/Home.jsx` | Landing page with hero, shop link, and login or register links for guests |
| `/shop` | `Shop` in `src/App.jsx` | Catalog with category sidebar, search, URL filters, and pagination |
| `/products/:id` | `src/pages/ProductPage.jsx` | Single product details with breadcrumbs and back navigation |
| `/search?q=...` | `src/pages/SearchPage.jsx` | Search results driven by the `q` query parameter |
| `/favorites` | `src/pages/Favorites.jsx` | Saved products for the signed-in user; empty state for guests |
| `/login` | `src/pages/Login.jsx` | Local demo login form |
| `/register` | `src/pages/Register.jsx` | Local demo registration form |
| `/about` | `src/pages/About.jsx` | Static brand story |
| `*` | `src/pages/NotFound.jsx` | Fallback 404 page |

On the live GitHub Pages site, routes look like this:

```text
https://tanjabalalovska1-arch.github.io/Online-Shop/#/shop
https://tanjabalalovska1-arch.github.io/Online-Shop/#/products/1
```

There is no dashboard route in the current implementation.

## Local Storage

| Data | Key | Notes |
| --- | --- | --- |
| Registered users | `olive-users` | Array of `{ id, name, email, password }` |
| Current user | `olive-current-user` | `{ id, name, email }` |
| Cart | `shopping-cart-<userId>` | Per signed-in user |
| Guest cart fallback | `shopping-cart-guest` | Not populated through the UI because adding requires login |
| Favorites | `urban-nest-favorites-<userId>` | Per signed-in user; legacy `urban-nest` prefix retained |
| Guest favorites fallback | `urban-nest-favorites-guest` | Not populated through the UI because favoriting requires login |
| Theme | `theme` | `"light"` or `"dark"` |
| Language | `olive-language` | `"en"` or `"mk"` |

All of this data is local to the browser and is not synchronized with a server.

## Styling

- `src/index.css` contains the base reset, root variables, and light and dark theme variable sets for `[data-theme]` and `.app.light` / `.app.dark`.
- `src/App.css` contains the main design system: brand colours, fixed header, navigation, Shop layout, product grid, cart drawer, account menu, and footer.
- Page-specific styles live in `src/pages/*.css`.
- Scoped styles use CSS Modules for `ProductCard`, `Favorites`, and `ProductDetails`. `Breadcrumbs` uses its own `Breadcrumbs.css` file.
- The palette uses cream, beige, rose, and brown tones.
- Playfair Display is loaded from Google Fonts in `index.html`.
- Theme styles are selected by `body[data-theme]` and the matching `light` or `dark` class on the app root.
- Responsive breakpoints adapt the header, sidebars, product grid, forms, and cart drawer for tablet and mobile layouts.

## GitHub Pages Deployment

The workflow is defined in `.github/workflows/deploy.yml`.

### Trigger and permissions

- Runs on every push to the `master` branch.
- Uses a `pages` concurrency group.
- Requests `contents: read`, `pages: write`, and `id-token: write` permissions.

### Build job

1. Check out the repository with `actions/checkout@v4`.
2. Configure GitHub Pages with `actions/configure-pages@v5`.
3. Install Node.js 22 with npm caching using `actions/setup-node@v4`.
4. Run `npm ci`.
5. Run `npm run build` with `VITE_API_URL=https://dummyjson.com`.
6. Upload `dist/` with `actions/upload-pages-artifact@v3`.

### Deploy job

- Depends on the build job.
- Uses the `github-pages` environment.
- Deploys the uploaded artifact with `actions/deploy-pages@v4`.

### Required repository settings

- GitHub Pages must be configured to deploy from GitHub Actions.
- The repository name and Vite base path must match. `vite.config.js` sets `base: "/Online-Shop/"`, matching the `Online-Shop` repository.
- `HashRouter` is used so client-side routes work on GitHub Pages without server-side rewrite rules.

If the repository is renamed or forked under a different name, update `base` in `vite.config.js` to match the new repository path.

## Legacy Files

These files are not part of the running app. They remain from earlier stages or learning exercises and should be reviewed before removal.

| File | Status |
| --- | --- |
| `src/pages/Shop.jsx` | Older Shop implementation; not routed. It imports a non-existent `../components/ProductCard/ProductCard` path and uses hardcoded API URLs. |
| `src/data.js` | Static sample product data; not imported. |
| `src/DocumentTitle.jsx` | Small `document.title` demo; not imported. |
| `src/PostList.jsx` | JSONPlaceholder posts demo; not imported. |
| `src/UserList.jsx` | JSONPlaceholder users demo; not imported. |
| `src/components/AccessibleDropdown.jsx` | Accessibility demo; not imported. |
| `src/components/SignupForm.jsx` | Local-storage form demo; the real auth pages are `Login.jsx` and `Register.jsx`. |
| `src/components/CounterDemo.jsx` | Demonstrates `useCounter`; not imported. |
| `src/components/FetchDemo.jsx` | Demonstrates `useFetch`; not imported. |
| `src/components/ToggleDemo.jsx` | Demonstrates `useToggle`; not imported. |
| `src/hooks/useFetch.js` | Not used by the active app. |
| `src/hooks/useProducts.js` | Not used by the active app; search is handled by `SearchContext`. |
| `src/hooks/useCounter.js` | Used only by the unused `CounterDemo`. |
| `src/hooks/useToggle.js` | Used only by the unused `ToggleDemo`. |
| `src/assets/react.svg` | Unused asset. |
| `src/assets/vite.svg` | Unused asset. |
| `public/icons.svg` | Unused asset. |

`src/assets/hero.png` is active and serves as the fallback image for the Home hero, product cards, and product details.

`src/App.jsx` contains a large block of commented-out legacy Shop and learning-demo code above the active `Shop` component.

## Limitations and Security

This is a learning and demo project, not a production store.

### Demo authentication and security

- Authentication is entirely client-side. There is no backend, identity provider, session token, or server-side validation.
- Passwords are stored as plain text in `localStorage` under `olive-users`. They are not hashed or encrypted.
- The signed-in user is also stored in `localStorage` and can be edited by anyone with access to the browser.
- Any script running on the page origin could read the stored users and passwords. This implementation is unsuitable for real accounts or sensitive information.
- Do not reuse real passwords or enter sensitive personal data.
- There are no route guards. Login is required only by cart and favorites actions.

### Other limitations

- There is no checkout, payment processing, order history, inventory management, or server-side user profile.
- Cart and favorites are stored only in the current browser and do not sync across devices or browsers.
- Different local accounts on the same browser use separate cart and favorite storage, but the data is still local to that browser.
- Product data comes from the public DummyJSON demo API and may change, be rate-limited, or be unavailable.
- The active search loads the full product list and filters it in the browser. This is acceptable for a demo catalog but not suitable for a large production catalog.
- The Home hero image and product images rely on external services. A local fallback image is used when an image fails to load.
- The app uses hash routing such as `/#/shop`. Direct non-hash paths such as `/Online-Shop/shop` are not handled by the static GitHub Pages host.
- There is no automated test suite. The available checks are `npm run build` and `npm run lint`.
- The project does not include a license file.

### Development notes

- The active Shop component lives inside `src/App.jsx`, which makes that file large. Moving it to `src/pages/Shop.jsx` would be a reasonable future refactor, but it is not part of the current implementation.
- `index.html` uses the page title `Online-shop`, while the application brand is `Olivé`.
- The npm package name is `olive`; the application brand is `Olivé`.
