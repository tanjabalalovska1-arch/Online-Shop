# Stage 2.1 — Header, Footer, Search and Bilingual Support

**Project:** Olivé Online Shop  
**Document type:** Implementation plan only  
**Status:** Not implemented

---

## 1. Objective

Stage 2.1 will:

- Simplify the header while keeping all utility actions directly accessible.
- Keep the Olivé logo on the left.
- Keep Home, Shop, and About centered.
- Keep Favorites, Cart, Account, Theme, and Language on the right.
- Do not add a hamburger menu.
- Remove Search from the navbar.
- Keep the search field above the product listing.
- Add one X button beside the Shop search field to clear the search text and active search filter.
- Remove Dashboard completely from the visible application, including its route, links, related UI, and unused files.
- Reorganize the footer and remove the Dashboard link.
- Add English and Macedonian translations.
- Make English the default language.
- Persist the selected language in `localStorage` using only the new `olive-language` key.
- Keep existing routes that are still needed, Context APIs, cart, favorites, authentication, theme, search, and product functionality intact.
- Preserve the existing Soft Modern design and Olivé branding.
- Avoid redesigning the homepage and avoid proceeding to Stage 3.

No application code is changed by this document.

---

## 2. Current Project State

### 2.1 Architecture

- React 19 + Vite.
- `HashRouter` with routes defined in `src/App.jsx`.
- Context providers in `src/main.jsx`:
  - `AuthProvider`
  - `CartProvider`
  - `ThemeProvider`
  - `SearchProvider`
  - `FavoritesProvider`
- The active Shop component is defined inline in `src/App.jsx`.
- `src/pages/Shop.jsx` is unused and contains a broken import.
- Product data comes from DummyJSON and must remain untranslated.

### 2.2 Header today

`src/components/Header.jsx` currently renders:

- Olivé brand on the left.
- Home, Shop, About navigation centered.
- Search form.
- Favorites link with count.
- Cart button with count.
- Account/login/profile area.
- Theme toggle.
- Hamburger menu button, visible only on mobile.

The mobile menu currently contains:

- Search.
- Home, Shop, About, Favorites.
- Login/Register or Dashboard/Logout.

### 2.3 Search today

- The header search form writes the `q` URL parameter and navigates to `/search`.
- The Shop component uses its own `search` URL parameter and `SearchContext`.
- The Shop search field is already positioned above the product listing.
- The Shop currently has a text button labeled “Clear Filter” next to the search field.
- `q` and `search` are separate parameters and must remain separate.

### 2.4 Dashboard today

Dashboard is currently visible through:

- `src/pages/DashboardLayout.jsx`
- The `/dashboard` and `/dashboard/settings` routes in `src/App.jsx`
- A Dashboard link in the header account area
- A Dashboard link in the footer
- A Dashboard-specific condition in `src/layouts/MainLayout.jsx`
- Dashboard-specific CSS in `src/App.css`

### 2.5 Footer today

`src/components/Footer.jsx` currently renders four sections:

- Brand.
- Explore.
- Shop.
- Account, including a visible Dashboard link.

### 2.6 Existing localStorage keys

These keys must not be renamed, removed, or restructured:

- `shopping-cart`
- `urban-nest-favorites`
- `olive-users`
- `olive-current-user`

Theme is currently not persisted. That behavior must remain unchanged.

### 2.7 Translation state

There is currently no translation system. UI strings are hardcoded in components and pages.

---

## 3. Final Agreed Design

### 3.1 Header

Desktop header:

- Left: Olivé logo/brand.
- Center: Home, Shop, About.
- Right, in this order:
  - Favorites.
  - Cart.
  - Account.
  - Theme toggle.
  - Language selector.

No hamburger menu.

No Search form in the header.

### 3.2 Search and clear

- The search field lives above the product listing in the Shop.
- One X button sits next to the search field.
- The X button clears:
  - The search text.
  - The active search filter.
  - The `search` URL parameter.
  - The current page back to page 1.
- The X button does not clear the selected category.
- Existing search behavior, debounce, SearchContext, and routing are preserved.
- The `q` and `search` URL parameters remain distinct and are not renamed.

### 3.3 Dashboard

