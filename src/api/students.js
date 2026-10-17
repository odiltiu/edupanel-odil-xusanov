import api from "./axios"

// params misol: { q: "ali", groupId: 2, status: "active", _page: 1, _limit: 10 }
// Qiymati undefined bo'lgan parametrni axios URL'ga qo'shmaydi
export async function getStudents(params) {
  const res = await api.get("/students", { params })
  return res.data
}

// Sahifalash uchun: ro'yxat + umumiy son (X-Total-Count sarlavhasidan)
export async function getStudentsPage(params) {
  const res = await api.get("/students", { params })
  return {
    data: res.data,
    total: Number(res.headers["x-total-count"]),
  }
}

// Talaba + uning guruhi + to'lovlari bitta so'rovda
export async function getStudent(id) {
  const res = await api.get(`/students/${id}`, {
    params: { _expand: "group", _embed: "payments" },
  })
  return res.data
}

export async function createStudent(data) {
  const res = await api.post("/students", data)
  return res.data
}

export async function updateStudent(id, data) {
  const res = await api.patch(`/students/${id}`, data)
  return res.data
}

export async function deleteStudent(id) {
  await api.delete(`/students/${id}`)
}
