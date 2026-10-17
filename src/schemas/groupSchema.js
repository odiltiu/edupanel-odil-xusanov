import { z } from "zod"

export const groupSchema = z.object({
  // 2–4 ta katta lotin harfi, chiziqcha, raqamlar: FN-24, UX-7, REACT-1 emas (5 harf)
  name: z.string().regex(/^[A-Z]{2,4}-\d+$/, "Nom FN-24 ko'rinishida bo'lsin (2–4 katta harf, chiziqcha, raqam)"),
  course: z.string().trim().min(2, "Kurs nomini kiriting"),
  teacher: z.string().trim().min(3, "O'qituvchi ismi kamida 3 ta belgi"),
  days: z.enum(["toq", "juft"], { error: "Kunlarni tanlang" }),
  time: z.string().min(1, "Dars vaqtini kiriting"),
  monthlyPrice: z.number({ error: "Narxni kiriting" }).min(100000, "Narx kamida 100 000 so'm bo'lsin"),
  startDate: z.string().min(1, "Boshlanish sanasini kiriting"),
  status: z.enum(["active", "finished"], { error: "Holatni tanlang" }),
})