Dashboard is removed completely from the visible application:

- Route removed.
- Header links removed.
- Footer links removed.
- Dashboard-specific UI removed.
- Dashboard-specific files removed only after confirming they are not used elsewhere.
- Dashboard-specific CSS removed.
- Unused imports and references cleaned up.
- Authentication, login, registration, and logout are not affected.

### 3.4 Footer

Keep the redesigned footer with:

- Brand.
- Explore.
- Customer Account.

Remove the Dashboard section/link. Retain the other useful footer content.

### 3.5 Language support

- English is the default language.
- Macedonian is available.
- The language selector is in the header.
- The selected language is persisted using only `olive-language`.
- Switching languages updates the interface immediately without a page refresh.
- All existing localStorage keys and their data are preserved.
- Product data from DummyJSON is not translated.

---

## 4. New Files to Create

### 4.1 `src/i18n/translations.js`

Central translation dictionary for English and Macedonian.

Recommended structure:

```js
export const DEFAULT_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = ["en", "mk"];

export const translations = {
  en: {
    common: {
      actions: {
        addToCart: "Add to Cart",
        viewDetails: "View Details",
        clearCart: "Clear Cart",
        clearSearch: "Clear search",
        login: "Login",
        register: "Register",
        logout: "Logout",
      },
      units: {
        item_one: "item",
        item_other: "items",
      },
      states: {
        loadingPage: "Loading page...",
        loadingProducts: "Loading products...",
        loadingProduct: "Loading product...",
      },
      errors: {
        generic: "Something went wrong.",
        loadProducts: "Could not load products.",
        search: "Search failed. Please try again.",
      },
    },
    header: {
      nav: {
        home: "Home",
        shop: "Shop",
        about: "About",
      },
      language: {
        label: "Language",
        en: "English",
        mk: "Macedonian",
      },
      favorites: {},
      cart: {},
      account: {},
      theme: {},
    },
    footer: {
      description:
        "Curated fashion and lifestyle pieces for everyday living. Thoughtful design, warm details, and finds made to be kept.",
      explore: "Explore",
      customerAccount: "Customer Account",
    },
    home: {},
    shop: {},
    about: {},
    favorites: {},
    login: {},
    register: {},
    product: {},
    search: {},
    cart: {},
    notFound: {},
    auth: {},
  },
  mk: {
    // Exact same key structure, with Macedonian values.
  },
};
```

Example Macedonian entries:

```js
mk: {
  header: {
    nav: {
      home: "Дома",
      shop: "Продавница",
      about: "За нас",
    },
    language: {
      label: "Јазик",
      en: "Англиски",
      mk: "Македонски",
    },
  },
  common: {
    actions: {
      clearSearch: "Исчисти пребарување",
    },
  },
}
```

Rules:

- English and Macedonian must use identical key structures.
- Reusable strings belong under `common`.
- Feature-specific strings belong under `header`, `footer`, `home`, etc.
- Components must not contain hardcoded user-facing strings.
- Product titles, descriptions, brands, categories, and other DummyJSON data remain untranslated.
- Do not create Dashboard translation keys because Dashboard is being removed.

### 4.2 `src/context/LanguageContext.jsx`

Provides:

- `language`
- `setLanguage`
- `t(key, variables)`
- Optional `plural(baseKey, count, variables)`

Responsibilities:

- Read and write the new `olive-language` localStorage key.
- Default to `"en"` when no value is stored.
- Validate stored values against `SUPPORTED_LANGUAGES`.
- Fall back to English for unsupported values.
- Update `document.documentElement.lang` to `"en"` or `"mk"`.
- Resolve dot-path keys such as `t("header.nav.home")`.
- Support interpolation such as `t("header.account.greeting", { name })`.
- Fall back to English if a Macedonian key is missing.
- Fall back to the key itself if both dictionaries are missing.
- Optionally warn in development when a key is missing.
- Use no external dependency.

Recommended plural handling:

```js
t("header.cart.aria", {
  count,
  items: t(count === 1 ? "common.units.item_one" : "common.units.item_other"),
});
```

### 4.3 `src/components/LanguageSwitcher.jsx` — recommended

Small presentational component used in the header.

