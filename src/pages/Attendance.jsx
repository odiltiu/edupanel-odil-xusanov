import { useEffect, useState } from "react"
import { toast } from "sonner"
import PageHeader from "@/components/common/PageHeader"
import LoadingState from "@/components/common/LoadingState"
import ErrorState from "@/components/common/ErrorState"
import EmptyState from "@/components/common/EmptyState"
import AttendanceFilters from "@/components/attendance/AttendanceFilters"
import AttendanceToolbar from "@/components/attendance/AttendanceToolbar"
import AttendanceList from "@/components/attendance/AttendanceList"
import AttendanceHistory from "@/components/attendance/AttendanceHistory"
import { getGroups } from "@/api/groups"
import { getStudents } from "@/api/students"
import { createAttendance, getAttendance, updateAttendance } from "@/api/attendance"
import { getToday } from "@/utils/date"

function Attendance() {
  const [groups, setGroups] = useState([])
  const [groupId, setGroupId] = useState("")
  const [date, setDate] = useState(getToday())
  const [students, setStudents] = useState([])
  const [existing, setExisting] = useState(null) // shu guruh+sana uchun saqlangan yozuv (yo'q bo'lsa null)
  const [marks, setMarks] = useState({}) // { studentId: true/false }
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  // 1) Sahifa ochilganda — faqat faol guruhlar, birinchisini tanlab qo'yamiz
  async function loadGroups() {
    setError("")
    try {
      const data = await getGroups({ status: "active" })
      setGroups(data)
      if (data.length > 0) setGroupId(String(data[0].id))
      else setLoading(false)
    } catch {
      setError("Guruhlarni yuklab bo'lmadi")
      setLoading(false)
    }
  }

  // 2) Guruh yoki sana tanlanganda — talabalar, shu kungi yozuv va tarix
  async function loadAttendance() {
    setLoading(true)
    setError("")
    try {
      const [studentsData, found, historyData] = await Promise.all([
        getStudents({ groupId, status: "active" }),
        getAttendance({ groupId, date }),
        getAttendance({ groupId, _sort: "date", _order: "desc", _limit: 10 }),
      ])
      const record = found.length > 0 ? found[0] : null

      // Avvalgi belgilarni tiklaymiz (yozuv yo'q bo'lsa — hammasi "Kelmadi")
      const newMarks = {}
      for (const s of studentsData) {
        const old = record ? record.records.find((r) => r.studentId === s.id) : null
        newMarks[s.id] = old ? old.present : false
      }

      setStudents(studentsData)
      setExisting(record)
      setMarks(newMarks)
      setHistory(historyData)
    } catch {
      setError("Davomatni yuklab bo'lmadi")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGroups()
  }, [])

  useEffect(() => {
    if (groupId) loadAttendance()
  }, [groupId, date])

  function handleMark(studentId, present) {
    // [studentId] — o'zgaruvchi qiymatini kalit sifatida ishlatish
    setMarks({ ...marks, [studentId]: present })
  }

  function markAllPresent() {
    const all = {}
    for (const s of students) all[s.id] = true
    setMarks(all)
  }

  async function handleSave() {
    setSaving(true)
    const records = students.map((s) => ({ studentId: s.id, present: marks[s.id] === true }))
    try {
      if (existing) {
        // Bu kun uchun yozuv bor — PATCH (yangilash)
        await updateAttendance(existing.id, { records })
      } else {
        // Yozuv yo'q — POST (yangi yaratish)
        await createAttendance({ groupId: Number(groupId), date, records })
      }
      toast.success("Davomat saqlandi")
      loadAttendance()
    } catch {
      toast.error("Davomatni saqlab bo'lmadi")
    } finally {
      setSaving(false)
    }
  }

  const presentCount = students.filter((s) => marks[s.id] === true).length // jonli hisob
  const absentCount = students.length - presentCount

  return (
    <div className="space-y-6">
      <PageHeader title="Davomat" description={existing ? "Bu kun uchun davomat avval saqlangan" : "Yangi davomat"} />

      <AttendanceFilters groups={groups} groupId={groupId} onGroupChange={setGroupId} date={date} onDateChange={setDate} />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={groupId ? loadAttendance : loadGroups} />
      ) : groups.length === 0 ? (
        <EmptyState message="Faol guruhlar yo'q" />
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <AttendanceToolbar
              presentCount={presentCount}
              absentCount={absentCount}
              onMarkAll={markAllPresent}
              onSave={handleSave}
              saving={saving}
              disabled={students.length === 0}
            />
            {students.length === 0 ? (
              <EmptyState message="Bu guruhda faol talabalar yo'q" />
            ) : (
              <AttendanceList students={students} marks={marks} onMark={handleMark} />
            )}
          </div>
          <AttendanceHistory history={history} />
        </div>
      )}
    </div>
  )
}

export default Attendance
