import { getCurrentMonth } from "./date"

// Talaba shu oy uchun jami qancha to'lagan
export function getPaidForMonth(payments, studentId, month) {
  return payments
    .filter((p) => p.studentId === studentId && p.month === month)
    .reduce((sum, p) => sum + p.amount, 0)
}

// QARZ QOIDASI (butun loyiha bo'ylab shu funksiya ishlatiladi):
// faqat faol talaba uchun: qarz = guruh narxi − shu oyda to'lagani
// Natija 0 dan kichik bo'lsa (ortiqcha to'lagan) — qarz 0
export function calcDebt(student, group, payments, month = getCurrentMonth()) {
  if (!student || !group || student.status !== "active") return 0
  const paid = getPaidForMonth(payments, student.id, month)
  const debt = group.monthlyPrice - paid
  return debt > 0 ? debt : 0
}
