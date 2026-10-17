import { useState } from "react"
import PropTypes from "prop-types"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import GroupForm from "./GroupForm"
import { createGroup, updateGroup } from "@/api/groups"

// group = null bo'lsa — yangi guruh, aks holda — tahrirlash
function GroupFormDialog({ open, onClose, group, onSaved }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(values) {
    setIsSubmitting(true)
    try {
      if (group) {
        await updateGroup(group.id, values) // PATCH
        toast.success("Guruh yangilandi")
      } else {
        await createGroup(values) // POST
        toast.success("Yangi guruh qo'shildi")
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
          <DialogTitle>{group ? "Guruhni tahrirlash" : "Yangi guruh"}</DialogTitle>
        </DialogHeader>
        {/* Tahrirlashda guruhning o'zi defaultValues bo'ladi */}
        <GroupForm defaultValues={group || undefined} onSubmit={handleSubmit} isSubmitting={isSubmitting} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  )
}

GroupFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  group: PropTypes.object,
  onSaved: PropTypes.func.isRequired,
}

export default GroupFormDialog
