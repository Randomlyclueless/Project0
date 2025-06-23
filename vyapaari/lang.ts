// lang.ts
export const translations = {
  en: {
    hiVyapaari: "Hi Vyapaari 👋",
    todaysIncome: "💰 Today's Income",
    recentTransactions: "🧾 Recent Transactions",
    test: "Test",
  },
  hi: {
    hiVyapaari: "नमस्ते व्यापारी 👋",
    todaysIncome: "💰 आज की आय",
    recentTransactions: "🧾 हाल की लेन-देन",
    test: "परीक्षण",
  },
  mr: {
    hiVyapaari: "नमस्कार व्यापारी 👋",
    todaysIncome: "💰 आजचे उत्पन्न",
    recentTransactions: "🧾 अलीकडील व्यवहार",
    test: "चाचणी",
  },
};

export type Language = keyof typeof translations;
