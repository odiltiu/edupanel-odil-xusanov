import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import { Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import StatusBadge from "./StatusBadge"
import { calcDebt } from "@/utils/debt"
import { formatMoney, formatPhone } from "@/utils/format"

function StudentsTable({ students, groups, payments, onEdit, onDelete }) {
  const navigate = useNavigate()

  return (
    <div className="rounded-md border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>F.I.Sh</TableHead>
            <TableHead>Telefon</TableHead>
            <TableHead>Guruh</TableHead>
            <TableHead>Holat</TableHead>
            <TableHead>Qarz holati</TableHead>
            <TableHead className="text-right">Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => {
            const group = groups.find((g) => g.id === student.groupId)
            const debt = calcDebt(student, group, payments)

            return (
              <TableRow
                key={student.id}
                className="cursor-pointer"
                onClick={() => navigate(`/dashboard/students/${student.id}`)}
              >
                <TableCell className="font-medium">
                  {student.firstName} {student.lastName}
                </TableCell>
                <TableCell>{formatPhone(student.phone)}</TableCell>
                <TableCell>{group ? group.name : "—"}</TableCell>
                <TableCell>
                  <StatusBadge status={student.status} />
                </TableCell>
                <TableCell>
                  {student.status !== "active" ? (
                    <span className="text-muted-foreground">—</span>
                  ) : debt > 0 ? (
                    <Badge variant="destructive">Qarz: {formatMoney(debt)}</Badge>
                  ) : (
                    <Badge className="bg-green-600 text-white">To'langan</Badge>
                  )}
                </TableCell>
                {/* stopPropagation — tugma bosilganda qatorning onClick'i (profilga o'tish) ishlamasin */}
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(student)} aria-label="Tahrirlash">
                    <Pencil className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(student)} aria-label="O'chirish">
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

StudentsTable.propTypes = {
  students: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  payments: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default StudentsTable
