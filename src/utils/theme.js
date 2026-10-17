const THEME_KEY = "edupanel_theme"

// Saqlangan mavzu ("light" yoki "dark"), yo'q bo'lsa — "light"
export function getSavedTheme() {
  return localStorage.getItem(THEME_KEY) || "light"
}

// <html> tegiga "dark" klassini qo'shadi yoki olib tashlaydi va localStorage'ga yozadi
export function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
  localStorage.setItem(THEME_KEY, theme)
}
