import api from "./axios"

export async function getGroups(params) {
  const res = await api.get("/groups", { params })
  return res.data
}

export async function getGroup(id) {
  const res = await api.get(`/groups/${id}`)
  return res.data
}

export async function createGroup(data) {
  const res = await api.post("/groups", data)
  return res.data
}

export async function updateGroup(id, data) {
  const res = await api.patch(`/groups/${id}`, data)
  return res.data
}

export async function deleteGroup(id) {
  await api.delete(`/groups/${id}`)
}
