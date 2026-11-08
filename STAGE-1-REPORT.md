# Stage 1 — Design System Foundation Report

## 1. Summary of changes

Stage 1 established a Soft Modern design system for Olivé without changing application behavior.

- Added a reusable token layer for colors, spacing, border radius, shadows, and typography.
- Applied warm cream/ivory backgrounds, dusty-rose/blush accents, warm dark-brown text, and soft borders.
- Added light and dark theme token values.
- Kept Playfair Display as the heading font and Segoe UI as the body font.
- Preserved and remapped the existing legacy CSS variable names to the new tokens.
- Added a consistent global keyboard `:focus-visible` treatment.
- Removed only the template-era global styles that conflicted with the existing `.app` theme system.
- Left all routes, components, contexts, hooks, localStorage usage, JSX, JavaScript, and `index.html` untouched.
- Left existing page-specific styles and the rest of `App.css` intact.

## 2. Exact files modified

Implementation files:

- `src/index.css`
- `src/App.css`

Documentation file created:

- `STAGE-1-REPORT.md`

No other files were modified.

## 3. Important CSS variables added or changed

### New design tokens in `src/index.css`

Color tokens:

- `--color-bg`
- `--color-bg-soft`
- `--color-bg-muted`
- `--color-surface`
- `--color-surface-hover`
- `--color-surface-alt`
- `--color-text`
- `--color-heading`
- `--color-muted`
- `--color-border`
- `--color-border-strong`
- `--color-accent`
- `--color-accent-hover`
- `--color-accent-soft`
- `--color-accent-blush`
- `--color-accent-contrast`
- `--color-focus-ring`
- `--color-overlay`

Spacing tokens:

- `--space-3xs` through `--space-3xl`

Radius tokens:

- `--radius-xs`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-pill`, `--radius-circle`

Shadow tokens:

- `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-focus`

Typography tokens:

- `--font-heading` — Playfair Display
- `--font-body` — Segoe UI
- `--font-mono`
- `--font-size-xs` through `--font-size-2xl`
- `--line-height-tight`, `--line-height-base`
- `--font-weight-normal`, `--font-weight-medium`, `--font-weight-semibold`
- `--letter-spacing-wide`

### Legacy variable mappings

Mapped in `src/index.css`:

- `--text` → `--color-text`
- `--text-h` → `--color-heading`
- `--bg` → `--color-bg`
- `--border` → `--color-border`
- `--code-bg` → `--color-surface-alt`
- `--accent` → `--color-accent`
- `--accent-bg` → `--color-accent-blush`
- `--accent-border` → `--color-accent-soft`
- `--social-bg` → `--color-surface-alt`
- `--shadow` → `--shadow-md`
- `--sans` → `--font-body`
- `--heading` → `--font-heading`
- `--mono` → `--font-mono`

Mapped in `src/App.css`:

- `--cream` → `--color-bg`
- `--white` → `--color-surface`
- `--beige` → `--color-bg-muted`
- `--beige-dark` → `--color-bg-muted`
- `--rose` → `--color-accent-soft`
- `--rose-dark` → `--color-accent`
- `--brown` → `--color-heading`
- `--text` → `--color-text`
- `--muted` → `--color-muted`
- `--border` → `--color-border`
- `--line` → `--color-border` (previously undefined)
- `--text-secondary` → `--color-muted` (previously undefined)
- `--card-shadow` → `--shadow-md`

App-level compatibility aliases in `src/App.css`:

- `--page-bg` → `--color-bg`
- `--page-text` → `--color-text`
- `--surface` → `--color-surface`
- `--surface-hover` → `--color-surface-hover`
- `--heading` → `--color-heading` (remains a color token inside `.app`)
- `--accent` → `--color-accent`
- `--accent-hover` → `--color-accent-hover`

## 4. Light and dark theme changes

### Light theme

- Warm cream background: `#f8f5f0`
- Soft ivory surface: `#fffdf9`
- Warm dark-brown text and headings
- Dusty-rose accent: `#a94f65`
- Blush soft accent: `#f0dcd6`
- Soft warm borders: `#e6d8cc`
- `color-scheme: light`

Light values are defined on `:root`, `[data-theme="light"]`, and `.app.light`.

### Dark theme

- Warm dark background: `#292522`
- Warm dark surfaces: `#302b27` / `#352d2a`
- Warm light text and headings
- Warm rose accent: `#d0a58a`
- Dark blush surface: `#4a3b34`
- Soft dark borders: `#48403a`
- `color-scheme: dark`

Dark values are defined in:

- `@media (prefers-color-scheme: dark)` for system preference
- `[data-theme="dark"]` for the app's theme context
- `.app.dark` for the existing app theme class

The existing `.app.light` / `.app.dark` mechanism and the `data-theme` attribute set by `ThemeContext` are both supported.

## 5. Warnings and possible conflicts

- `npm run lint` reports pre-existing warnings unrelated to this stage:
  - `set-state-in-effect` in `src/hooks/useFetch.js`, `src/hooks/useProducts.js`, and `src/App.jsx`
  - Fast-refresh export warnings in `FavoritesContext.jsx`, `CartContext.jsx`, `AuthContext.jsx`, `ThemeContext.jsx`, and `SearchContext.jsx`
  - `Date` purity warning in `src/components/Footer.jsx`
- `--heading` remains overloaded by legacy code:
  - In `index.css`, `--heading` points to the heading font.
  - Inside `.app`, `App.css` defines `--heading` as a heading color.
  - Base headings use `--font-heading` to avoid this collision, but external CSS using `var(--heading)` as a font inside `.app` would receive a color.
- Hardcoded local palettes still exist in page-specific CSS, including the modern/minimal home sections, the shop `--un-*` palette, header rgba backgrounds, and some dark-mode overrides. These are intentionally left for later stages.
- Other CSS files still define and use their own local variables. They were not changed because this stage was limited to `src/index.css` and `src/App.css`.
- `#root` keeps its existing `max-width: 1440px` and centered text to avoid unintended layout shifts. This may constrain future full-bleed designs.
- `--card-index` is still intentionally supplied inline from JSX for category card animation delays.
- The category card inline animation variable is not part of the design token set.

## 6. Commands to verify

Run from the project root:

```powershell
npm.cmd run build
npm.cmd run lint
```

Optional local preview:

```powershell
npm.cmd run dev
```

Optional diff review:

```powershell
git diff -- src/index.css src/App.css
```

Note: In the current PowerShell environment, `npm` scripts may fail due to execution policy. Use `npm.cmd` instead, as shown above.
