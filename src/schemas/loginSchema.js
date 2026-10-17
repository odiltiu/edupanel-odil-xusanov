import { z } from "zod"

export const loginSchema = z.object({
  username: z.string().min(3, "Login kamida 3 ta belgidan iborat bo'lsin"),
  password: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lsin"),
})
