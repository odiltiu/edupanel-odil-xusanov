import api from "./axios"

// params misol: { groupId: 1, date: "2026-10-14" }
export async function getAttendance(params) {
  const res = await api.get("/attendance", { params })
  return res.data
}

export async function createAttendance(data) {
  const res = await api.post("/attendance", data)
  return res.data
}

export async function updateAttendance(id, data) {
  const res = await api.patch(`/attendance/${id}`, data)
  return res.data
}