Recommended UI:

- A labeled group with two options:
  - `English`
  - `Македонски`
- Active option styled with the existing accent color.
- `aria-pressed` on each option.
- Calls `setLanguage("en")` or `setLanguage("mk")`.
- On narrow screens, display compact `EN` / `MK` labels while keeping the full accessible names.

This keeps `Header.jsx` smaller and makes the selector reusable later.

---

## 5. Files to Modify

### 5.1 Bootstrap and app shell

| File | Planned change |
|---|---|
| `src/main.jsx` | Add `LanguageProvider` around the app. It must be outside `AuthProvider` so `AuthContext` can use `useLanguage`. |
| `src/App.jsx` | Update the inline Shop search controls and X clear button; remove Dashboard lazy import and routes; translate the Suspense fallback and cart close label. |
| `src/App.css` | Update header layout, remove header search and hamburger/menu styles, add Shop search clear button styles, update footer, remove Dashboard-specific CSS, and adjust responsive header spacing. |
| `src/layouts/MainLayout.jsx` | Remove the Dashboard path condition. |

Recommended provider order:

```jsx
<StrictMode>
  <LanguageProvider>
    <AuthProvider>
      <HashRouter>
        <CartProvider>
          <ThemeProvider>
            <SearchProvider>
              <FavoritesProvider>
                <App />
              </FavoritesProvider>
            </SearchProvider>
          </ThemeProvider>
        </CartProvider>
      </HashRouter>
    </AuthProvider>
  </LanguageProvider>
</StrictMode>
```

No remaining routes or Context APIs need to change.

### 5.2 Header and footer

| File | Planned change |
|---|---|
| `src/components/Header.jsx` | Keep brand, centered nav, and right-side Favorites/Cart/Account/Theme/Language. Remove search, hamburger, and all menu code. Remove Dashboard link. Translate all text. |
| `src/components/Footer.jsx` | Keep the redesigned footer with Brand, Explore, and Customer Account. Remove the Dashboard link. Translate all text. |
| `src/components/LanguageSwitcher.jsx` | New component used by the header. |

### 5.3 Dashboard removal

| File | Planned change |
|---|---|
| `src/App.jsx` | Remove `DashboardLayout` lazy import and the `/dashboard` and `/dashboard/settings` routes. |
| `src/components/Header.jsx` | Remove the Dashboard link, title, and aria-label from the account area. |
| `src/components/Footer.jsx` | Remove the Dashboard link. |
| `src/layouts/MainLayout.jsx` | Remove `pathname.startsWith("/dashboard")`. |
| `src/App.css` | Remove Dashboard-specific styles and responsive Dashboard rules. |
| `src/pages/DashboardLayout.jsx` | Delete only after confirming no remaining imports or references. |

Audit before deletion:

```powershell
# Search the source tree for remaining Dashboard references.
Get-ChildItem src -Recurse -File |
  Select-String -Pattern "Dashboard|dashboard"
```

Expected remaining references after cleanup:

- None in application source.
- Documentation may still mention Dashboard and can be updated separately.

### 5.4 Contexts

| File | Planned change |
|---|---|
| `src/context/AuthContext.jsx` | Translate auth result messages while preserving the existing `{ success, message }` API. |

Do not change:

- `src/context/CartContext.jsx`
- `src/context/FavoritesContext.jsx`
- `src/context/SearchContext.jsx`
- `src/context/ThemeContext.jsx`

`SearchContext` can keep its internal English fallback error because pages will display a translated generic error message instead of raw error text.

### 5.5 Pages

Translate all rendered page UI text in:

| File | Text areas |
|---|---|
| `src/pages/Home.jsx` | Sidebar labels, welcome text, hero title, description, CTA, image alt, caption, page footer line. |
| `src/pages/About.jsx` | Section label, headings, intro, paragraphs, signature. |
| `src/pages/Favorites.jsx` | Title, subtitle, empty state, CTA. |
| `src/pages/Login.jsx` | Labels, headings, descriptions, placeholders, submit button, register prompt. |
| `src/pages/Register.jsx` | Labels, headings, descriptions, placeholders, validation messages, submit button, login prompt. |
| `src/pages/ProductPage.jsx` | Loading and not-found messages. |
| `src/pages/SearchPage.jsx` | Heading, search-term label, loading/error/empty messages. Keep the `q` parameter behavior. |
| `src/pages/NotFound.jsx` | 404 heading, message, link label. |

