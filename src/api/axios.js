import axios from "axios"

// Bitta umumiy axios instansiyasi — barcha so'rovlar shu orqali ketadi
const api = axios.create({
  baseURL: "http://localhost:3001",
})

export default api
