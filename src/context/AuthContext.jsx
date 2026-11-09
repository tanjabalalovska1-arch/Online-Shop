import { createContext, useContext, useState } from "react";

import { useLanguage } from "./LanguageContext.jsx";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { t } = useLanguage();

  // Gi cuvame registriranite korisnici vo localStorage
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("olive-users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // Go vrakjame najaveniot korisnik od localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("olive-current-user");

    if (!savedUser) return null;

    const parsedUser = JSON.parse(savedUser);

    // Go pronagjame registriraniot korisnik spored email
    const registeredUser = users.find(
      (item) => item.email.toLowerCase() === parsedUser.email.toLowerCase(),
    );

    // Ako postoi, go vrakjame i negovoto unikatno ID
    if (registeredUser) {
      return {
        id: registeredUser.id,
        name: registeredUser.name,
        email: registeredUser.email,
      };
    }

    return null;
  });

  // Registracija na nov korisnik
  function register(name, email, password) {
    const existingUser = users.find(
      (item) => item.email.toLowerCase() === email.toLowerCase(),
    );

    if (existingUser) {
      return {
        success: false,
        message: t("auth.accountExists"),
      };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);
    localStorage.setItem("olive-users", JSON.stringify(updatedUsers));

    const currentUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    setUser(currentUser);

    localStorage.setItem("olive-current-user", JSON.stringify(currentUser));

    return {
      success: true,
      message: t("auth.registrationSuccess"),
    };
  }

  // Najava na postoecki korisnik
  function login(email, password) {
    const foundUser = users.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password,
    );

    if (!foundUser) {
      return {
        success: false,
        message: t("auth.invalidCredentials"),
      };
    }

    const currentUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    };

    setUser(currentUser);

    localStorage.setItem("olive-current-user", JSON.stringify(currentUser));

    return {
      success: true,
      message: t("auth.loginSuccess"),
    };
  }

  // Odjava na korisnik
  function logout() {
    setUser(null);
    localStorage.removeItem("olive-current-user");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