Do not modify `src/pages/DashboardLayout.jsx`; delete it as part of Dashboard removal.

### 5.6 Components

Translate UI text in:

| File | Text areas |
|---|---|
| `src/components/Cart.jsx` | Cart title, empty state, total, clear-cart confirmation, remove aria-label. |
| `src/components/ProductCard.jsx` | Favorite aria-labels, login alerts, category fallback, View Details, Add to Cart, login-to-cart alert. |
| `src/ProductDetails/ProductDetails.jsx` | Back button, Price/Brand/Category labels, Not specified, add-to-cart button, alert, aria-label. |
| `src/components/Breadcrumbs.jsx` | Breadcrumb aria-label, Home, Products. |
| `src/components/Header.jsx` | All header text, including language selector labels and account controls. |
| `src/components/Footer.jsx` | All footer text. |
| `src/components/LanguageSwitcher.jsx` | New component using translations. |

### 5.7 Files intentionally not changed

These are unused or demo files documented in `README.md`:

- `src/pages/Shop.jsx`
- `src/PostList.jsx`
- `src/UserList.jsx`
- `src/DocumentTitle.jsx`
- `src/components/SignupForm.jsx`
- `src/components/AccessibleDropdown.jsx`
- `src/components/CounterDemo.jsx`
- `src/components/FetchDemo.jsx`
- `src/components/ToggleDemo.jsx`
- `src/data.js`
- Unused hooks and assets

They are not part of the running interface. `src/pages/Shop.jsx` is also already broken because it imports a non-existent path. Leaving them untouched avoids unrelated changes. If full dead-code translation is required, it can be added as a separate cleanup step.

Also unchanged:

- API layer
- Existing localStorage keys
- Theme behavior
- Cart, favorites, auth, and search logic
- Product data rendering

---

## 6. Header Implementation Plan

### 6.1 Desktop header

Final desktop layout:

- Left: Olivé logo/brand.
- Center: Home, Shop, About.
- Right:
  - Favorites link with count badge.
  - Cart button with count badge.
  - Account area:
    - Logged out: login icon/link.
    - Logged in: user icon, greeting, and Logout button.
  - Theme toggle.
  - Language selector.

Remove from the header:

- Search form.
- Search icon and submit button.
- Hamburger button.
- Mobile menu panel.
- Dashboard link.

### 6.2 Header cleanup

Remove from `Header.jsx`:

- Search-related state (`query`).
- Search submit handler.
- Menu state (`isMenuOpen`).
- Menu button ref.
- Effects that close the menu or sync search input.
- `SearchIcon` and `MenuIcon` components if no longer used.
- Unused imports such as `useNavigate`, `useLocation`, `useRef`, `useState`, or `useEffect` if no longer needed.

Keep:

- `NavLink`.
- `useAuth`.
- `useCart`.
- `useFavorites`.
- `useTheme`.
- `useLanguage`.
- `handleLogout` for the Logout button.

### 6.3 Account area

Logged out:

- Account icon linking to `/login`.
- Translated title and aria-label.
- No Dashboard link.

Logged in:

- User icon.
- Translated greeting such as “Hi, {name}”.
- Logout button.
- No Dashboard link.

Authentication, login, registration, and logout behavior must not change.

### 6.4 Responsive header without a hamburger

Because there is no hamburger, all utility items must remain visible.

Recommended responsive behavior:

- Desktop (`min-width: 901px`):
  - Single row: brand left, nav centered, utilities right.
- Tablet/mobile (`max-width: 900px`):
  - Two-row header.
  - Row 1: brand left, utilities right.
  - Row 2: Home, Shop, About centered.
  - Utility items remain icon-only or compact.
  - Account greeting is hidden; the account icon remains.
  - Language selector uses compact `EN` / `MK` labels.
- Very small screens:
  - Reduce icon sizes slightly while keeping tap targets usable.
  - Keep nav centered and prevent horizontal overflow.

