import { useEffect, useState } from "react"
import { Download, Plus } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/common/PageHeader"
import ConfirmDialog from "@/components/common/ConfirmDialog"
import LoadingState from "@/components/common/LoadingState"
import ErrorState from "@/components/common/ErrorState"
import EmptyState from "@/components/common/EmptyState"
import PaymentFilters from "@/components/payments/PaymentFilters"
import PaymentsTable from "@/components/payments/PaymentsTable"
import PaymentFormDialog from "@/components/payments/PaymentFormDialog"
import { deletePayment, getPayments } from "@/api/payments"
import { getGroups } from "@/api/groups"
import { downloadCsv } from "@/utils/csv"
import { formatDate } from "@/utils/format"

function Payments() {
  const [payments, setPayments] = useState([])
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [month, setMonth] = useState("") // "" — barcha oylar
  const [method, setMethod] = useState("all")
  const [formOpen, setFormOpen] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  async function loadData() {
    setLoading(true)
    setError("")
    try {
      const [paymentsData, groupsData] = await Promise.all([
        getPayments({
          _expand: "student", // har to'lovga talabani qo'shib beradi
          _sort: "paidAt",
          _order: "desc", // yangisi tepada
          month: month || undefined,
          method: method === "all" ? undefined : method,
        }),
        getGroups(),
      ])
      setPayments(paymentsData)
      setGroups(groupsData)
    } catch {
      setError("To'lovlarni yuklab bo'lmadi")
    } finally {
      setLoading(false)
    }
  }

  // Filtr o'zgarsa — qayta yuklaymiz
  useEffect(() => {
    loadData()
  }, [month, method])

  async function handleDelete() {
    setDeleteLoading(true)
    try {
      await deletePayment(deleting.id)
      toast.success("To'lov o'chirildi")
      setDeleting(null)
      loadData()
    } catch {
      toast.error("O'chirishda xatolik yuz berdi")
    } finally {
      setDeleteLoading(false)
    }
  }

  // BONUS: jadvaldagi (filtrlangan) to'lovlarni CSV faylga yuklab olish
  function handleExport() {
    const rows = [["Talaba", "Guruh", "Summa", "Oy", "Usul", "Sana"]]
    for (const p of payments) {
      const group = p.student ? groups.find((g) => g.id === p.student.groupId) : null
      rows.push([
        p.student ? `${p.student.firstName} ${p.student.lastName}` : "—",
        group ? group.name : "—",
        p.amount,
        p.month,
        p.method,
        formatDate(p.paidAt),
      ])
    }
    downloadCsv(`tolovlar-${month || "hammasi"}.csv`, rows)
  }

  return (
    <div>
      <PageHeader title="To'lovlar">
        <Button variant="outline" onClick={handleExport} disabled={payments.length === 0}>
          <Download className="size-4" /> CSV
        </Button>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="size-4" /> To'lov qo'shish
        </Button>
      </PageHeader>

      <PaymentFilters month={month} onMonthChange={setMonth} method={method} onMethodChange={setMethod} />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={loadData} />
      ) : payments.length === 0 ? (
        <EmptyState message="To'lovlar topilmadi" />
      ) : (
        <PaymentsTable payments={payments} groups={groups} onDelete={setDeleting} />
      )}

      <PaymentFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSaved={() => {
          setFormOpen(false)
          loadData()
        }}
      />
      <ConfirmDialog
        open={deleting !== null}
        title="To'lovni o'chirish"
        description="Bu to'lov butunlay o'chiriladi. Davom etasizmi?"
        confirmText="O'chirish"
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  )
}

export default Payments
