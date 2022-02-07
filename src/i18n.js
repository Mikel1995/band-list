import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      common: {
        username: 'Username', 
        password: 'Password',
        or: 'Or',
        
      },
      Login: {
        loginButton: "LogIn",
        rememberMe: 'Remember me',
        registerNow: 'Register Now',
        usernameRule: 'Please input your email!',
        usernamePassword: 'Please input your password!',
        verifyCredencial: 'Please verify you credencials',
        unableToLogin: 'Unable To Login'
      },
    },
  },
  al: {
    translation: {
      common: {
        username: 'Emri ose email-i', 
        password: 'Fjalkalimi',
        or: 'Ose ',
        error: 'PROBLEM'
      },
      Login: {
        loginButton: "Kycu",
        rememberMe: 'Me Kujto',
        registerNow: 'Rregjistrohu',
        usernameRule: 'Ju lutem fusni email-in!',
        usernamePassword: 'Ju lutem fusni fjalkalimin!',
        verifyCredencial: 'Ju lutem kontrolloni kredencialet',
        unableToLogin: 'Problem ne Login'
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "al",
  interpolant: {
    escapeValue: false,
  },
});

export default i18n;
