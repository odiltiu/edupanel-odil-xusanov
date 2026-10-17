import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, CheckCircle2, Users, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/common/PageHeader"
import StatCard from "@/components/common/StatCard"
import LoadingState from "@/components/common/LoadingState"
import ErrorState from "@/components/common/ErrorState"
import EmptyState from "@/components/common/EmptyState"
import StatusBadge from "@/components/students/StatusBadge"
import GroupStudentsTable from "@/components/groups/GroupStudentsTable"
import { getGroup } from "@/api/groups"
import { getStudents } from "@/api/students"
import { getPayments } from "@/api/payments"
import { calcDebt } from "@/utils/debt"
import { getCurrentMonth } from "@/utils/date"
import { formatDate, formatMoney } from "@/utils/format"

function GroupDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [group, setGroup] = useState(null)
  const [students, setStudents] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [notFound, setNotFound] = useState(false)

  async function loadData() {
    setLoading(true)
    setError("")
    setNotFound(false)
    try {
      const [groupData, studentsData, paymentsData] = await Promise.all([
        getGroup(id),
        getStudents({ groupId: id }),
        getPayments({ month: getCurrentMonth() }),
      ])
      setGroup(groupData)
      setStudents(studentsData)
      setPayments(paymentsData)
    } catch (err) {
      if (err.response && err.response.status === 404) setNotFound(true)
      else setError("Guruh ma'lumotlarini yuklab bo'lmadi")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [id])

  if (loading) return <LoadingState rows={6} />
  if (error) return <ErrorState message={error} onRetry={loadData} />
  if (notFound) {
    return (
      <div className="space-y-4 text-center">
        <EmptyState message="Guruh topilmadi" />
        <Button variant="outline" onClick={() => navigate("/dashboard/groups")}>
          <ArrowLeft className="size-4" /> Guruhlarga qaytish
        </Button>
      </div>
    )
  }

  // Hisob-kitoblar faqat faol talabalar bo'yicha
  const activeStudents = students.filter((s) => s.status === "active")
  const expectedIncome = activeStudents.length * group.monthlyPrice
  const paidCount = activeStudents.filter((s) => calcDebt(s, group, payments) === 0).length
  const unpaidCount = activeStudents.length - paidCount

  return (
    <div className="space-y-6">
      <PageHeader title={`${group.name} — ${group.course}`}>
        <Button variant="outline" onClick={() => navigate("/dashboard/groups")}>
          <ArrowLeft className="size-4" /> Orqaga
        </Button>
      </PageHeader>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border bg-background p-4 text-sm">
        <StatusBadge status={group.status} />
        <span>O'qituvchi: <b>{group.teacher}</b></span>
        <span>{group.days === "toq" ? "Toq kunlar" : "Juft kunlar"}, {group.time}</span>
        <span>Narx: <b>{formatMoney(group.monthlyPrice)}</b></span>
        <span>Boshlangan: {formatDate(group.startDate)}</span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Faol talabalar" value={activeStudents.length} hint={`Jami: ${students.length} ta`} icon={Users} />
        <StatCard title="Kutilayotgan oylik tushum" value={formatMoney(expectedIncome)} icon={Wallet} variant="success" />
        <StatCard
          title="Joriy oyda to'laganlar"
          value={`${paidCount} / ${activeStudents.length}`}
          hint={`To'lamaganlar: ${unpaidCount} ta`}
          icon={CheckCircle2}
          variant={unpaidCount > 0 ? "warning" : "success"}
        />
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Guruh talabalari</h3>
        {students.length === 0 ? (
          <EmptyState message="Bu guruhda hali talabalar yo'q" />
        ) : (
          <GroupStudentsTable students={students} group={group} payments={payments} />
        )}
      </div>
    </div>
  )
}

export default GroupDetail
