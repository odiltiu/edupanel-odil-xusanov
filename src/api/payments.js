import api from "./axios"

// params misol: { month: "2026-10", method: "karta", _expand: "student" }
export async function getPayments(params) {
  const res = await api.get("/payments", { params })
  return res.data
}

export async function createPayment(data) {
  const res = await api.post("/payments", data)
  return res.data
}

export async function deletePayment(id) {
  await api.delete(`/payments/${id}`)
}
