import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/common/PageHeader"
import ConfirmDialog from "@/components/common/ConfirmDialog"
import LoadingState from "@/components/common/LoadingState"
import ErrorState from "@/components/common/ErrorState"
import EmptyState from "@/components/common/EmptyState"
import GroupCard from "@/components/groups/GroupCard"
import GroupFormDialog from "@/components/groups/GroupFormDialog"
import { deleteGroup, getGroups } from "@/api/groups"
import { getStudents } from "@/api/students"

const filters = [
  { value: "active", label: "Faol" },
  { value: "finished", label: "Tugagan" },
  { value: "all", label: "Barchasi" },
]

function Groups() {
  const [groups, setGroups] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState("all")
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  async function loadData() {
    setLoading(true)
    setError("")
    try {
      const [groupsData, studentsData] = await Promise.all([getGroups(), getStudents()])
      setGroups(groupsData)
      setStudents(studentsData)
    } catch {
      setError("Guruhlarni yuklab bo'lmadi")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Guruhdagi talabalar soni
  function countStudents(groupId) {
    return students.filter((s) => s.groupId === groupId).length
  }

  function openForm(group = null) {
    setEditing(group)
    setFormOpen(true)
  }

  // Talabasi bor guruhni o'chirishga ruxsat bermaymiz
  function askDelete(group) {
    if (countStudents(group.id) > 0) {
      toast.error("Avval talabalarni boshqa guruhga o'tkazing")
      return
    }
    setDeleting(group)
  }

  async function handleDelete() {
    setDeleteLoading(true)
    try {
      await deleteGroup(deleting.id)
      toast.success("Guruh o'chirildi")
      setDeleting(null)
      loadData()
    } catch {
      toast.error("O'chirishda xatolik yuz berdi")
    } finally {
      setDeleteLoading(false)
    }
  }

  const visibleGroups = filter === "all" ? groups : groups.filter((g) => g.status === filter)

  return (
    <div>
      <PageHeader title="Guruhlar" description={`Jami: ${groups.length} ta`}>
        <Button onClick={() => openForm()}>
          <Plus className="size-4" /> Guruh qo'shish
        </Button>
      </PageHeader>

      <div className="mb-4 flex gap-2">
        {filters.map((f) => (
          <Button key={f.value} size="sm" variant={filter === f.value ? "default" : "outline"} onClick={() => setFilter(f.value)}>
            {f.label}
          </Button>
        ))}
      </div>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={loadData} />
      ) : visibleGroups.length === 0 ? (
        <EmptyState message="Guruhlar topilmadi" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleGroups.map((group) => (
            <GroupCard key={group.id} group={group} studentCount={countStudents(group.id)} onEdit={openForm} onDelete={askDelete} />
          ))}
        </div>
      )}

      <GroupFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        group={editing}
        onSaved={() => {
          setFormOpen(false)
          loadData()
        }}
      />
      <ConfirmDialog
        open={deleting !== null}
        title="Guruhni o'chirish"
        description={deleting ? `${deleting.name} guruhi o'chirilsinmi?` : ""}
        confirmText="O'chirish"
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  )
}

export default Groups
