import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/common/PageHeader"
import Pagination from "@/components/common/Pagination"
import LoadingState from "@/components/common/LoadingState"
import ErrorState from "@/components/common/ErrorState"
import EmptyState from "@/components/common/EmptyState"
import StudentFilters from "@/components/students/StudentFilters"
import StudentsTable from "@/components/students/StudentsTable"
import StudentFormDialog from "@/components/students/StudentFormDialog"
import DeleteStudentDialog from "@/components/students/DeleteStudentDialog"
import { getStudentsPage } from "@/api/students"
import { getGroups } from "@/api/groups"
import { getPayments } from "@/api/payments"
import { getCurrentMonth } from "@/utils/date"

const LIMIT = 10 // har sahifada 10 ta talaba

function Students() {
  const [students, setStudents] = useState([])
  const [total, setTotal] = useState(0)
  const [groups, setGroups] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("") // inputdagi matn (har harfda o'zgaradi)
  const [debouncedSearch, setDebouncedSearch] = useState("") // 500 ms kutilgandan keyingi matn
  const [groupId, setGroupId] = useState("all")
  const [status, setStatus] = useState("all")
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null) // tahrirlanayotgan talaba (null — yangi)
  const [deleting, setDeleting] = useState(null) // o'chirilayotgan talaba (null — oyna yopiq)

  // DEBOUNCE: foydalanuvchi yozishni to'xtatgandan 500 ms keyin qidiramiz
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 500)
    // Cleanup: 500 ms o'tmasdan yana harf yozilsa — eski taymer bekor qilinadi
    return () => clearTimeout(timer)
  }, [search])

  async function loadStudents() {
    setLoading(true)
    setError("")
    try {
      const [pageData, groupsData, paymentsData] = await Promise.all([
        getStudentsPage({
          q: debouncedSearch || undefined, // bo'sh bo'lsa URL'ga qo'shilmaydi
          groupId: groupId === "all" ? undefined : groupId,
          status: status === "all" ? undefined : status,
          _page: page,
          _limit: LIMIT,
        }),
        getGroups(),
        getPayments({ month: getCurrentMonth() }),
      ])
      setStudents(pageData.data)
      setTotal(pageData.total)
      setGroups(groupsData)
      setPayments(paymentsData)
    } catch {
      setError("Talabalarni yuklab bo'lmadi")
    } finally {
      setLoading(false)
    }
  }

  // Sahifa, qidiruv yoki filtr o'zgarsa — ro'yxat qayta yuklanadi
  useEffect(() => {
    loadStudents()
  }, [page, debouncedSearch, groupId, status])

  // student berilmasa — yangi talaba qo'shish, berilsa — tahrirlash
  function openForm(student = null) {
    setEditing(student)
    setFormOpen(true)
  }

  function handleSaved() {
    setFormOpen(false)
    loadStudents() // ro'yxatni serverdan qayta olamiz
  }

  return (
    <div>
      <PageHeader title="Talabalar" description={`Jami: ${total} ta`}>
        <Button onClick={() => openForm()}>
          <Plus className="size-4" /> Talaba qo'shish
        </Button>
      </PageHeader>

      <StudentFilters
        search={search}
        onSearchChange={setSearch}
        groupId={groupId}
        onGroupChange={(value) => {
          // Filtr o'zgarsa — 1-sahifaga qaytamiz
          setGroupId(value)
          setPage(1)
        }}
        status={status}
        onStatusChange={(value) => {
          setStatus(value)
          setPage(1)
        }}
        groups={groups}
      />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={loadStudents} />
      ) : students.length === 0 ? (
        <EmptyState message="Talabalar topilmadi" />
      ) : (
        <>
          <StudentsTable
            students={students}
            groups={groups}
            payments={payments}
            startIndex={(page - 1) * LIMIT + 1}
            onEdit={openForm}
            onDelete={setDeleting}
          />
          <Pagination page={page} total={total} limit={LIMIT} onChange={setPage} />
        </>
      )}

      <StudentFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        student={editing}
        groups={groups}
        onSaved={handleSaved}
      />

      <DeleteStudentDialog student={deleting} onClose={() => setDeleting(null)} onDeleted={loadStudents} />
    </div>
  )
}

export default Students
