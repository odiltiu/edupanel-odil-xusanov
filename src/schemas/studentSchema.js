import { z } from "zod"
import { getAge } from "@/utils/date"

export const studentSchema = z.object({
  firstName: z.string().trim().min(2, "Ism kamida 2 ta harfdan iborat bo'lsin"),
  lastName: z.string().trim().min(2, "Familiya kamida 2 ta harfdan iborat bo'lsin"),
  // ^ — boshi, \d{9} — 9 ta raqam, $ — oxiri
  phone: z.string().regex(/^\+998\d{9}$/, "Telefon +998 va 9 ta raqam bo'lsin (masalan +998901234567)"),
  birthDate: z
    .string()
    .min(1, "Tug'ilgan sanani kiriting")
    .refine((value) => {
      const age = getAge(value)
      return age >= 10 && age <= 60
    }, "Yoshi 10 dan 60 gacha bo'lishi kerak"),
  // <select> qiymati doim matn ("1", "2") — saqlashda Number() ga aylantiramiz
  groupId: z.string().min(1, "Guruhni tanlang"),
  status: z.string().min(1, "Holatni tanlang"),
  note: z.string(),
})
