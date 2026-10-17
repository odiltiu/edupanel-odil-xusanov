// Talabaning davomat foizi: kelgan darslar / jami belgilangan darslar
// attendanceList — guruhning davomat yozuvlari: [{ date, records: [{ studentId, present }] }]
export function calcStudentAttendance(attendanceList, studentId) {
  let total = 0
  let present = 0
  for (const item of attendanceList) {
    const record = item.records.find((r) => r.studentId === studentId)
    if (record) {
      total = total + 1
      if (record.present) present = present + 1
    }
  }
  if (total === 0) return null // hali davomat yo'q
  return Math.round((present / total) * 100)
}

// Bitta dars uchun kelganlar foizi
export function calcLessonPercent(records) {
  if (records.length === 0) return 0
  const present = records.filter((r) => r.present).length
  return Math.round((present / records.length) * 100)
}
