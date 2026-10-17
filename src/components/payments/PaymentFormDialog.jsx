import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import LoadingState from "@/components/common/LoadingState"
import ErrorState from "@/components/common/ErrorState"
import PaymentForm from "./PaymentForm"
import { getStudents } from "@/api/students"
import { getGroups } from "@/api/groups"
import { createPayment, getPayments } from "@/api/payments"

// defaultStudentId — talaba profilidan ochilganda talaba oldindan tanlangan bo'ladi
function PaymentFormDialog({ open, onClose, defaultStudentId, onSaved }) {
  const [students, setStudents] = useState([])
  const [groups, setGroups] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function loadData() {
    setLoading(true)
    setError("")
    try {
      const [studentsData, groupsData, paymentsData] = await Promise.all([getStudents(), getGroups(), getPayments()])
      setStudents(studentsData)
      setGroups(groupsData)
      setPayments(paymentsData)
    } catch {
      setError("Ma'lumotlarni yuklab bo'lmadi")
    } finally {
      setLoading(false)
    }
  }

  // Oyna har ochilganda yangi ma'lumot olamiz
  useEffect(() => {
    if (open) loadData()
  }, [open])

  // Talaba oldindan tanlangan bo'lsa — summa ham uning guruh narxi bo'ladi
  let defaultValues
  if (defaultStudentId) {
    const student = students.find((s) => s.id === defaultStudentId)
    const group = student ? groups.find((g) => g.id === student.groupId) : null
    defaultValues = { studentId: String(defaultStudentId), amount: group ? group.monthlyPrice : undefined }
  }

  async function handleSubmit(values) {
    setIsSubmitting(true)
    try {
      await createPayment({ ...values, studentId: Number(values.studentId) })
      toast.success("To'lov qo'shildi")
      onSaved()
    } catch {
      toast.error("To'lovni saqlashda xatolik yuz berdi")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>To'lov qo'shish</DialogTitle>
        </DialogHeader>
        {loading ? (
          <LoadingState rows={4} />
        ) : error ? (
          <ErrorState message={error} onRetry={loadData} />
        ) : (
          <PaymentForm
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            students={students}
            groups={groups}
            payments={payments}
            onCancel={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

PaymentFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  defaultStudentId: PropTypes.number,
  onSaved: PropTypes.func.isRequired,
}

export default PaymentFormDialog
