import axios from "axios"

// Bitta umumiy axios instansiyasi — barcha so'rovlar shu orqali ketadi.
// Server manzili .env faylidagi VITE_API_URL dan olinadi (masalan, internetga chiqarilganda),
// bo'lmasa lokal json-server ishlatiladi.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
  // Server javob bermasa, sahifa cheksiz "yuklanmoqda" holatida qolib ketmasin
  timeout: 15000,
})

export default api
