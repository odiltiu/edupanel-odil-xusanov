// 800000 -> "800 000 so'm"
export function formatMoney(amount) {
  return Number(amount).toLocaleString("ru-RU") + " so'm"
}

// "2026-10-16" -> "16.10.2026"
export function formatDate(date) {
  if (!date) return "—"
  const [year, month, day] = date.split("-")
  return `${day}.${month}.${year}`
}

// "+998901234567" -> "+998 90 123 45 67"
export function formatPhone(phone) {
  if (!phone || phone.length !== 13) return phone
  return `${phone.slice(0, 4)} ${phone.slice(4, 6)} ${phone.slice(6, 9)} ${phone.slice(9, 11)} ${phone.slice(11)}`
}
