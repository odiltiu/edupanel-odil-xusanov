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

const MONTH_NAMES = ["Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"]

// Oxirgi n oy (eskisidan yangisiga): [{ key: "2026-05", label: "May" }, ...]
export function getLastMonths(n) {
  const result = []
  const today = new Date()
  for (let i = n - 1; i >= 0; i--) {
    // new Date(yil, oy - i, 1) — i oy oldingi oyning 1-kuni (yil o'zi to'g'rilanadi)
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
    result.push({
      key: `${d.getFullYear()}-${twoDigits(d.getMonth() + 1)}`,
      label: MONTH_NAMES[d.getMonth()],
    })
  }
  return result
}
