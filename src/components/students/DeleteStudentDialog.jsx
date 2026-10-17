import { useState } from "react"
import PropTypes from "prop-types"
import { toast } from "sonner"
import ConfirmDialog from "@/components/common/ConfirmDialog"
import { deleteStudent } from "@/api/students"

// student = null bo'lsa oyna yopiq
function DeleteStudentDialog({ student, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    try {
      await deleteStudent(student.id)
      toast.success("Talaba o'chirildi")
      onDeleted()
    } catch {
      toast.error("O'chirishda xatolik yuz berdi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ConfirmDialog
      open={student !== null}
      title="Talabani o'chirish"
      description={student ? `${student.firstName} ${student.lastName} o'chirilsinmi? Bu amalni qaytarib bo'lmaydi.` : ""}
      confirmText="O'chirish"
      loading={loading}
      onConfirm={handleDelete}
      onCancel={onClose}
    />
  )
}

DeleteStudentDialog.propTypes = {
  student: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
}

export default DeleteStudentDialog
