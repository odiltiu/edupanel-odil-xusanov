import { CalendarCheck, LayoutDashboard, Settings, Users, UsersRound, Wallet } from "lucide-react"

// Sidebar havolalari — Sidebar va Topbar (sahifa nomi) ikkalasi shu ro'yxatdan foydalanadi
export const navLinks = [
  { to: "/dashboard", label: "Bosh panel", icon: LayoutDashboard },
  { to: "/dashboard/students", label: "Talabalar", icon: Users },
  { to: "/dashboard/groups", label: "Guruhlar", icon: UsersRound },
  { to: "/dashboard/payments", label: "To'lovlar", icon: Wallet },
  { to: "/dashboard/attendance", label: "Davomat", icon: CalendarCheck },
  { to: "/dashboard/settings", label: "Sozlamalar", icon: Settings },
]

// URL bo'yicha sahifa nomini topadi
export function getPageTitle(pathname) {
  if (pathname.startsWith("/dashboard/students/")) return "Talaba profili"
  if (pathname.startsWith("/dashboard/groups/")) return "Guruh sahifasi"
  const link = navLinks.find((item) => item.to === pathname)
  return link ? link.label : "EduPanel"
}
