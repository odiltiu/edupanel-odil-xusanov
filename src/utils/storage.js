// Kirgan admin ma'lumotini localStorage'da saqlash
const ADMIN_KEY = "edupanel_admin"

export function getSavedAdmin() {
  try {
    const data = localStorage.getItem(ADMIN_KEY)
    const admin = data ? JSON.parse(data) : null
    // Kerakli maydon bo'lmasa — yaroqsiz yozuv deb hisoblaymiz
    return admin && admin.id !== undefined ? admin : null
  } catch {
    // Buzilgan yozuv ilovani oq ekranga aylantirmasin: uni o'chirib, qaytadan kirishni so'raymiz
    localStorage.removeItem(ADMIN_KEY)
    return null
  }
}

export function saveAdmin(admin) {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin))
}

export function removeAdmin() {
  localStorage.removeItem(ADMIN_KEY)
}
