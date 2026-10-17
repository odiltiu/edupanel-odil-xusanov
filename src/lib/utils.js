import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// shadcn komponentlari ishlatadigan yordamchi: class nomlarini birlashtiradi
// va Tailwind'dagi qarama-qarshi class'larni (masalan p-2 va p-4) to'g'rilaydi.
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
