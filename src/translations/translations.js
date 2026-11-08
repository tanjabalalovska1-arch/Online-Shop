export const DEFAULT_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = ["en", "mk"];

export const translations = {
  en: {
    app: {
      loadingPage: "Loading page...",
      closeCart: "Close cart",
    },
    header: {
      home: "Home",
      shop: "Shop",
      about: "About",
      favorites: "Favorites",
      cart: "Shopping cart",
      account: "Login or create an account",
      accountMenu: "Account menu",
      logout: "Logout",
      primaryNav: "Primary navigation",
      greeting: "Hi, {name}",
      signedInAs: "Signed in as {name}",
      favoritesAriaOne: "Open favorites, {count} item",
      favoritesAriaMany: "Open favorites, {count} items",
      cartAriaOne: "Open shopping cart, {count} item",
      cartAriaMany: "Open shopping cart, {count} items",
      darkMode: "Enable dark mode",
      lightMode: "Enable light mode",
      darkModeTitle: "Dark mode",
      lightModeTitle: "Light mode",
      brandHome: "Olivé home",
      language: "Language",
      languageSelector: "Select language",
      languageEnglish: "English",
      languageMacedonian: "Macedonian",
      switchToEnglish: "Switch to English",
      switchToMacedonian: "Switch to Macedonian",
    },
    footer: {
      description:
        "Curated fashion and lifestyle pieces for everyday living. Thoughtful design, warm details, and finds made to be kept.",
      explore: "Explore",
      exploreAria: "Explore links",
      customerAccount: "Customer Account",
      accountAria: "Customer account links",
      home: "Home",
      shop: "Shop",
      about: "About",
      favorites: "Favorites",
      login: "Login",
      register: "Register",
      rights: "© {year} Olivé. All rights reserved.",
      note: "Crafted for everyday living.",
    },
    home: {
      accountLabel: "YOUR ACCOUNT",
      welcome: "Welcome to Olivé",
      status:
        "Login or create an account to enjoy your shopping experience.",
      login: "Login",
      register: "Register",
      titleLine1: "Good finds.",
      titleLine2: "Every day.",
      description:
        "Discover products for your everyday life. Find something you love, all in one place.",
      exploreShop: "Explore the shop",
      imageAlt: "Carefully selected products and everyday essentials",
      captionSmall: "Everyday essentials.",
      captionHeading: "Find your next favourite.",
      footer: "GOOD FINDS FOR EVERYDAY LIVING.",
    },
    shop: {
      explore: "EXPLORE",
      categories: "Categories",
      categoriesAria: "Product categories",
      allProducts: "All Products",
      searchPlaceholder: "Search products...",
      searchAria: "Search products",
      clearSearch: "Clear search",
      searching: "Searching products...",
      loading: "Loading products...",
      error: "Error: {message}",
      noProducts: "No products found in this category.",
      previous: "Previous",
      next: "Next",
      pageOf: "Page {current} of {total}",
    },
    product: {
      viewDetails: "View Details",
      addToCart: "Add to Cart",
      addToCartAria: "Add {title} to cart",
      loginForCart:
        "Please login first to add products to your cart.",
      loginForFavorites: "Please login first to add favorites.",
      addFavorite: "Add to favorites",
      removeFavorite: "Remove from favorites",
      backToProducts: "← Back to Products",
      price: "Price",
      brand: "Brand",
      category: "Category",
      notSpecified: "Not specified",
      loading: "Loading product...",
      notFound: "Product not found.",
    },
    search: {
      title: "Search Results",
      term: "Search term: {query}",
      loading: "Loading products...",
      error: "Error: {message}",
      noProducts: "No products found.",
    },
    favorites: {
      title: "My Favorites ❤️",
      subtitle: "Your favorite products, all in one place.",
      empty: "You haven't added any favorites yet.",
      explore: "Explore Products",
    },
    cart: {
      title: "Cart ({count} items)",
      empty: "Your cart is empty",
      total: "Total",
      clear: "Clear Cart",
      clearConfirm: "Are you sure you want to clear the cart?",
      removeAria: "Remove {title}",
    },
    login: {
      label: "WELCOME BACK",
      title: "Login",
      description: "Sign in to your Olivé account.",
      email: "Email",
      emailPlaceholder: "Enter your email",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      submit: "Login",
      noAccount: "Don't have an account?",
      register: "Register",
    },
    register: {
      label: "WELCOME TO Olivé",
      title: "Create Account",
      description: "Join Olivé and discover your next favourite.",
      fullName: "Full Name",
      fullNamePlaceholder: "Enter your full name",
      email: "Email",
      emailPlaceholder: "Enter your email",
      password: "Password",
      passwordPlaceholder: "At least 6 characters",
      confirmPassword: "Confirm Password",
      confirmPlaceholder: "Repeat your password",
      submit: "Create Account",
      haveAccount: "Already have an account?",
      login: "Login",
      passwordLength:
        "Password must contain at least 6 characters.",
      passwordMismatch: "Passwords do not match.",
    },
    about: {
      label: "GET TO KNOW US",
      title: "About Olivé",
      intro:
        "More than just shopping — a little inspiration for everyday living.",
      p1:
        "Welcome to Olivé! We believe that shopping should be simple, enjoyable, and inspiring.",
      p2:
        "Our goal is to bring you carefully selected products that combine quality, style, and practicality. Whether you are looking for something useful or something special, we want your shopping experience to be easy and enjoyable.",
      signature: "Thank you for being part of Olivé.",
    },
    notFound: {
      title: "404 - Page Not Found",
      description:
        "Sorry, the page you are looking for does not exist.",
      back: "Go back to Shop",
    },
    breadcrumbs: {
      aria: "Breadcrumb",
      home: "Home",
      products: "Products",
    },
    auth: {
      accountExists: "An account with this email already exists.",
      registrationSuccess: "Registration successful!",
      invalidCredentials: "Invalid email or password.",
      loginSuccess: "Login successful!",
    },
    categories: {
      beauty: "Beauty",
      fragrances: "Fragrances",
      furniture: "Furniture",
      groceries: "Groceries",
      "home-decoration": "Home Decoration",
      "kitchen-accessories": "Kitchen Accessories",
      laptops: "Laptops",
      "mens-shirts": "Men's Shirts",
      "mens-shoes": "Men's Shoes",
      "mens-watches": "Men's Watches",
      "mobile-accessories": "Mobile Accessories",
      motorcycle: "Motorcycle",
      "skin-care": "Skin Care",
      smartphones: "Smartphones",
      "sports-accessories": "Sports Accessories",
      sunglasses: "Sunglasses",
      tablets: "Tablets",
      tops: "Tops",
      vehicle: "Vehicle",
      "womens-bags": "Women's Bags",
      "womens-dresses": "Women's Dresses",
      "womens-jewellery": "Women's Jewellery",
      "womens-shoes": "Women's Shoes",
      "womens-watches": "Women's Watches",
    },
  },
  mk: {
    app: {
      loadingPage: "Се вчитува страницата...",
      closeCart: "Затвори кошничка",
    },
    header: {
      home: "Дома",
      shop: "Продавница",
      about: "За нас",
      favorites: "Омилени",
      cart: "Кошничка",
      account: "Најава или отворање сметка",
      accountMenu: "Мени за сметка",
      logout: "Одјава",
      primaryNav: "Главна навигација",
      greeting: "Здраво, {name}",
      signedInAs: "Најавени сте како {name}",
      favoritesAriaOne: "Отвори омилени, {count} производ",
      favoritesAriaMany: "Отвори омилени, {count} производи",
      cartAriaOne: "Отвори кошничка, {count} производ",
      cartAriaMany: "Отвори кошничка, {count} производи",
      darkMode: "Вклучи темна тема",
      lightMode: "Вклучи светла тема",
      darkModeTitle: "Темна тема",
      lightModeTitle: "Светла тема",
      brandHome: "Почетна на Olivé",
      language: "Јазик",
      languageSelector: "Изберете јазик",
      languageEnglish: "Англиски",
      languageMacedonian: "Македонски",
      switchToEnglish: "Префрли на англиски",
      switchToMacedonian: "Префрли на македонски",
    },
    footer: {
      description:
        "Внимателно избрани модни и животни парчиња за секојдневен живот. Промислен дизајн, топли детали и наоди што вреди да се задржат.",
      explore: "Истражи",
      exploreAria: "Линкови за истражување",
      customerAccount: "Корисничка сметка",
      accountAria: "Линкови за корисничка сметка",
      home: "Дома",
      shop: "Продавница",
      about: "За нас",
      favorites: "Омилени",
      login: "Најава",
      register: "Регистрација",
      rights: "© {year} Olivé. Сите права се задржани.",
      note: "Создадено за секојдневен живот.",
    },
    home: {
      accountLabel: "ВАША СМЕТКА",
      welcome: "Добредојдовте во Olivé",
      status:
        "Најавете се или отворете сметка за да уживате во вашето купување.",
      login: "Најава",
      register: "Регистрација",
      titleLine1: "Топ избор.",
      titleLine2: "Секој ден.",
      description:
        "Откријте производи за вашиот секојдневен живот. Пронајдете нешто што го сакате, сè на едно место.",
      exploreShop: "Разгледај ја продавницата",
      imageAlt:
        "Внимателно избрани производи и секојдневни потребни работи",
      captionSmall: "Секојдневни потребни работи.",
      captionHeading: "Пронајдете го следното омилено.",
      footer: "ДОБРИ НАОДИ ЗА СЕКОЈДНЕВЕН ЖИВОТ.",
    },
    shop: {
      explore: "ИСТРАЖИ",
      categories: "Категории",
      categoriesAria: "Категории на производи",
      allProducts: "Сите производи",
      searchPlaceholder: "Пребарајте производи...",
      searchAria: "Пребарајте производи",
      clearSearch: "Исчисти пребарување",
      searching: "Се пребаруваат производи...",
      loading: "Се вчитуваат производи...",
      error: "Грешка: {message}",
      noProducts: "Не се пронајдени производи во оваа категорија.",
      previous: "Претходна",
      next: "Следна",
      pageOf: "Страница {current} од {total}",
    },
    product: {
      viewDetails: "Види детали",
      addToCart: "Додај во кошничка",
      addToCartAria: "Додај {title} во кошничка",
      loginForCart:
        "Прво најавете се за да додавате производи во кошничката.",
      loginForFavorites:
        "Прво најавете се за да додавате во омилени.",
      addFavorite: "Додај во омилени",
      removeFavorite: "Отстрани од омилени",
      backToProducts: "← Назад кон производите",
      price: "Цена",
      brand: "Бренд",
      category: "Категорија",
      notSpecified: "Не е наведено",
      loading: "Се вчитува производот...",
      notFound: "Производот не е пронајден.",
    },
    search: {
      title: "Резултати од пребарување",
      term: "Пребаруван термин: {query}",
      loading: "Се вчитуваат производи...",
      error: "Грешка: {message}",
      noProducts: "Не се пронајдени производи.",
    },
    favorites: {
      title: "Мои омилени ❤️",
      subtitle: "Вашите омилени производи, сè на едно место.",
      empty: "Сè уште немате додадено омилени производи.",
      explore: "Разгледај производи",
    },
    cart: {
      title: "Кошничка ({count} производи)",
      empty: "Вашата кошничка е празна",
      total: "Вкупно",
      clear: "Исчисти кошничка",
      clearConfirm:
        "Дали сте сигурни дека сакате да ја исчистите кошничката?",
      removeAria: "Отстрани {title}",
    },
    login: {
      label: "ДОБРЕДОЈДОВТЕ НАЗАД",
      title: "Најава",
      description: "Најавете се на вашата сметка на Olivé.",
      email: "Е-пошта",
      emailPlaceholder: "Внесете ја вашата е-пошта",
      password: "Лозинка",
      passwordPlaceholder: "Внесете ја вашата лозинка",
      submit: "Најави се",
      noAccount: "Немате сметка?",
      register: "Регистрирајте се",
    },
    register: {
      label: "ДОБРЕДОЈДОВТЕ ВО Olivé",
      title: "Отворете сметка",
      description:
        "Придружете се на Olivé и откријте го следното омилено.",
      fullName: "Цело име",
      fullNamePlaceholder: "Внесете го вашето цело име",
      email: "Е-пошта",
      emailPlaceholder: "Внесете ја вашата е-пошта",
      password: "Лозинка",
      passwordPlaceholder: "Најмалку 6 знаци",
      confirmPassword: "Потврди лозинка",
      confirmPlaceholder: "Повторете ја лозинката",
      submit: "Отвори сметка",
      haveAccount: "Веќе имате сметка?",
      login: "Најавете се",
      passwordLength:
        "Лозинката мора да содржи најмалку 6 знаци.",
      passwordMismatch: "Лозинките не се совпаѓаат.",
    },
    about: {
      label: "ЗАПОЗНАЈТЕ НЕ",
      title: "За Olivé",
      intro:
        "Повеќе од само купување — малку инспирација за секојдневниот живот.",
      p1:
        "Добредојдовте во Olivé! Веруваме дека купувањето треба да биде едноставно, пријатно и инспиративно.",
      p2:
        "Нашата цел е да ви донесеме внимателно избрани производи што спојуваат квалитет, стил и практичност. Без разлика дали барате нешто корисно или нешто посебно, сакаме вашето купување да биде лесно и пријатно.",
      signature: "Ви благодариме што сте дел од Olivé.",
    },
    notFound: {
      title: "404 — Страницата не е пронајдена",
      description: "Извинете, страницата што ја барате не постои.",
      back: "Назад кон продавницата",
    },
    breadcrumbs: {
      aria: "Патека",
      home: "Дома",
      products: "Производи",
    },
    auth: {
      accountExists: "Веќе постои сметка со оваа е-пошта.",
      registrationSuccess: "Регистрацијата е успешна!",
      invalidCredentials: "Погрешна е-пошта или лозинка.",
      loginSuccess: "Најавата е успешна!",
    },
    categories: {
      beauty: "Убавина",
      fragrances: "Парфеми",
      furniture: "Мебел",
      groceries: "Намирници",
      "home-decoration": "Домашна декорација",
      "kitchen-accessories": "Кујнски додатоци",
      laptops: "Лаптопи",
      "mens-shirts": "Машки кошули",
      "mens-shoes": "Машки обувки",
      "mens-watches": "Машки часовници",
      "mobile-accessories": "Мобилни додатоци",
      motorcycle: "Мотоцикли",
      "skin-care": "Нега за кожа",
      smartphones: "Смартфони",
      "sports-accessories": "Спортски додатоци",
      sunglasses: "Очила за сонце",
      tablets: "Таблети",
      tops: "Горни делови",
      vehicle: "Возила",
      "womens-bags": "Женски чанти",
      "womens-dresses": "Женски фустани",
      "womens-jewellery": "Женски накит",
      "womens-shoes": "Женски обувки",
      "womens-watches": "Женски часовници",
    },
  },
};

function lookup(dictionary, key) {
  return key
    .split(".")
    .reduce(
      (value, part) =>
        value && typeof value === "object" ? value[part] : undefined,
      dictionary,
    );
}

export function getTranslation(language, key, variables = {}) {
  const dictionary = translations[language] || translations[DEFAULT_LANGUAGE];
  const fallback = translations[DEFAULT_LANGUAGE];

  const value = lookup(dictionary, key) ?? lookup(fallback, key);

  if (typeof value !== "string") {
    return key;
  }

  return value.replace(/\{(\w+)\}/g, (match, name) =>
    Object.prototype.hasOwnProperty.call(variables, name)
      ? String(variables[name])
      : match,
  );
}

function prettifyCategoryName(name) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getCategoryTranslation(language, slug, fallbackName) {
  const key = `categories.${slug}`;
  const dictionary = translations[language] || translations[DEFAULT_LANGUAGE];
  const fallback = translations[DEFAULT_LANGUAGE];

  const value = lookup(dictionary, key) ?? lookup(fallback, key);

  if (typeof value === "string") {
    return value;
  }

  return prettifyCategoryName(fallbackName || slug || "");
}