Adjust the fixed-header content offset at mobile breakpoints so page content is not hidden behind the taller two-row header.

### 6.5 Accessibility

Add or keep:

- Translated labels for Favorites, Cart, Account, Theme, and Language.
- `aria-pressed` on language buttons.
- Clear labels for the theme toggle.
- `aria-label` on the primary navigation.
- Existing focus-visible styles.
- Decorative SVG icons remain `aria-hidden="true"`.

---

## 7. Search and Clear Plan

### 7.1 Search field placement

- The search field remains above the product listing in the Shop.
- It is the single visible search field in the main application.
- The header search form is removed.

### 7.2 X clear button

Replace the existing “Clear Filter” text button with one X button next to the search input.

The X button:

- Is a `type="button"` button.
- Has a translated `aria-label`, such as “Clear search”.
- Is disabled or visually muted when the search field is empty.
- Clears `searchTerm`.
- Calls `search("")` to clear SearchContext results.
- Removes the `search` URL parameter.
- Resets the `page` URL parameter to `1`.
- Keeps the selected category unchanged.
- Optionally returns focus to the search input after clearing.

### 7.3 Preserved search behavior

Keep:

- The existing 500 ms debounce.
- `SearchContext` and `searchProducts`.
- The `search` URL parameter for Shop search.
- The `q` URL parameter for `/search`.
- The `/search` route and SearchPage.
- Existing navigation to product detail pages and back behavior.

Do not:

- Rename `q` to `search` or vice versa.
- Merge the two search mechanisms.
- Remove SearchContext.
- Remove SearchPage.

### 7.4 SearchPage

SearchPage continues to read `q` from the URL and display results.

Because the header search form is removed, `/search?q=...` remains available through:

- Direct URL access.
- Existing footer Search link.
- Any future UI that uses the `q` parameter.

No rename or route removal is planned for SearchPage.

---

## 8. Dashboard Removal Plan

### 8.1 Visible UI removal

Remove Dashboard from:

- Header account area.
- Footer navigation.
- Any other visible links or labels.

Logged-in users will see their greeting and Logout, but no Dashboard link.

### 8.2 Route removal

In `src/App.jsx`:

- Remove the `DashboardLayout` lazy import.
- Remove the `/dashboard` route.
- Remove the nested `/dashboard/settings` route.
- Remove the Dashboard route headings.

After removal, direct navigation to `/dashboard` should fall through to the existing NotFound route.

### 8.3 File removal

- Confirm `src/pages/DashboardLayout.jsx` is not imported anywhere else.
- Delete `src/pages/DashboardLayout.jsx`.
- Remove any now-unused imports.

### 8.4 Layout cleanup

In `src/layouts/MainLayout.jsx`:

- Remove `pathname.startsWith("/dashboard")`.
- Keep the existing conditional main-wrapper behavior for Home, Login, and Register.

### 8.5 CSS cleanup

In `src/App.css`:

- Remove the Dashboard section.
- Remove Dashboard-specific responsive rules.
- Verify no remaining Dashboard selectors are used.

### 8.6 Authentication safety

Do not change:

- `AuthContext`.
- Login page.
- Register page.
- Logout behavior.
- User storage keys.

Removing Dashboard must not affect authentication flows.

---

## 9. Footer Implementation Plan

Reorganize the footer into three sections.

### 9.1 Brand

- Olivé logo.
- Short translated brand description.
- No contact information.

### 9.2 Explore

Recommended links:

- Home
- Shop
- About
- Search

Search can remain because it is useful and preserves the existing footer search link.

### 9.3 Customer Account

Recommended links:

- Favorites
- Login
- Register

Do not show Dashboard.

### 9.4 Footer bottom

Translate:

- Copyright line with dynamic year.
- Brand note.

Example English:

```txt
© 2026 Olivé. All rights reserved.
Crafted for everyday living.
```

Example Macedonian:

```txt
© 2026 Olivé. Сите права задржани.
Создадено за секојдневниот живот.
```

### 9.5 Footer CSS

Change `.footer-inner` from:

```css
grid-template-columns: minmax(0, 1.8fr) repeat(3, minmax(0, 1fr));
```

to:

