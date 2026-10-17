import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Pencil, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/common/PageHeader"
import LoadingState from "@/components/common/LoadingState"
import ErrorState from "@/components/common/ErrorState"
import EmptyState from "@/components/common/EmptyState"
import StudentInfoCards from "@/components/students/StudentInfoCards"
import StudentPayments from "@/components/students/StudentPayments"
import StudentFormDialog from "@/components/students/StudentFormDialog"
import PaymentFormDialog from "@/components/payments/PaymentFormDialog"
import { getStudent } from "@/api/students"
import { getGroups } from "@/api/groups"
import { getAttendance } from "@/api/attendance"
import { calcDebt } from "@/utils/debt"
import { calcStudentAttendance } from "@/utils/attendance"

function StudentDetail() {
  const { id } = useParams() // URL'dagi :id — masalan "3"
  const navigate = useNavigate()

  const [student, setStudent] = useState(null)
  const [groups, setGroups] = useState([])
  const [attendance, setAttendance] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [notFound, setNotFound] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)

  async function loadData() {
    setLoading(true)
    setError("")
    setNotFound(false)
    try {
      // Bitta so'rovda: talaba + guruhi (_expand) + to'lovlari (_embed)
      const studentData = await getStudent(id)
      const [groupsData, attendanceData] = await Promise.all([
        getGroups(),
        getAttendance({ groupId: studentData.groupId }),
      ])
      setStudent(studentData)
      setGroups(groupsData)
      setAttendance(attendanceData)
    } catch (err) {
      // json-server mavjud bo'lmagan id uchun 404 qaytaradi
      if (err.response && err.response.status === 404) {
        setNotFound(true)
      } else {
        setError("Talaba ma'lumotlarini yuklab bo'lmadi")
      }
    } finally {
      setLoading(false)
    }
  }

  // id o'zgarsa (boshqa talabaga o'tilsa) — qayta yuklaymiz
  useEffect(() => {
    loadData()
  }, [id])

  if (loading) return <LoadingState rows={6} />
  if (error) return <ErrorState message={error} onRetry={loadData} />
  if (notFound) {
    return (
      <div className="space-y-4">
        <EmptyState message="Talaba topilmadi" />
        <div className="text-center">
          <Button variant="outline" onClick={() => navigate("/dashboard/students")}>
            <ArrowLeft className="size-4" /> Ro'yxatga qaytish
          </Button>
        </div>
      </div>
    )
  }

  const debt = calcDebt(student, student.group, student.payments)
  const attendancePercent = calcStudentAttendance(attendance, student.id)

  return (
    <div className="space-y-6">
      <PageHeader title={`${student.firstName} ${student.lastName}`}>
        <Button variant="outline" onClick={() => navigate("/dashboard/students")}>
          <ArrowLeft className="size-4" /> Orqaga
        </Button>
        <Button variant="outline" onClick={() => setEditOpen(true)}>
          <Pencil className="size-4" /> Tahrirlash
        </Button>
        <Button onClick={() => setPaymentOpen(true)}>
          <Plus className="size-4" /> To'lov qo'shish
        </Button>
      </PageHeader>

      <StudentInfoCards student={student} attendancePercent={attendancePercent} />
      <StudentPayments payments={student.payments} debt={debt} />

      <StudentFormDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        student={student}
        groups={groups}
        onSaved={() => {
          setEditOpen(false)
          loadData()
        }}
      />
      <PaymentFormDialog
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        defaultStudentId={student.id}
        onSaved={() => {
          setPaymentOpen(false)
          loadData()
        }}
      />
    </div>
  )
}

export default StudentDetail
