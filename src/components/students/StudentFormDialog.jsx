import { useState } from "react"
import PropTypes from "prop-types"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import StudentForm from "./StudentForm"
import { createStudent, updateStudent } from "@/api/students"
import { getToday } from "@/utils/date"

// student = null bo'lsa — yangi talaba, aks holda — tahrirlash
function StudentFormDialog({ open, onClose, student, groups, onSaved }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Tahrirlashda formaga talabaning hozirgi qiymatlari beriladi
  const defaultValues = student
    ? {
        firstName: student.firstName,
        lastName: student.lastName,
        phone: student.phone,
        birthDate: student.birthDate,
        groupId: String(student.groupId),
        status: student.status,
        note: student.note || "",
      }
    : undefined

  async function handleSubmit(values) {
    setIsSubmitting(true)
    const data = { ...values, groupId: Number(values.groupId) }
    try {
      if (student) {
        await updateStudent(student.id, data) // PATCH
        toast.success("Talaba ma'lumotlari yangilandi")
      } else {
        await createStudent({ ...data, joinedAt: getToday() }) // POST
        toast.success("Yangi talaba qo'shildi")
      }
      onSaved()
    } catch {
      toast.error("Saqlashda xatolik yuz berdi")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{student ? "Talabani tahrirlash" : "Yangi talaba"}</DialogTitle>
        </DialogHeader>
        <StudentForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          groups={groups}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}

StudentFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  student: PropTypes.object,
  groups: PropTypes.array.isRequired,
  onSaved: PropTypes.func.isRequired,
}

export default StudentFormDialog