```css
grid-template-columns: minmax(0, 1.8fr) repeat(2, minmax(0, 1fr));
```

Keep the existing responsive behavior:

- Tablet: two columns, brand full-width.
- Mobile: single column.
- Footer bottom stacks on small screens.

---

## 10. Language Selection and Persistence

### 10.1 New localStorage key

Use one new key:

```txt
olive-language
```

Values:

```txt
"en" | "mk"
```

Default:

```txt
"en"
```

Existing keys are not renamed, removed, or restructured.

### 10.2 Initialization

`LanguageProvider` should initialize synchronously from localStorage:

1. Read `olive-language`.
2. If missing, use `"en"`.
3. If present but invalid, use `"en"` and correct the stored value.
4. Set `document.documentElement.lang` to the active language.

This prevents a visible language flash on refresh.

### 10.3 Switching

The header language selector allows switching between English and Macedonian.

Selecting a language:

1. Calls `setLanguage("en" | "mk")`.
2. Updates React state.
3. Persists the value to `olive-language`.
4. Re-renders all translation consumers immediately.
5. Leaves the current route, cart, favorites, auth state, and theme untouched.

No page refresh is required.

### 10.4 Translation resolution

`t("some.nested.key")`:

1. Look in the active language dictionary.
2. If missing, look in the English dictionary.
3. If still missing, return the key string.
4. Replace `{{variable}}` placeholders with provided values.

This avoids crashes and makes missing keys visible during development.

---

## 11. Translation Organization

### 11.1 Centralized structure

All translations live in `src/i18n/translations.js`.

Recommended namespaces:

- `common`
  - `actions`
  - `units`
  - `states`
  - `errors`
- `header`
  - `nav`
  - `language`
  - `favorites`
  - `cart`
  - `account`
  - `theme`
- `footer`
- `home`
- `shop`
- `about`
- `favorites`
- `login`
- `register`
- `product`
- `search`
- `cart`
- `notFound`
- `auth`

Do not add a `dashboard` namespace because Dashboard is being removed.

### 11.2 Reuse rules

- Use shared keys for repeated actions such as Add to Cart, View Details, Login, Register, Logout, and Clear Search.
- Do not duplicate the same string in multiple component-specific keys.
- Keep labels, placeholders, aria-labels, alerts, confirmations, and messages in the dictionary.
- Use interpolation for dynamic values such as names, counts, query terms, and pagination.

### 11.3 Translation coverage

| Area | Strings to translate |
|---|---|
| Header | Brand aria-label, nav labels, favorites/cart aria labels, account labels, greeting, logout, login, register, theme labels, language labels. |
| Footer | Brand description, section headings, link labels, aria labels, copyright, note. |
| Home | Sidebar label, welcome heading, status text, login/register, hero title, description, CTA, image alt, caption, page footer line. |
| Shop | Explore label, Categories, category nav aria-label, All Products, search placeholder, clear-search label, searching/loading/error/empty messages, Previous, Page X of Y, Next. |
| About | Label, heading, intro, body paragraphs, signature. |
| Favorites | Title, subtitle, empty state, CTA. |
| Login | Labels, heading, description, placeholders, submit, register prompt. |
| Register | Labels, heading, description, placeholders, validation errors, submit, login prompt. |
| Product page | Loading, not found. |
| Product details | Back button, Price, Brand, Category, Not specified, Add to Cart, alerts, aria-label. |
| Product card | Favorite aria labels, login alerts, Other fallback, View Details, Add to Cart. |
| Cart | Title, empty state, total, clear cart, confirm message, remove aria-label. |
| Search page | Heading, search term label, loading/error/empty messages. |
| Breadcrumbs | Aria-label, Home, Products. |
| NotFound | 404 heading, message, link. |
| AuthContext | Email-exists, invalid credentials, registration success, login success. |
| App shell | Loading page, cart close aria-label. |

### 11.4 Not translated

- DummyJSON product titles.
- Product descriptions.
- Product brands.
- Product categories returned by the API.
- Category names in the Shop sidebar.
- Product image alt text derived from product titles.
- User-entered search terms.
- User names and emails.
- Prices and currency formatting.

---

## 12. Implementation Stages

