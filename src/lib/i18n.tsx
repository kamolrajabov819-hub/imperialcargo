import React, { createContext, useContext, useState } from "react";

export type Language = "en" | "ru" | "kg";

const translations = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.signup": "Sign Up",
    "nav.dashboard": "Dashboard",
    "nav.admin": "Admin",

    // Hero
    "hero.title": "Your Gateway Between",
    "hero.titleHighlight": "China & Kyrgyzstan",
    "hero.subtitle": "Reliable cargo logistics with personal identity codes for seamless tracking and delivery.",
    "hero.cta": "Get Your Personal Code",
    "hero.learnMore": "Learn More",

    // Signup
    "signup.title": "Create Your Account",
    "signup.step1": "Full Name",
    "signup.step2": "WhatsApp Number",
    "signup.step3": "Your City",
    "signup.namePlaceholder": "Enter your full name",
    "signup.phonePlaceholder": "Enter your WhatsApp number",
    "signup.cityPlaceholder": "Select your city",
    "signup.next": "Continue",
    "signup.back": "Back",
    "signup.submit": "Get My Code",
    "signup.success": "Registration Complete!",
    "signup.yourCode": "Your Personal Code",

    // Dashboard
    "dashboard.title": "Your Dashboard",
    "dashboard.idCard": "Identity Card",
    "dashboard.code": "Personal Code",
    "dashboard.copyCode": "Copy Code",
    "dashboard.copied": "Copied!",
    "dashboard.warehouse": "China Warehouse Address",
    "dashboard.copyAddress": "Copy Full Address",
    "dashboard.tracking": "Order Tracking",
    "dashboard.trackingDesc": "Coming soon — track your packages in real-time.",
    "dashboard.contactManager": "Contact Manager",
    "dashboard.logout": "Log Out",

    // Admin
    "admin.login": "Admin Login",
    "admin.email": "Email",
    "admin.password": "Password",
    "admin.signIn": "Sign In",
    "admin.invalidCreds": "Invalid credentials",
    "admin.clients": "Clients",
    "admin.settings": "Settings",
    "admin.search": "Search by name, code, or phone...",
    "admin.addClient": "Add New Client",
    "admin.name": "Name",
    "admin.phone": "Phone",
    "admin.location": "Location",
    "admin.identityCode": "Identity Code",
    "admin.date": "Date",
    "admin.actions": "Actions",
    "admin.edit": "Edit",
    "admin.delete": "Delete",
    "admin.save": "Save",
    "admin.cancel": "Cancel",
    "admin.logout": "Logout",
    "admin.totalClients": "Total Clients",
    "admin.deleteConfirm": "Are you sure?",

    // Cities
    "city.bishkek": "Bishkek",
    "city.osh": "Osh",
    "city.jalalabad": "Jalal-Abad",
    "city.karakol": "Karakol",
    "city.tokmok": "Tokmok",
    "city.naryn": "Naryn",
    "city.batken": "Batken",
    "city.talas": "Talas",
  },
  ru: {
    "nav.home": "Главная",
    "nav.signup": "Регистрация",
    "nav.dashboard": "Панель",
    "nav.admin": "Админ",

    "hero.title": "Ваш путь между",
    "hero.titleHighlight": "Китаем и Кыргызстаном",
    "hero.subtitle": "Надёжная грузовая логистика с персональными кодами для отслеживания и доставки.",
    "hero.cta": "Получить личный код",
    "hero.learnMore": "Узнать больше",

    "signup.title": "Создайте аккаунт",
    "signup.step1": "ФИО",
    "signup.step2": "Номер WhatsApp",
    "signup.step3": "Ваш город",
    "signup.namePlaceholder": "Введите полное имя",
    "signup.phonePlaceholder": "Введите номер WhatsApp",
    "signup.cityPlaceholder": "Выберите город",
    "signup.next": "Далее",
    "signup.back": "Назад",
    "signup.submit": "Получить код",
    "signup.success": "Регистрация завершена!",
    "signup.yourCode": "Ваш личный код",

    "dashboard.title": "Ваша панель",
    "dashboard.idCard": "Удостоверение",
    "dashboard.code": "Личный код",
    "dashboard.copyCode": "Копировать код",
    "dashboard.copied": "Скопировано!",
    "dashboard.warehouse": "Адрес склада в Китае",
    "dashboard.copyAddress": "Копировать адрес",
    "dashboard.tracking": "Отслеживание заказов",
    "dashboard.trackingDesc": "Скоро — отслеживайте посылки в реальном времени.",
    "dashboard.contactManager": "Связаться с менеджером",
    "dashboard.logout": "Выйти",

    "admin.login": "Вход для админа",
    "admin.email": "Эл. почта",
    "admin.password": "Пароль",
    "admin.signIn": "Войти",
    "admin.invalidCreds": "Неверные данные",
    "admin.clients": "Клиенты",
    "admin.settings": "Настройки",
    "admin.search": "Поиск по имени, коду или телефону...",
    "admin.addClient": "Добавить клиента",
    "admin.name": "Имя",
    "admin.phone": "Телефон",
    "admin.location": "Город",
    "admin.identityCode": "Код",
    "admin.date": "Дата",
    "admin.actions": "Действия",
    "admin.edit": "Изменить",
    "admin.delete": "Удалить",
    "admin.save": "Сохранить",
    "admin.cancel": "Отмена",
    "admin.logout": "Выйти",
    "admin.totalClients": "Всего клиентов",
    "admin.deleteConfirm": "Вы уверены?",

    "city.bishkek": "Бишкек",
    "city.osh": "Ош",
    "city.jalalabad": "Джалал-Абад",
    "city.karakol": "Каракол",
    "city.tokmok": "Токмок",
    "city.naryn": "Нарын",
    "city.batken": "Баткен",
    "city.talas": "Талас",
  },
  kg: {
    "nav.home": "Башкы бет",
    "nav.signup": "Каттоо",
    "nav.dashboard": "Панель",
    "nav.admin": "Админ",

    "hero.title": "Сиздин жолуңуз",
    "hero.titleHighlight": "Кытай жана Кыргызстан",
    "hero.subtitle": "Жеке коддор менен ишенимдүү жүк логистикасы, жеткирүү жана көзөмөлдөө.",
    "hero.cta": "Жеке код алуу",
    "hero.learnMore": "Көбүрөөк билүү",

    "signup.title": "Аккаунт түзүү",
    "signup.step1": "Толук аты-жөнү",
    "signup.step2": "WhatsApp номери",
    "signup.step3": "Шаарыңыз",
    "signup.namePlaceholder": "Толук атыңызды жазыңыз",
    "signup.phonePlaceholder": "WhatsApp номериңизди жазыңыз",
    "signup.cityPlaceholder": "Шаарыңызды тандаңыз",
    "signup.next": "Уландысы",
    "signup.back": "Артка",
    "signup.submit": "Код алуу",
    "signup.success": "Каттоо аяктады!",
    "signup.yourCode": "Сиздин жеке код",

    "dashboard.title": "Сиздин панель",
    "dashboard.idCard": "Идентификация",
    "dashboard.code": "Жеке код",
    "dashboard.copyCode": "Кодду көчүрүү",
    "dashboard.copied": "Көчүрүлдү!",
    "dashboard.warehouse": "Кытайдагы кампа дареги",
    "dashboard.copyAddress": "Даректи көчүрүү",
    "dashboard.tracking": "Заказды көзөмөлдөө",
    "dashboard.trackingDesc": "Жакында — посылкаларыңызды реалдуу убакытта көзөмөлдөңүз.",
    "dashboard.contactManager": "Менеджер менен байланыш",
    "dashboard.logout": "Чыгуу",

    "admin.login": "Админ кирүү",
    "admin.email": "Электрондук почта",
    "admin.password": "Сыр сөз",
    "admin.signIn": "Кирүү",
    "admin.invalidCreds": "Туура эмес маалыматтар",
    "admin.clients": "Кардарлар",
    "admin.settings": "Орнотуулар",
    "admin.search": "Аты, коду же телефону боюнча издөө...",
    "admin.addClient": "Жаңы кардар кошуу",
    "admin.name": "Аты",
    "admin.phone": "Телефон",
    "admin.location": "Шаар",
    "admin.identityCode": "Код",
    "admin.date": "Дата",
    "admin.actions": "Аракеттер",
    "admin.edit": "Өзгөртүү",
    "admin.delete": "Өчүрүү",
    "admin.save": "Сактоо",
    "admin.cancel": "Жокко чыгаруу",
    "admin.logout": "Чыгуу",
    "admin.totalClients": "Бардык кардарлар",
    "admin.deleteConfirm": "Ишенесизби?",

    "city.bishkek": "Бишкек",
    "city.osh": "Ош",
    "city.jalalabad": "Жалал-Абад",
    "city.karakol": "Каракол",
    "city.tokmok": "Токмок",
    "city.naryn": "Нарын",
    "city.batken": "Баткен",
    "city.talas": "Талас",
  },
} as const;

type TranslationKey = keyof typeof translations.en;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("cargolink-lang");
    return (saved as Language) || "ru";
  });

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("cargolink-lang", lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useTranslation must be used within I18nProvider");
  return context;
}
