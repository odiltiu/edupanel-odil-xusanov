import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import StatusBadge from "@/components/students/StatusBadge"
import DebtBadge from "@/components/students/DebtBadge"
import { calcDebt } from "@/utils/debt"
import { formatPhone } from "@/utils/format"

function GroupStudentsTable({ students, group, payments }) {
  return (
    <div className="rounded-md border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>F.I.Sh</TableHead>
            <TableHead>Telefon</TableHead>
            <TableHead>Holat</TableHead>
            <TableHead>To'lov holati</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>
                <Link to={`/dashboard/students/${student.id}`} className="font-medium text-primary hover:underline">
                  {student.firstName} {student.lastName}
                </Link>
              </TableCell>
              <TableCell>{formatPhone(student.phone)}</TableCell>
              <TableCell>
                <StatusBadge status={student.status} />
              </TableCell>
              <TableCell>
                <DebtBadge status={student.status} debt={calcDebt(student, group, payments)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

GroupStudentsTable.propTypes = {
  students: PropTypes.array.isRequired,
  group: PropTypes.object.isRequired,
  payments: PropTypes.array.isRequired,
}

export default GroupStudentsTable