Keep the work divided into small, reviewable stages.

### Stage 1 — Language foundation

- Create `src/i18n/translations.js`.
- Create `src/context/LanguageContext.jsx`.
- Add `LanguageProvider` to `src/main.jsx`.
- Create the initial English and Macedonian dictionaries.
- Verify that switching the stored language changes `document.documentElement.lang`.

### Stage 2 — Header and Footer

- Update `Header.jsx`:
  - Remove search and hamburger code.
  - Keep brand, centered nav, and right-side utilities.
  - Add the language selector.
  - Remove the Dashboard link.
  - Translate header text.
- Update `Footer.jsx`:
  - Keep Brand, Explore, Customer Account.
  - Remove the Dashboard link.
  - Translate footer text.
- Update header and footer CSS.
- Verify responsive header behavior without a hamburger.

### Stage 3 — Search and Dashboard removal

- Update the Shop search controls in `src/App.jsx`:
  - Keep the search field above the product listing.
  - Replace “Clear Filter” with one X clear button.
  - Clear search text, search filter, `search` URL parameter, and pagination.
  - Preserve category selection.
- Remove Dashboard from `src/App.jsx`.
- Remove Dashboard links from Header and Footer.
- Update `src/layouts/MainLayout.jsx`.
- Remove Dashboard CSS.
- Confirm `DashboardLayout.jsx` is unused and delete it.
- Clean up unused imports and references.

### Stage 4 — Translate remaining interface

- Translate Home, About, Favorites, Login, Register, ProductPage, SearchPage, and NotFound.
- Translate Cart, ProductCard, ProductDetails, and Breadcrumbs.
- Translate AuthContext messages.
- Replace raw API error display with translated generic error messages where appropriate.
- Confirm product data remains untranslated.

### Stage 5 — Verification

- Verify functionality and responsive layout.
- Run lint.
- Run build.
- Confirm no existing localStorage keys changed.
- Confirm no Dashboard references remain in application source.

---

## 13. Risks and Compatibility Issues

### 13.1 Header space without a hamburger

Keeping Favorites, Cart, Account, Theme, and Language visible on small screens requires careful responsive layout. The recommended two-row mobile header must be tested at narrow widths, and the fixed-header content offset must be adjusted so page content is not hidden.

### 13.2 Language selector space

The language selector adds width to the header. On mobile, use compact `EN` / `MK` labels while keeping full accessible names. Verify that the header does not overflow.

### 13.3 Removing header search

The header search form currently writes the `q` parameter and navigates to `/search`. Removing it means `/search?q=...` is no longer reachable from the header. Preserve the `/search` route, SearchPage, and `q` behavior, and keep the footer Search link if desired.

### 13.4 `q` versus `search`

Do not rename or merge the two parameters:

- `q` belongs to `/search`.
- `search` belongs to `/shop`.

The Shop X button must only clear the Shop search state and the `search` parameter.

### 13.5 Dashboard removal completeness

Before deleting `src/pages/DashboardLayout.jsx`, confirm it is not imported elsewhere. Also remove:

- Dashboard routes.
- Dashboard links in Header and Footer.
- Dashboard condition in `MainLayout`.
- Dashboard CSS.
- Unused imports.

Direct `/dashboard` navigation should fall through to NotFound after route removal.

### 13.6 Authentication safety

Dashboard removal must not affect login, registration, logout, user storage, or AuthContext behavior. The account area should still work for logged-out and logged-in users.

### 13.7 Provider order

`AuthContext` will use `useLanguage`, so `LanguageProvider` must wrap `AuthProvider` in `main.jsx`. If the order is wrong, `useAuth` will throw when trying to access translations.

### 13.8 localStorage compatibility

- Do not modify `shopping-cart`, `urban-nest-favorites`, `olive-users`, or `olive-current-user`.
- Add only `olive-language`.
- The existing `useLocalStorage` hook stores JSON, so the language value will be stored as `"en"` or `"mk"` including quotes. This is acceptable and consistent with the project.
- If an invalid value exists, fall back to English and correct it.

### 13.9 Theme behavior

Theme is currently not persisted. The theme toggle must remain in the header and must not accidentally add persistence or change `ThemeContext`.

