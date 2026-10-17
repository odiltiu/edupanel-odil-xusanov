// Sonni ikki xonali qiladi: 5 -> "05"
function twoDigits(n) {
  return String(n).padStart(2, "0")
}

// Bugungi sana: "2026-10-17"
export function getToday() {
  const d = new Date()
  return `${d.getFullYear()}-${twoDigits(d.getMonth() + 1)}-${twoDigits(d.getDate())}`
}

// Joriy oy: "2026-10"
export function getCurrentMonth() {
  return getToday().slice(0, 7)
}

// Tug'ilgan sanadan yosh: "2006-04-12" -> 20
export function getAge(birthDate) {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  // Bu yil tug'ilgan kuni hali kelmagan bo'lsa — 1 yil kam
  const hadBirthday =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate())
  if (!hadBirthday) age = age - 1
  return age
}
