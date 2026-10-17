import api from "./axios"

// Login: shunday admin bo'lsa massivda 1 ta element qaytadi, bo'lmasa bo'sh massiv
export async function login(username, password) {
  const res = await api.get("/admins", { params: { username, password } })
  return res.data
}

export async function getAdmin(id) {
  const res = await api.get(`/admins/${id}`)
  return res.data
}

export async function updateAdmin(id, data) {
  const res = await api.patch(`/admins/${id}`, data)
  return res.data
}
