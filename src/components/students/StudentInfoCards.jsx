import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import StatusBadge from "./StatusBadge"
import { formatDate, formatPhone } from "@/utils/format"
import { getAge } from "@/utils/date"

// Bitta qator: chapda nom, o'ngda qiymat
function InfoRow({ label, children }) {
  return (
    <div className="flex justify-between gap-4 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{children}</span>
    </div>
  )
}

InfoRow.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
}

function StudentInfoCards({ student, attendancePercent }) {
  const group = student.group

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Shaxsiy ma'lumotlar</CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <InfoRow label="Telefon">{formatPhone(student.phone)}</InfoRow>
          <InfoRow label="Tug'ilgan sana">
            {formatDate(student.birthDate)} ({getAge(student.birthDate)} yosh)
          </InfoRow>
          <InfoRow label="Holat">
            <StatusBadge status={student.status} />
          </InfoRow>
          <InfoRow label="Qo'shilgan sana">{formatDate(student.joinedAt)}</InfoRow>
          <InfoRow label="Izoh">{student.note || "—"}</InfoRow>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Guruh</CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {group ? (
            <>
              <InfoRow label="Guruh nomi">
                <Link to={`/dashboard/groups/${group.id}`} className="text-primary hover:underline">
                  {group.name}
                </Link>
              </InfoRow>
              <InfoRow label="Kurs">{group.course}</InfoRow>
              <InfoRow label="O'qituvchi">{group.teacher}</InfoRow>
              <InfoRow label="Kunlar va vaqt">
                {group.days === "toq" ? "Toq kunlar" : "Juft kunlar"}, {group.time}
              </InfoRow>
              <InfoRow label="Davomat">{attendancePercent === null ? "Ma'lumot yo'q" : `${attendancePercent}%`}</InfoRow>
            </>
          ) : (
            <p className="py-2 text-sm text-muted-foreground">Guruh topilmadi</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

StudentInfoCards.propTypes = {
  student: PropTypes.object.isRequired,
  attendancePercent: PropTypes.number,
}

export default StudentInfoCards