### 13.10 API error text

Raw API/network errors may remain English. Pages should display translated generic error messages and keep raw errors in the console for debugging. Do not translate DummyJSON data.

### 13.11 `ProductCard` memoization

`ProductCard` is wrapped in `memo`. Because it will consume `useLanguage`, it will re-render correctly when the language context changes. Ensure `useLanguage` is called inside the component so translations update.

### 13.12 Unused files

`src/pages/Shop.jsx` is not routed and imports a non-existent path. It should not be used or fixed as part of this stage unless explicitly requested. The other demo files are also unreachable.

### 13.13 Browser title

The current browser title is `Online-shop`. This is not part of the visible page UI but is an interface string. Optional cleanup:

- Update `index.html` title to `Olivé`.
- Or set a translated `document.title` from `LanguageContext`.

This is low risk but not required for the core Stage 2.1 behavior.

### 13.14 Font support

Macedonian headings may render with a fallback font if the current Playfair Display subset lacks some Cyrillic glyphs. Verify visually. Do not add a new font dependency unless necessary.

### 13.15 No automated tests

The project has no test framework. Verification will be manual plus:

```powershell
npm.cmd run lint
npm.cmd run build
```

---

## 14. Verification Plan

After implementation:

1. Run `npm.cmd run lint`.
2. Run `npm.cmd run build`.
3. Verify a fresh load without `olive-language` defaults to English.
4. Switch to Macedonian:
   - All rendered UI text updates without a refresh.
   - `localStorage["olive-language"]` becomes `"mk"`.
   - Refresh preserves Macedonian.
5. Switch back to English and refresh.
6. Desktop header:
   - Brand left.
   - Home/Shop/About centered.
   - Favorites, Cart, Account, Theme, Language on the right.
   - No search field.
   - No hamburger.
7. Mobile header:
   - All utility items remain visible.
   - Navigation remains accessible and centered.
   - No horizontal overflow.
   - Page content is not hidden behind the fixed header.
8. Shop search:
   - Search field is above the product listing.
   - Search works with debounce.
   - X clears search text, results, `search` parameter, and pagination.
   - Category selection is preserved.
9. SearchPage:
   - `/search?q=...` still works.
   - `q` is not renamed.
10. Dashboard:
    - No Dashboard links remain.
    - `/dashboard` route is removed and falls through to NotFound.
    - `DashboardLayout.jsx` is deleted after audit.
    - Dashboard CSS is removed.
11. Footer:
    - Three sections only.
    - No Dashboard link.
12. Verify cart, favorites, login, register, logout, theme, and product pages still work.
13. Verify DummyJSON product titles, descriptions, and categories remain unchanged in both languages.
14. Confirm no existing localStorage keys were renamed or removed.

---

## 15. Scope Boundaries

### Will do

- Add English/Macedonian translations.
- Add language context and `olive-language` persistence.
- Keep the header brand, centered nav, and all right-side utilities.
- Remove header search and hamburger.
- Keep the Shop search above the product listing with one X clear button.
- Remove Dashboard completely from the visible application.
- Remove Dashboard route, links, file, and CSS.
- Reorganize the footer into Brand, Explore, Customer Account.
- Preserve needed routes and all existing functionality.

### Will not do

- Redesign the homepage.
- Proceed to Stage 3.
- Add an i18n dependency.
- Translate DummyJSON product data.
- Change existing localStorage keys.
- Keep the Dashboard route or visible Dashboard links.
- Invent contact information.
- Modify unused demo files unless explicitly requested.

---

## 16. Revision Summary

This revision updates the previous plan to reflect the latest agreed decisions:

- Removed the hamburger menu design.
- Kept Favorites, Cart, Account, Theme, and Language directly in the header.
- Removed Search from the header.
- Kept the search field above the product listing.
- Replaced the text Clear Filter button with one X clear button.
- Preserved the distinction between the `q` and `search` URL parameters.
- Removed Dashboard completely, including its route, links, layout condition, CSS, and file after audit.
- Kept the three-section footer without Dashboard.
- Kept English as the default language and Macedonian as the second language.
- Kept `olive-language` as the only new localStorage key.
- Reorganized the work into five implementation stages.
