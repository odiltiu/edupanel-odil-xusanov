import { z } from "zod"

export const paymentSchema = z.object({
  studentId: z.string().min(1, "Talabani tanlang"),
  // valueAsNumber bilan input raqam qaytaradi; bo'sh bo'lsa NaN — "error" xabari chiqadi
  amount: z.number({ error: "Summani kiriting" }).min(1000, "Summa kamida 1 000 so'm bo'lsin"),
  month: z.string().min(1, "Oyni tanlang"),
  method: z.enum(["naqd", "karta", "click"], { error: "To'lov usulini tanlang" }),
  paidAt: z.string().min(1, "To'lov sanasini kiriting"),
})
