# Olivé

Olivé is a responsive e-commerce front end built with React and Vite. Visitors can browse products, filter by category, search the catalog, open product details, and switch between English and Macedonian. After creating a local demo account, they can save favorites and manage a shopping cart.

Product data comes from the public [DummyJSON](https://dummyjson.com/) API. Authentication, carts, favorites, theme, and language preferences are stored in the browser with `localStorage`. The project has no backend, database, real authentication service, or payment processing.

**Live application:** [tanjabalalovska1-arch.github.io/Online-Shop](https://tanjabalalovska1-arch.github.io/Online-Shop/)

**Repository:** [github.com/tanjabalalovska1-arch/Online-Shop](https://github.com/tanjabalalovska1-arch/Online-Shop)

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Requirements](#requirements)
4. [Getting Started](#getting-started)
5. [Available Scripts](#available-scripts)
6. [Environment Variables](#environment-variables)
7. [Project Structure](#project-structure)
8. [Application Architecture](#application-architecture)
9. [Feature Details](#feature-details)
10. [Routes](#routes)
11. [Local Storage](#local-storage)
12. [Styling](#styling)
13. [Testing](#testing)
14. [Build and GitHub Pages Deployment](#build-and-github-pages-deployment)
15. [Legacy and Unused Files](#legacy-and-unused-files)
16. [Known Implementation Notes](#known-implementation-notes)
17. [Limitations and Security](#limitations-and-security)
18. [Author](#author)
19. [License](#license)

## Features

- Browse products from DummyJSON in a responsive product grid.
- Filter products by category using the Shop category sidebar.
- Search products with a 500 ms debounced input and a clear-search button.
- Keep `search`, `category`, and `page` state in the URL query string on the Shop page.
- Paginate the Shop catalog at 16 products per page.
- Filter search results by the selected category.
- Open a product page with breadcrumbs, image, description, brand, category, price, and an add-to-cart action.
- Save and restore scroll position when returning from a product opened from the Shop or search results.
- Scroll back to the products section after selecting a different category.
- Register and log in with a local demo account.
- Add products to a cart, increase or decrease quantities, remove items, clear the cart, and view a total.
- Save products to a favorites list and see the favorites count in the header.
- Open the cart in a slide-in drawer from the header.
- Toggle between light and dark themes; the choice persists after reload.
- Switch the interface between English and Macedonian; the choice persists after reload.
- Use a custom 404 page for unknown routes.
- Recover from rendering errors with a global `ErrorBoundary` and retry action.
- Deploy automatically to GitHub Pages with GitHub Actions.

## Tech Stack

Versions below reflect the installed dependencies in `package-lock.json`.

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
| Vitest | 5.1.0 | Automated test runner |
| React Testing Library | 16.3.3 | Component and integration tests |
| `@testing-library/jest-dom` | 7.0.1 | DOM matchers for Vitest |
| `@testing-library/user-event` | 14.6.9 | User interaction simulation in tests |
| `@testing-library/dom` | 10.4.2 | DOM testing utilities |
| jsdom | 31.0.0 | Browser-like test environment |
| GitHub Actions and GitHub Pages | - | Builds and hosts the production site |

### Build tooling

- `@vitejs/plugin-react` enables React support in Vite.
- `@rolldown/plugin-babel` and `babel-plugin-react-compiler` enable the React Compiler preset in the production Vite configuration.
- `vitest.config.js` uses `@vitejs/plugin-react` and jsdom for tests, independently of the production `vite.config.js`.

### External assets

- The Home hero uses a remote Unsplash image with a local fallback (`src/assets/hero.png`).
- Product images and product-detail images also fall back to `src/assets/hero.png` when a remote thumbnail fails to load.
- Playfair Display is loaded from Google Fonts in `index.html`.

## Requirements

- Node.js `^20.19.0` or `>=22.12.0`, as required by Vite 8.
- Node.js 22 LTS is recommended for consistency with the GitHub Actions workflow.
- npm, included with Node.js.
- Git for cloning the repository.

## Getting Started

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

Set the value in `.env`:

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
| `npm test` | Run the Vitest test suite once |
| `npm run test:watch` | Run Vitest in watch mode |

The automated checks currently available are `npm test` and `npm run lint`. The test suite currently covers three component test files with four tests; see [Testing](#testing).

## Environment Variables

| Variable | Required | Description | Example |
| --- | --- | --- | --- |
| `VITE_API_URL` | No | Base URL for the DummyJSON API | `https://dummyjson.com` |

- `src/api/client.js` reads `import.meta.env.VITE_API_URL` and falls back to `https://dummyjson.com` when it is not set.
- Vite exposes only variables prefixed with `VITE_` to browser code.
- `.env` and `.env.local` are ignored by Git. `.env.example` is tracked.
- The GitHub Actions workflow sets `VITE_API_URL=https://dummyjson.com` at build time.
- Do not place secrets or private credentials in a Vite environment file. All `VITE_*` values are included in the client bundle.

## Project Structure

```text
Online-Shop/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages build and deployment
├── public/
│   ├── 404.html                    # Custom static 404 fallback for GitHub Pages
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
│   │   ├── AccessibleDropdown.jsx  # Unused learning demo
│   │   ├── AddToCart.test.jsx      # Add-to-cart integration test
│   │   ├── Breadcrumbs.css
│   │   ├── Breadcrumbs.jsx
│   │   ├── Cart.jsx                # Cart drawer content
│   │   ├── CounterDemo.jsx         # Unused learning demo
│   │   ├── ErrorBoundary.jsx       # Global rendering error boundary
│   │   ├── ErrorBoundary.test.jsx
│   │   ├── FetchDemo.jsx           # Unused learning demo
│   │   ├── Footer.jsx
│   │   ├── Header.jsx              # Navigation, badges, account, theme, language
│   │   ├── ProductCard.jsx
│   │   ├── ProductCard.module.css
│   │   ├── ProductCard.test.jsx
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
│   │   ├── useCounter.js           # Used only by an unused demo
│   │   ├── useFetch.js             # Unused by the active app
│   │   ├── useLocalStorage.js      # localStorage-backed state
│   │   ├── useProducts.js          # Unused by the active app
│   │   └── useToggle.js            # Used only by an unused demo
│   ├── layouts/
│   │   └── MainLayout.jsx          # Shared routed content wrapper
│   ├── pages/
│   │   ├── About.css
│   │   ├── About.jsx
│   │   ├── Favorites.jsx
│   │   ├── Favorites.module.css
│   │   ├── Home.css
│   │   ├── Home.jsx
│   │   ├── Login.css
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── ProductPage.jsx
│   │   ├── Register.css
│   │   ├── Register.jsx
│   │   ├── SearchPage.css
│   │   ├── SearchPage.jsx
│   │   └── Shop.jsx                # Legacy Shop page; not routed
│   ├── ProductDetails/
│   │   ├── ProductDetails.jsx
│   │   └── ProductDetails.module.css
│   ├── test/
│   │   ├── fixtures.js             # Shared test product and user fixtures
│   │   ├── renderWithProviders.jsx # Test renderer with contexts
│   │   └── setup.js                # jest-dom setup and test cleanup
│   ├── translations/
│   │   └── translations.js         # English and Macedonian strings
│   ├── App.css                     # Main design system and responsive styles
│   ├── App.jsx                     # App shell, routes, active Shop, cart drawer
│   ├── data.js                     # Unused static product data
│   ├── DocumentTitle.jsx           # Unused learning demo
│   ├── index.css                   # Base reset, tokens, and theme variables
│   ├── main.jsx                    # React entry point and providers
│   ├── PostList.jsx                # Unused JSONPlaceholder demo
│   └── UserList.jsx                # Unused JSONPlaceholder demo
├── .env.example
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── vitest.config.js
└── README.md
```

`dist/` is generated by `npm run build` and is ignored by Git. `.env` and `.env.local` are also ignored; only `.env.example` is tracked.

## Application Architecture

### Entry point and providers

`src/main.jsx` mounts the application with this provider order:

```text
StrictMode
└── ErrorBoundary
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

`ErrorBoundary` is the outermost application wrapper inside `StrictMode`. It catches rendering errors from any provider below it or from `App`, shows a fallback with a `Try again` button, and logs the error and component stack through `componentDidCatch`. It does not catch errors thrown in event handlers or asynchronous callbacks, which is standard React error-boundary behavior.

### Routing

`src/App.jsx` renders the persistent `Header`, lazy-loaded routes inside `Suspense`, the `Footer`, and the cart drawer. Most page routes are loaded with `React.lazy()`; the active Shop component is defined directly inside `App.jsx`.

All routes are rendered inside `MainLayout`:

- Home, Login, and Register receive a `<div>` wrapper because those pages own their `<main>` element.
- All other routes receive a `<main>` wrapper.

`HashRouter` is used so client-side routes work on GitHub Pages without server-side rewrite rules. Application routes therefore appear after `#` in the browser URL.

### Contexts

| Context | Responsibility | Persistence |
| --- | --- | --- |
| `AuthProvider` | Registration, login, logout, current user | `olive-users`, `olive-current-user` |
| `CartProvider` | Add, remove, delete, clear, and total cart state | `shopping-cart-<userId>` |
| `FavoritesProvider` | Add and remove favorite products | `urban-nest-favorites-<userId>` |
| `SearchProvider` | Search query, loading/error state, locally filtered results | In memory |
| `ThemeProvider` | Light/dark theme and toggle | `theme` |
| `LanguageProvider` | English/Macedonian UI strings and category names | `olive-language` |

### Custom hooks

- `useApi(apiFn)` runs an async API function with an `AbortController`, exposes `data`, `loading`, and `error`, and cancels the request when the function changes or the component unmounts. It is used by the Shop for products and categories.
- `useLocalStorage(key, initialValue)` reads and writes JSON-serialized state, handles key changes safely, and falls back to the initial value on read errors. It is used by the cart and favorites contexts.
- `useFetch`, `useProducts`, `useCounter`, and `useToggle` remain from earlier learning exercises and are not used by the active application, except where noted in [Legacy and Unused Files](#legacy-and-unused-files).

### API integration

`src/api/client.js` provides a central `apiClient(endpoint, options)` function:

- It prefixes the endpoint with `VITE_API_URL`, falling back to `https://dummyjson.com`.
- It adds `Content-Type: application/json`.
- It throws an `ApiError` containing the HTTP status and response data for failed requests.
- It retries network errors and HTTP 5xx responses up to three total attempts, with a one-second delay.
- It does not retry HTTP 4xx responses or aborted requests.
- It respects `AbortSignal`, allowing components and hooks to cancel stale requests.

The active app accesses DummyJSON through `src/api/client.js` and `src/api/products.js`:

| Function | Endpoint | Purpose |
| --- | --- | --- |
| `getProducts(limit, signal)` | `GET /products?limit=...` | Load products for the Shop and the full catalog for local search |
| `getProductById(id)` | `GET /products/:id` | Load a single product |
| `getProductsByCategory(category, signal)` | `GET /products/category/:category` | Load products in a category |
| `getCategories(signal)` | `GET /products/categories` | Load the category sidebar |
| `searchProducts(query, signal)` | `GET /products/search?q=...` | Search helper used only by the unused `useProducts` hook |

The active search is implemented in `SearchContext`. It loads the full product list with `getProducts(0)` and filters locally by title, description, brand, category, category names with hyphens replaced by spaces, and translated category names. The Shop input debounces calls to that search function by 500 ms.

### Loading, error, and empty states

| Area | Loading | Error | Empty |
| --- | --- | --- | --- |
| App route loading | Suspense fallback: `app.loadingPage` | - | - |
| Shop products | `shop.loading` | `shop.error` with the API message | `shop.noProducts` |
| Shop search | `shop.searching` | `shop.error` with the search message | `shop.noProducts` |
| Shop categories | - | Category error message in the sidebar | - |
| Search page | `search.loading` | `search.error` | `search.noProducts` |
| Product page | `product.loading` | Fetch errors are logged and the page shows `product.notFound` | - |
| Favorites | - | - | `favorites.empty` with a Shop button |
| Global rendering failure | - | `ErrorBoundary` fallback with retry | - |

`useApi` and `SearchContext` abort stale requests when their inputs change or the component unmounts. `ProductPage` does not use `useApi`; it manages its own loading state and logs fetch failures to the console before showing the not-found message.

## Feature Details

### Home

- Displays a hero section with a remote Unsplash image and a local fallback.
- Shows a guest sidebar with Login and Register links when no user is signed in.
- Provides a button that navigates to `/shop`.
- Uses translated copy from `src/translations/translations.js`.

### Shop and catalog

The active Shop is defined inside `src/App.jsx`. The older `src/pages/Shop.jsx` is not routed.

The Shop:

- Loads categories through `getCategories()`.
- Loads all products through `getProducts(0)` or category products through `getProductsByCategory()`.
- Uses `SearchContext` results when a search term is active.
- Filters search results by category when both a search term and category are selected.
- Keeps `search`, `category`, and `page` in the URL query string.
- Shows 16 products per page.
- Resets to page 1 when the search term or category changes.
- Updates the URL when the search term, category, or page changes.
- Saves `window.scrollY` when opening a product and restores it when returning.
- Scrolls to the products section after selecting a different category.

### Search

- The Shop search input is debounced by 500 ms and includes a clear-search button.
- Search is performed locally against the full catalog loaded by `SearchContext`.
- Searches match title, description, brand, category, category names with hyphens replaced by spaces, and translated category names.
- The dedicated Search page is available at `/search?q=...` and reads the `q` query parameter. It is not linked from the main navigation in the current UI.
- Selecting a product from the Search page saves the current path and scroll position, which the Product page uses for the back navigation.

### Product details

`ProductPage` reads `:id` from the route, calls `getProductById(id)`, and renders `ProductDetails`. The page includes breadcrumbs, product image, description, price, brand, category, and an add-to-cart button. The back action uses `location.state.from` when available and restores the saved scroll position.

If the product cannot be loaded, the page logs the error and displays `product.notFound`.

### Authentication

`AuthContext` provides `user`, `users`, `register`, `login`, and `logout`.

- Registration rejects duplicate emails case-insensitively.
- The Register page requires a password of at least 6 characters and matching confirmation.
- Login checks the stored email and password.
- Logout clears the current user; the header account menu then navigates home.
- The signed-in user is restored from `localStorage` and validated against the registered users by email.
- The header account menu is rendered in a portal and supports Escape, ArrowUp, and ArrowDown keyboard navigation.

### Cart

`CartContext` uses `useReducer` with four actions:

| Action | Effect |
| --- | --- |
| `ADD_ITEM` | Add a product or increase its quantity |
| `REMOVE_ITEM` | Decrease quantity and remove the item at zero |
| `DELETE_ITEM` | Remove an item completely |
| `CLEAR_CART` | Empty the cart |

The cart opens in a slide-in drawer from the header. It shows a per-item quantity control, line total, overall total, a remove button, and a clear-cart button with confirmation.

Adding to the cart requires a signed-in user. When signed out, `addToCart` returns `false` and the UI shows a login reminder. Cart providers are keyed by the current user ID, so each local account has separate cart data.

### Favorites

- Favorites are available on the Favorites page and through the header heart button.
- The header displays a favorites count badge.
- Toggling a favorite requires a signed-in user; when signed out, `toggleFavorite` returns `false` and the UI shows a login reminder.
- Favorites providers are keyed by the current user ID, so each local account has separate favorites.
- The Favorites page has an empty state with a button back to the Shop.

### Theme and language

- `ThemeContext` toggles between `"light"` and `"dark"`, stores the choice under `localStorage["theme"]`, and applies it through `document.body[data-theme]`.
- Theme styles are defined for both `[data-theme="light"]` / `[data-theme="dark"]` and the matching `.app.light` / `.app.dark` classes.
- `LanguageContext` supports `"en"` and `"mk"`, stores the choice under `localStorage["olive-language"]`, and sets `document.documentElement.lang`.
- `src/translations/translations.js` contains UI strings and category name translations for both languages.
- The header exposes desktop EN/MK buttons and a mobile language toggle.
- The theme button switches between light and dark mode and updates its accessible label accordingly.

### Error handling and 404

- `ErrorBoundary` catches rendering errors in the provider tree and application, shows a fallback with `Something went wrong`, and provides a `Try again` button that resets the error state.
- The fallback uses `role="alert"`.
- Unknown application routes render `src/pages/NotFound.jsx`, which shows a translated 404 message and a link home.
- `public/404.html` provides a static GitHub Pages fallback for paths that do not match a deployed file.

## Routes

The app uses `HashRouter`, so routes appear after `#` in the browser URL.

| Route | Page | Description |
| --- | --- | --- |
| `/` | `src/pages/Home.jsx` | Landing page with hero, shop link, and login or register links for guests |
| `/shop` | `Shop` in `src/App.jsx` | Catalog with category sidebar, search, URL filters, and pagination |
| `/products/:id` | `src/pages/ProductPage.jsx` | Single product details with breadcrumbs and back navigation |
| `/search?q=...` | `src/pages/SearchPage.jsx` | Search results driven by the `q` query parameter; not linked from the main navigation |
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

There is no dashboard route in the current implementation. There are no route guards; authentication is required only by cart and favorites actions.

## Local Storage

| Data | Key | Notes |
| --- | --- | --- |
| Registered users | `olive-users` | Array of `{ id, name, email, password }` |
| Current user | `olive-current-user` | `{ id, name, email }` |
| Cart | `shopping-cart-<userId>` | Per signed-in user |
| Guest cart fallback | `shopping-cart-guest` | Not populated through the UI because adding requires login |
| Favorites | `urban-nest-favorites-<userId>` | Per signed-in user; the legacy `urban-nest` prefix is retained |
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
- Theme styles are selected by `[data-theme]` on the body and the matching `light` or `dark` class on the app root.
- Responsive breakpoints adapt the header, sidebars, product grid, forms, and cart drawer for tablet and mobile layouts.
- The styles include `prefers-reduced-motion` handling for motion-sensitive users.

## Testing

Tests use Vitest, React Testing Library, `@testing-library/jest-dom`, `@testing-library/user-event`, and jsdom.

### Test configuration

`vitest.config.js` defines:

- `@vitejs/plugin-react` for JSX support.
- `environment: "jsdom"`.
- `globals: true`.
- `setupFiles: "./src/test/setup.js"`.
- `include: ["src/**/*.{test,spec}.{js,jsx}"]`.
- `css: true`.
- `restoreMocks: true`.

`src/test/setup.js` imports `@testing-library/jest-dom/vitest`, runs React Testing Library cleanup after each test, and clears `localStorage` after each test.

`src/test/renderWithProviders.jsx` wraps test UI with `LanguageProvider`, `AuthProvider`, `CartProvider`, and `FavoritesProvider`. `src/test/fixtures.js` provides a test product, a test user, and a helper that seeds an authenticated user in `localStorage`.

### Current tests

| Test file | Tests | Coverage |
| --- | ---: | --- |
| `src/components/ProductCard.test.jsx` | 2 | Renders product details and actions; passes the selected product to `onSelectProduct` |
| `src/components/AddToCart.test.jsx` | 1 | Integration test for adding a product to the cart through `ProductCard`, then increasing quantity and checking totals |
| `src/components/ErrorBoundary.test.jsx` | 1 | Verifies the fallback UI and recovery through the `Try again` button |

The suite currently contains 3 test files and 4 tests. It is component and integration focused; it does not cover every route, context, or API edge case.

### Commands

```bash
npm test
```

Runs the suite once.

```bash
npm run test:watch
```

Runs Vitest in watch mode during development.

## Build and GitHub Pages Deployment

The workflow is defined in `.github/workflows/deploy.yml`.

### Trigger and permissions

- Runs on every push to the `master` branch.
- Uses a `pages` concurrency group with `cancel-in-progress: false`.
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
- `public/404.html` is copied into the build and provides a custom static 404 page for unknown paths.

If the repository is renamed or forked under a different name, update `base` in `vite.config.js` to match the new repository path.

## Legacy and Unused Files

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
| `src/hooks/useFetch.js` | Used only by the unused `FetchDemo` and commented-out code in `App.jsx`. |
| `src/hooks/useProducts.js` | Not used by the active app; search is handled by `SearchContext`. |
| `src/hooks/useCounter.js` | Used only by the unused `CounterDemo`. |
| `src/hooks/useToggle.js` | Used only by the unused `ToggleDemo`. |
| `src/assets/react.svg` | Unused asset. |
| `src/assets/vite.svg` | Unused asset. |
| `public/icons.svg` | Unused asset. |

`src/assets/hero.png` is active and serves as the fallback image for the Home hero, product cards, and product details.

`src/App.jsx` contains a large block of commented-out legacy Shop and learning-demo code above the active `Shop` component.

## Known Implementation Notes

- The active Shop component lives inside `src/App.jsx`, which makes that file large. Moving it to a routed page would be a reasonable future refactor, but it is not part of the current implementation.
- `index.html` uses the page title `Online-shop`, while the application brand is `Olivé`.
- The npm package name is `olive`; the application brand is `Olivé`.
- The Search page is implemented at `/search` but is not linked from the header, footer, or Shop UI.
- `ErrorBoundary` uses a `className` of `error-boundary`, but no dedicated CSS rule for that class is currently defined, so the fallback relies on base styling.

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
- The app uses hash routing such as `/#/shop`. Direct non-hash paths are not handled by the React router; `public/404.html` provides a static fallback on GitHub Pages.
- The test suite covers selected components and interactions, not the entire application.
- The project does not include a license file.

## Author

Created and maintained by [tanjabalalovska1-arch](https://github.com/tanjabalalovska1-arch).

## License

No license file is included in this repository.
