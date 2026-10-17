import { useEffect, useState } from "react"
import { AlertCircle, UsersRound, Users, Wallet } from "lucide-react"
import StatCard from "@/components/common/StatCard"
import LoadingState from "@/components/common/LoadingState"
import ErrorState from "@/components/common/ErrorState"
import RecentPayments from "@/components/dashboard/RecentPayments"
import TopDebtors from "@/components/dashboard/TopDebtors"
import IncomeChart from "@/components/dashboard/IncomeChart"
import { getStudents } from "@/api/students"
import { getGroups } from "@/api/groups"
import { getPayments } from "@/api/payments"
import { calcDebt } from "@/utils/debt"
import { getCurrentMonth } from "@/utils/date"
import { formatMoney } from "@/utils/format"

function Dashboard() {
  const [students, setStudents] = useState([])
  const [groups, setGroups] = useState([])
  const [payments, setPayments] = useState([])
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  async function loadData() {
    setLoading(true)
    setError("")
    try {
      // 4 ta so'rov bir vaqtda yuboriladi, hammasi kelguncha kutamiz
      const [studentsData, groupsData, paymentsData, recentData] = await Promise.all([
        getStudents(),
        getGroups(),
        getPayments(),
        getPayments({ _expand: "student", _sort: "paidAt", _order: "desc", _limit: 5 }),
      ])
      setStudents(studentsData)
      setGroups(groupsData)
      setPayments(paymentsData)
      setRecent(recentData)
    } catch {
      setError("Ma'lumotlarni yuklab bo'lmadi")
    } finally {
      setLoading(false)
    }
  }

  // Sahifa ochilganda bir marta yuklaymiz
  useEffect(() => {
    loadData()
  }, [])

  if (loading) return <LoadingState rows={6} />
  if (error) return <ErrorState message={error} onRetry={loadData} />

  const month = getCurrentMonth()

  const activeStudents = students.filter((s) => s.status === "active")
  const activeGroups = groups.filter((g) => g.status === "active")

  // Joriy oy tushumi — shu oyda (paidAt) qabul qilingan to'lovlar yig'indisi
  const monthIncome = payments
    .filter((p) => p.paidAt.startsWith(month))
    .reduce((sum, p) => sum + p.amount, 0)

  // Har bir faol talabaning qarzini hisoblaymiz, qarzi borlarini qoldiramiz
  const debtors = activeStudents
    .map((student) => {
      const group = groups.find((g) => g.id === student.groupId)
      return { student, group, debt: calcDebt(student, group, payments) }
    })
    .filter((item) => item.debt > 0)
    .sort((a, b) => b.debt - a.debt)

  const totalDebt = debtors.reduce((sum, item) => sum + item.debt, 0)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Faol talabalar" value={activeStudents.length} icon={Users} />
        <StatCard title="Faol guruhlar" value={activeGroups.length} icon={UsersRound} variant="warning" />
        <StatCard title="Joriy oy tushumi" value={formatMoney(monthIncome)} icon={Wallet} variant="success" />
        <StatCard
          title="Qarzdorlar"
          value={debtors.length}
          hint={`Jami qarz: ${formatMoney(totalDebt)}`}
          icon={AlertCircle}
          variant="danger"
        />
      </div>

      <IncomeChart payments={payments} />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentPayments payments={recent} />
        <TopDebtors debtors={debtors.slice(0, 5)} />
      </div>
    </div>
  )
}

export default Dashboard
