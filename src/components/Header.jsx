import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.3a2 2 0 0 0 2-1.6L23 7H6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

function ThemeIcon({ theme }) {
  if (theme === "light") {
    return (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function Header({ onOpenCart }) {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const { favorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, toggleLanguage, t } = useLanguage();

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [accountMenuPosition, setAccountMenuPosition] = useState(null);

  const accountControlRef = useRef(null);
  const accountButtonRef = useRef(null);
  const accountMenuRef = useRef(null);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = favorites.length;

  function getAccountMenuPosition() {
    const button = accountButtonRef.current;

    if (!button) {
      return null;
    }

    const rect = button.getBoundingClientRect();
    const margin = 12;
    const width = Math.min(240, window.innerWidth - margin * 2);
    const left = Math.min(
      Math.max(margin, rect.right - width),
      window.innerWidth - width - margin,
    );

    return {
      top: rect.bottom + 8,
      left,
      width,
    };
  }

  function openAccountMenu() {
    setAccountMenuPosition(getAccountMenuPosition());
    setIsAccountOpen(true);
  }

  function closeAccountMenu({ returnFocus = false } = {}) {
    setIsAccountOpen(false);

    if (returnFocus) {
      accountButtonRef.current?.focus();
    }
  }

  function toggleAccountMenu() {
    if (isAccountOpen) {
      closeAccountMenu();
      return;
    }

    openAccountMenu();
  }

  function handleLogout() {
    closeAccountMenu();
    logout();
  }

  useEffect(() => {
    if (!isAccountOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      const target = event.target;

      if (
        accountControlRef.current?.contains(target) ||
        accountMenuRef.current?.contains(target)
      ) {
        return;
      }

      setIsAccountOpen(false);
    }

    function handleResize() {
      setAccountMenuPosition(getAccountMenuPosition());
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.stopPropagation();
        closeAccountMenu({ returnFocus: true });
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isAccountOpen]);

  useEffect(() => {
    if (!isAccountOpen) {
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      const firstItem = accountMenuRef.current?.querySelector(
        '[role="menuitem"]',
      );

      firstItem?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isAccountOpen]);

  function handleAccountKeyDown(event) {
    if (event.key === "Escape" && isAccountOpen) {
      event.stopPropagation();
      closeAccountMenu({ returnFocus: true });
    }
  }

  function handleAccountMenuKeyDown(event) {
    if (event.key === "Escape") {
      event.stopPropagation();
      closeAccountMenu({ returnFocus: true });
      return;
    }

    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
      return;
    }

    const items = Array.from(
      accountMenuRef.current?.querySelectorAll('[role="menuitem"]') ?? [],
    );

    if (items.length === 0) {
      return;
    }

    event.preventDefault();

    const currentIndex = items.indexOf(document.activeElement);
    const nextIndex =
      event.key === "ArrowDown"
        ? currentIndex < 0 || currentIndex === items.length - 1
          ? 0
          : currentIndex + 1
        : currentIndex <= 0
          ? items.length - 1
          : currentIndex - 1;

    items[nextIndex].focus();
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="brand" aria-label={t("header.brandHome")}>
          <span className="brand-icon" aria-hidden="true">
            ✦
          </span>
          <span className="brand-name">Olivé</span>
        </NavLink>

        <nav className="site-nav" aria-label={t("header.primaryNav")}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `site-nav-link${isActive ? " active" : ""}`
            }
          >
            {t("header.home")}
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `site-nav-link${isActive ? " active" : ""}`
            }
          >
            {t("header.shop")}
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `site-nav-link${isActive ? " active" : ""}`
            }
          >
            {t("header.about")}
          </NavLink>
        </nav>

        <div className="header-actions">
          <NavLink
            to="/favorites"
            className="icon-button"
            aria-label={t(
              favoritesCount === 1
                ? "header.favoritesAriaOne"
                : "header.favoritesAriaMany",
              { count: favoritesCount },
            )}
            title={t("header.favorites")}
          >
            <span className="icon-badge-wrap">
              <HeartIcon />

              {favoritesCount > 0 && (
                <span className="count-badge" aria-hidden="true">
                  {favoritesCount}
                </span>
              )}
            </span>
          </NavLink>

          <button
            type="button"
            className="icon-button"
            onClick={onOpenCart}
            aria-label={t(
              cartCount === 1
                ? "header.cartAriaOne"
                : "header.cartAriaMany",
              { count: cartCount },
            )}
            title={t("header.cart")}
          >
            <span className="icon-badge-wrap">
              <CartIcon />

              {cartCount > 0 && (
                <span className="count-badge" aria-hidden="true">
                  {cartCount}
                </span>
              )}
            </span>
          </button>

          {user ? (
            <div
              className="account-control"
              ref={accountControlRef}
              onKeyDown={handleAccountKeyDown}
            >
              <button
                ref={accountButtonRef}
                type="button"
                className="icon-button account-trigger account-trigger--active"
                onClick={toggleAccountMenu}
                aria-haspopup="menu"
                aria-expanded={isAccountOpen}
                aria-controls="account-menu"
                aria-label={t("header.signedInAs", { name: user.name })}
                title={t("header.signedInAs", { name: user.name })}
              >
                <UserIcon />
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="icon-button account-trigger"
              title={t("header.account")}
              aria-label={t("header.account")}
            >
              <UserIcon />
            </NavLink>
          )}

          <div
            className="language-switcher"
            role="group"
            aria-label={t("header.languageSelector")}
          >
            <button
              type="button"
              className={`language-option${
                language === "en" ? " active" : ""
              }`}
              onClick={() => setLanguage("en")}
              aria-pressed={language === "en"}
              aria-label={t("header.languageEnglish")}
              title={t("header.switchToEnglish")}
            >
              EN
            </button>

            <span className="language-divider" aria-hidden="true">
              |
            </span>

            <button
              type="button"
              className={`language-option${
                language === "mk" ? " active" : ""
              }`}
              onClick={() => setLanguage("mk")}
              aria-pressed={language === "mk"}
              aria-label={t("header.languageMacedonian")}
              title={t("header.switchToMacedonian")}
            >
              MK
            </button>
          </div>

          <button
            type="button"
            className="language-toggle-mobile"
            onClick={toggleLanguage}
            aria-label={
              language === "en"
                ? t("header.switchToMacedonian")
                : t("header.switchToEnglish")
            }
            title={
              language === "en"
                ? t("header.switchToMacedonian")
                : t("header.switchToEnglish")
            }
          >
            {language === "en" ? "EN" : "MK"}
          </button>

          <button
            type="button"
            className="icon-button theme-toggle-button"
            onClick={toggleTheme}
            aria-label={
              theme === "light"
                ? t("header.darkMode")
                : t("header.lightMode")
            }
            title={
              theme === "light"
                ? t("header.darkModeTitle")
                : t("header.lightModeTitle")
            }
          >
            <ThemeIcon theme={theme} />
          </button>
        </div>
      </div>

      {user &&
        createPortal(
          <div
            id="account-menu"
            ref={accountMenuRef}
            className={`account-menu${isAccountOpen ? " open" : ""}`}
            style={
              accountMenuPosition
                ? {
                    top: accountMenuPosition.top,
                    left: accountMenuPosition.left,
                    width: accountMenuPosition.width,
                  }
                : undefined
            }
            role="menu"
            aria-label={t("header.accountMenu")}
            aria-hidden={!isAccountOpen}
            onKeyDown={handleAccountMenuKeyDown}
          >
            <div className="account-menu-header">
              <span className="account-menu-name">{user.name}</span>
            </div>

            <button
              type="button"
              role="menuitem"
              className="account-menu-item account-menu-logout"
              onClick={handleLogout}
            >
              <LogoutIcon />
              <span>{t("header.logout")}</span>
            </button>
          </div>,
          document.body,
        )}
    </header>
  );
}

export default Header;
