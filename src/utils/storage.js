// Kirgan admin ma'lumotini localStorage'da saqlash
const ADMIN_KEY = "edupanel_admin"

export function getSavedAdmin() {
  const data = localStorage.getItem(ADMIN_KEY)
  return data ? JSON.parse(data) : null
}

export function saveAdmin(admin) {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin))
}

export function removeAdmin() {
  localStorage.removeItem(ADMIN_KEY)
}
