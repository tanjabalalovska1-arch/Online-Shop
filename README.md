# Olivé

Olivé is a beginner-friendly e-commerce front-end built with React and Vite. It lets visitors browse products, search and filter by category, open a product detail page, save favorites, and manage a shopping cart after creating an account.

The app uses [dummyjson.com](https://dummyjson.com) as a demo product API. Authentication and cart/favorites data are stored in the browser with `localStorage`, so there is no backend or real payment processing.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
4. [Available Scripts](#available-scripts)
5. [Project Structure](#project-structure)
6. [How the Application Works](#how-the-application-works)
7. [Routes / Pages](#routes--pages)
8. [Components](#components)
9. [Contexts (Global State)](#contexts-global-state)
10. [Custom Hooks](#custom-hooks)
11. [API Layer](#api-layer)
12. [Styling](#styling)
13. [Environment Variables](#environment-variables)
14. [Build and Deployment](#build-and-deployment)
15. [Unused or Unnecessary Files](#unused-or-unnecessary-files)
16. [Known Limitations](#known-limitations)

---

## Features

- Browse products loaded from the dummyjson API.
- Filter products by category.
- Search products with a debounced search input.
- Paginate products in the shop (16 products per page).
- View a single product's details, image, brand, category, and price.
- Register and log in locally (stored in the browser).
- Add products to a shopping cart, change quantities, remove items, or clear the cart.
- Save products to a favorites list.
- Toggle between light and dark themes.
- Responsive, custom-styled UI with a shopping cart drawer.
- 404 page and nested dashboard routes for learning purposes.
- Automatic deployment to GitHub Pages through GitHub Actions.

---

## Technologies Used

| Technology | Version | Purpose |
|---|---:|---|
| [React](https://react.dev/) | 19.3.0 | Builds the user interface with components and hooks |
| React DOM | 19.3.0 | Renders React components in the browser |
| [Vite](https://vite.dev/) | 8.3.5 | Development server and production build tool |
| [React Router DOM](https://reactrouter.com/) | 7.18.4 | Client-side routing (`HashRouter`, `Routes`, `Route`, `NavLink`, `Outlet`) |
| React Context API | — | Shares auth, cart, favorites, search, and theme state globally |
| `useReducer` | — | Manages cart and search state with actions |
| `localStorage` | Browser API | Persists users, cart, favorites, and form data in the browser |
| [DummyJSON](https://dummyjson.com/) | — | Provides demo product data |
| CSS + CSS Modules | — | Global styles and component-scoped styles |
| [Oxlint](https://oxc.rs/docs/guide/usage/linter) | 1.86.0 | Linting (`npm run lint`) |
| GitHub Actions | — | Builds and deploys the app to GitHub Pages |

**Requirements:** Node.js 20 or newer (the deployment workflow uses Node 20) and npm.

---

## Getting Started

### 1. Clone the project

```bash
git clone <your-repository-url>
cd "Project React/online-shop"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the environment

Create a `.env` file in the project root. You can copy `.env.example`:

```bash
# macOS / Linux
cp .env.example .env

# Windows PowerShell
Copy-Item .env.example .env
```

Then set the API URL inside `.env`:

```env
VITE_API_URL=https://dummyjson.com
```

### 4. Start the development server

```bash
npm run dev
```

Because `vite.config.js` sets `base: "/Online-Shop/"`, the dev server usually opens at:

```text
http://localhost:5173/Online-Shop/
```

If the page is blank, double-check the URL and make sure it includes `/Online-Shop/`.

### 5. Build for production

```bash
npm run build
```

The production files are generated in the `dist/` folder.

### 6. Preview the production build

```bash
npm run preview
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server with hot reload |
| `npm run build` | Creates an optimized production build in `dist/` |
| `npm run preview` | Serves the production build locally for testing |
| `npm run lint` | Runs Oxlint to check the code for problems |

---

## Project Structure

```text
online-shop/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment workflow
├── public/
│   ├── favicon.svg             # Browser tab icon (used by index.html)
│   └── icons.svg               # Icon asset (currently unreferenced)
├── src/
│   ├── api/
│   │   ├── client.js           # Central fetch wrapper with retries and error handling
│   │   └── products.js         # Product API functions
│   ├── assets/
│   │   ├── hero.png            # Image asset (currently unreferenced)
│   │   ├── react.svg           # Vite/React logo asset (currently unreferenced)
│   │   └── vite.svg            # Vite logo asset (currently unreferenced)
│   ├── components/
│   │   ├── AccessibleDropdown.jsx
│   │   ├── Breadcrumbs.css
│   │   ├── Breadcrumbs.jsx
│   │   ├── Cart.jsx
│   │   ├── CounterDemo.jsx
│   │   ├── FetchDemo.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductCard.module.css
│   │   ├── SignupForm.jsx
│   │   └── ToggleDemo.jsx
│   ├── context/
│   │   ├── AuthContext.jsx     # Register, login, logout
│   │   ├── CartContext.jsx     # Shopping cart state
│   │   ├── FavoritesContext.jsx
│   │   ├── SearchContext.jsx   # Product search state
│   │   └── ThemeContext.jsx    # Light/dark theme
│   ├── hooks/
│   │   ├── useApi.js
│   │   ├── useCounter.js
│   │   ├── useFetch.js
│   │   ├── useLocalStorage.js
│   │   ├── useProducts.js
│   │   └── useToggle.js
│   ├── layouts/
│   │   └── MainLayout.jsx      # Shared navigation + <Outlet />
│   ├── pages/
│   │   ├── About.css
│   │   ├── About.jsx
│   │   ├── DashboardLayout.jsx
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
│   │   └── Shop.jsx            # Legacy/unused shop page (see below)
│   ├── ProductDetails/
│   │   ├── ProductDetails.jsx
│   │   └── ProductDetails.module.css
│   ├── App.css                 # Main global styles and theme colours
│   ├── App.jsx                 # App shell, header, cart drawer, routes, and active Shop page
│   ├── data.js                 # Static sample products (currently unused)
│   ├── DocumentTitle.jsx       # Small learning demo (currently unused)
│   ├── index.css               # Base CSS reset and root variables
│   ├── main.jsx                # React entry point and provider setup
│   ├── PostList.jsx            # Learning demo (currently unused)
│   └── UserList.jsx            # Learning demo (currently unused)
├── .env.example                # Environment variable template
├── .oxlintrc.json              # Oxlint configuration
├── index.html                  # HTML entry file
├── package.json                # Dependencies and npm scripts
├── package-lock.json           # Locked dependency versions
├── vite.config.js              # Vite configuration
└── README.md
```

> `node_modules/`, `dist/`, and `.git/` are generated or tooling folders and are not part of the application source.

---

## How the Application Works

### Application startup

1. `index.html` contains the empty `<div id="root">` and loads `src/main.jsx`.
2. `src/main.jsx` creates the React root and wraps the app in several providers:

   ```text
   StrictMode
     └── AuthProvider
           └── HashRouter
                 └── CartProvider
                       └── ThemeProvider
                             └── SearchProvider
                                   └── FavoritesProvider
                                         └── App
   ```

   `CartProvider` and `FavoritesProvider` need `AuthProvider` because adding items requires a logged-in user.

3. `src/App.jsx` renders the persistent header, the routed page content, the footer, and the sliding cart drawer.

### Routing

Routes are defined in `src/App.jsx` using React Router. Pages are lazy-loaded with `React.lazy()` and wrapped in `<Suspense>`, so the code for a page is downloaded only when it is needed.

All main route paths are nested under `MainLayout`, which renders the top navigation (Home, Shop, About Us) and an `<Outlet />` where the active page appears.

### Product data flow

- `src/api/client.js` is the central request function. It:
  - Prepends `VITE_API_URL` to every endpoint.
  - Throws a custom `ApiError` for failed responses.
  - Retries network errors and 5xx server errors up to 3 times.
  - Respects `AbortSignal` so cancelled requests do not update the UI.
- `src/api/products.js` contains:
  - `searchProducts(query, signal)`
  - `getProductById(id)`
  - `getProducts(limit, signal)`

The Home page is a static landing page with a hero section and account links for visitors who are not logged in. The Shop page either uses `useFetch()` for category/all products or the results from `SearchContext`, depending on whether the user is searching.

### Search flow

1. The user types in the Shop search input.
2. A 500 ms debounce waits until typing pauses.
3. `SearchContext.search()` starts a request through `searchProducts()`.
4. Any previous request is cancelled with `AbortController`.
5. Results are stored in `SearchContext` and rendered as `ProductCard` components.

The separate `/search` page reads the `q` query parameter, runs the same search logic, and displays the results.

### Shop filtering and pagination

The active Shop page is defined inside `src/App.jsx`. It:

- Loads categories directly from `https://dummyjson.com/products/categories`.
- Keeps `search`, `category`, and `page` in the URL query string.
- Shows 16 products per page.
- Filters search results by category when both a search term and category are selected.
- Saves the current scroll position when navigating to a product, so the user can return to the same place.

### Product details flow

1. Clicking "View Details" navigates to `/products/:id`.
2. `ProductPage` reads the `id` from the URL.
3. `getProductById(id)` fetches the product.
4. The page shows breadcrumbs and `ProductDetails`.
5. The back button returns to the previous page using `location.state.from` and restores the saved scroll position.

### Authentication flow

`AuthContext` stores users locally:

- Registered users: `localStorage["olive-users"]`
- Logged-in user: `localStorage["olive-current-user"]`

`register()` rejects duplicate emails. `login()` checks the stored email and password. `logout()` removes the current user. Passwords are stored as plain text, so this is a learning/demo implementation, not production security.

### Cart flow

`CartContext` uses `useReducer` with these actions:

| Action | Effect |
|---|---|
| `ADD_ITEM` | Adds a product or increases its quantity |
| `REMOVE_ITEM` | Decreases quantity, removing the item when it reaches zero |
| `DELETE_ITEM` | Removes the item completely |
| `CLEAR_CART` | Empties the cart |

The cart is saved to `localStorage["shopping-cart"]`. If no user is logged in, `addToCart()` returns `false`, and `ProductCard` shows a login reminder.

### Favorites flow

`FavoritesContext` stores favorite products in `localStorage["urban-nest-favorites"]`. Like the cart, favorites require a logged-in user. The header displays a favorites count, and `/favorites` renders the saved products.

### Theme flow

`ThemeContext` switches between `"light"` and `"dark"` and sets `document.body[data-theme]`. CSS in `App.css` changes the colour variables based on that attribute. The theme is not remembered after a page reload.

---

## Routes / Pages

| Route | Page/Component | Description |
|---|---|---|
| `/` | `src/pages/Home.jsx` | Hero landing page with login/register links when logged out |
| `/shop` | `Shop` inside `src/App.jsx` | Product catalog with category filter, search, and pagination |
| `/products/:id` | `src/pages/ProductPage.jsx` | Single product details with breadcrumbs |
| `/search` | `src/pages/SearchPage.jsx` | Search results from the `q` URL parameter |
| `/favorites` | `src/pages/Favorites.jsx` | Saved favorite products |
| `/login` | `src/pages/Login.jsx` | Login form |
| `/register` | `src/pages/Register.jsx` | Account registration form |
| `/about` | `src/pages/About.jsx` | Static "About" page |
| `/dashboard` | `src/pages/DashboardLayout.jsx` | Nested-layout demo with dashboard home |
| `/dashboard/settings` | Nested route in `App.jsx` | Nested-layout demo settings page |
| `*` | `src/pages/NotFound.jsx` | 404 page for unknown routes |

### Page summaries

- **Home** — Displays the hero landing page. Logged-in users see the main hero without the account sidebar; visitors can access Login and Register.
- **Shop** — The main shopping experience. The implementation lives in `App.jsx`, not in `src/pages/Shop.jsx`.
- **ProductPage** — Loads one product by ID and handles loading and "not found" states.
- **SearchPage** — Reads the search query from the URL and shares results through `SearchContext`.
- **Favorites** — Shows saved products or an empty-state message and a button back to the shop.
- **Login / Register** — Forms that call the auth context and redirect home on success.
- **About** — Static brand story.
- **DashboardLayout** — Example of a nested layout with its own sidebar and footer.
- **NotFound** — Fallback page for unmatched routes.

---

## Components

| Component | Location | Purpose |
|---|---|---|
| `ProductCard` | `src/components/ProductCard.jsx` | Displays a product image, category, title, price, favorite button, details button, and add-to-cart button. Wrapped in `memo`. |
| `Cart` | `src/components/Cart.jsx` | Lists cart items, quantity controls, line totals, grand total, and clear-cart button |
| `Footer` | `src/components/Footer.jsx` | Brand information, quick links, social links, and copyright |
| `Breadcrumbs` | `src/components/Breadcrumbs.jsx` | Home > Products > Product name navigation |
| `ProductDetails` | `src/ProductDetails/ProductDetails.jsx` | Full product view used by `ProductPage` |
| `AccessibleDropdown` | `src/components/AccessibleDropdown.jsx` | Keyboard-accessible dropdown demo (not currently used) |
| `SignupForm` | `src/components/SignupForm.jsx` | Local-storage form demo (not currently used) |
| `CounterDemo` | `src/components/CounterDemo.jsx` | Demonstrates `useCounter` (not currently used) |
| `FetchDemo` | `src/components/FetchDemo.jsx` | Demonstrates `useFetch` (not currently used) |
| `ToggleDemo` | `src/components/ToggleDemo.jsx` | Demonstrates `useToggle` (not currently used) |

`ProductDetails` is stored in its own `src/ProductDetails/` folder rather than inside `components/`.

---

## Contexts (Global State)

| Context | File | What it provides |
|---|---|---|
| `AuthContext` | `src/context/AuthContext.jsx` | `user`, `users`, `register`, `login`, `logout` |
| `CartContext` | `src/context/CartContext.jsx` | `items`, `addToCart`, `removeFromCart`, `deleteCartItem`, `clearCart` |
| `FavoritesContext` | `src/context/FavoritesContext.jsx` | `favorites`, `toggleFavorite`, `isFavorite` |
| `SearchContext` | `src/context/SearchContext.jsx` | `products`, `query`, `loading`, `error`, `search`, `clearSearch` |
| `ThemeContext` | `src/context/ThemeContext.jsx` | `theme`, `toggleTheme` |

Each context exports a provider component and a custom hook (`useAuth`, `useCart`, `useFavorites`, `useSearch`, `useTheme`). The hooks throw a helpful error if they are used outside their provider.

---

## Custom Hooks

| Hook | File | Purpose |
|---|---|---|
| `useApi(apiFn)` | `src/hooks/useApi.js` | Runs an API function and returns `{ data, loading, error }`; cancels on unmount |
| `useFetch(url)` | `src/hooks/useFetch.js` | Fetches a URL and returns `{ data, loading, error }`; skips the request when `url` is falsy |
| `useLocalStorage(key, initialValue)` | `src/hooks/useLocalStorage.js` | State that reads from and writes to `localStorage` as JSON |
| `useProducts(query)` | `src/hooks/useProducts.js` | Searches products based on a query (not currently used) |
| `useCounter(initialValue)` | `src/hooks/useCounter.js` | Counter with increment, decrement, and reset (used only by an unused demo) |
| `useToggle(initialValue)` | `src/hooks/useToggle.js` | Boolean toggle helper (used only by an unused demo) |

---

## API Layer

### `src/api/client.js`

- Reads the API base URL from `VITE_API_URL`.
- Exports `ApiError`, which includes the HTTP status and response data.
- Exports `apiClient(endpoint, options)`.
- Adds `Content-Type: application/json` and merges custom headers.
- Retries failed network requests and 5xx responses up to three times with a one-second delay.
- Does not retry 4xx errors or aborted requests.

### `src/api/products.js`

```js
searchProducts(query, signal)  // GET /products/search?q=...
getProductById(id)             // GET /products/:id
getProducts(limit, signal)     // GET /products?limit=...
```

---

## Styling

| File | Purpose |
|---|---|
| `src/index.css` | Base reset, fonts, and root CSS variables |
| `src/App.css` | Main design system: brand colours, header, navigation, product grid, cart drawer, dark theme, footer |
| `src/pages/*.css` | Page-specific styles (Home, Login, Register, About, Search) |
| `*.module.css` | Scoped styles for `ProductCard`, `Favorites`, `ProductDetails`, and `Breadcrumbs` |

The design uses a cream, beige, and rose palette with Playfair Display loaded from Google Fonts in `index.html`. Dark mode works by overriding CSS variables under `body[data-theme="dark"]`.

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL for the product API | `https://dummyjson.com` |

Only variables starting with `VITE_` are exposed to the browser by Vite. Do not put secrets in a `.env` file used by a Vite front-end.

The GitHub Actions deployment sets `VITE_API_URL` during the build, so GitHub Pages does not depend on a committed `.env` file.

---

## Build and Deployment

The workflow in `.github/workflows/deploy.yml` deploys the app to GitHub Pages when code is pushed to the `master` branch.

It performs these steps:

1. Checks out the repository.
2. Installs Node.js 20.
3. Runs `npm ci`.
4. Runs `npm run build` with `VITE_API_URL=https://dummyjson.com`.
5. Uploads `dist/` and deploys it to GitHub Pages.

Two settings make GitHub Pages work:

- `vite.config.js` sets `base: "/Online-Shop/"`. If your repository has a different name, update this value to match.
- `main.jsx` uses `HashRouter`, so URLs look like `/#/shop` and `/#/products/1`. Hash routing avoids server-side route configuration on GitHub Pages.

---

## Unused or Unnecessary Files

These files are **not used by the running application**. They have been left untouched and should not be deleted without reviewing them first. They are useful learning material or remnants of earlier versions of the project.

| File | Why it appears unused |
|---|---|
| `src/pages/Shop.jsx` | This older shop page is not imported or routed. The real Shop component is defined inside `src/App.jsx`. It also imports `../components/ProductCard/ProductCard`, a path that does not exist, so using it would cause an error. |
| `src/data.js` | Contains a small static `products` array, but nothing imports it. The app gets products from the dummyjson API instead. |
| `src/DocumentTitle.jsx` | A small `useEffect` demo that updates `document.title`. Nothing imports it. |
| `src/PostList.jsx` | A posts-fetching exercise using JSONPlaceholder. Nothing imports it. |
| `src/UserList.jsx` | A users-fetching exercise using JSONPlaceholder. Nothing imports it. |
| `src/components/AccessibleDropdown.jsx` | An accessible listbox demo with keyboard handling. Nothing imports it. |
| `src/components/SignupForm.jsx` | A form demo using `useLocalStorage`. The real authentication UI is in `src/pages/Login.jsx` and `src/pages/Register.jsx`, so this form is unused. |
| `src/components/CounterDemo.jsx` | Only exists to demonstrate `useCounter`; no page imports it. |
| `src/components/FetchDemo.jsx` | Only exists to demonstrate `useFetch`; no page imports it. |
| `src/components/ToggleDemo.jsx` | Only exists to demonstrate `useToggle`; no page imports it. |
| `src/hooks/useProducts.js` | A search-products hook, but the app uses `SearchContext` instead. Nothing imports it. |
| `src/hooks/useCounter.js` | Imported only by `CounterDemo.jsx`, which is itself unused. |
| `src/hooks/useToggle.js` | Imported only by `ToggleDemo.jsx`, which is itself unused. |
| `src/assets/hero.png` | No source file imports this image. The Home page uses a remote Unsplash image instead. |
| `src/assets/react.svg` | No source file references it. |
| `src/assets/vite.svg` | No source file references it. |
| `public/icons.svg` | No file references it. `public/favicon.svg` is referenced by `index.html`, but `icons.svg` is not. |
| `dist/` | Generated by `npm run build`. It is not source code and will be recreated on the next build. |
| Commented-out code in `src/App.jsx` (roughly lines 37-386, plus commented imports around lines 27-29) | Earlier versions of the Shop page and learning demos. Comments do not run, and the active Shop implementation appears later in the same file. |

### Additional notes

- The active Shop component is inside `src/App.jsx`, which makes that file quite large. Moving it to `src/pages/Shop.jsx` would be a good future cleanup, but that is a code change and was not made here.
- `Home.jsx` calculates a category list but does not currently render it; this is unused logic rather than an unused file.
- The npm package name is `olive`, while the application is branded as Olivé.
- The Favorites context continues to use the existing `urban-nest-favorites` localStorage key to preserve previously saved favorites.

---

## Known Limitations

- Authentication is local-only and stores passwords in plain text. It is suitable for learning, not production.
- Cart and favorites are tied to the browser, not to an account on a server.
- Product data comes from a public demo API and may change or be unavailable.
- The theme choice resets to light after a page reload.
- Search results and product lists are not cached across page reloads.
- There is no checkout, payment, order history, or real user profile.

---

## License

No license file is included in this project. Add one if you plan to publish or share the code publicly.
