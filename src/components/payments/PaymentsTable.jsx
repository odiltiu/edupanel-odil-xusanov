import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate, formatMoney } from "@/utils/format"

function PaymentsTable({ payments, groups, onDelete }) {
  const total = payments.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="rounded-md border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Talaba</TableHead>
            <TableHead>Guruh</TableHead>
            <TableHead>Summa</TableHead>
            <TableHead>Oy</TableHead>
            <TableHead>Usul</TableHead>
            <TableHead>Sana</TableHead>
            <TableHead className="text-right">Amal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((p) => {
            // _expand=student tufayli har to'lovda student obyekti bor
            const group = p.student ? groups.find((g) => g.id === p.student.groupId) : null
            return (
              <TableRow key={p.id}>
                <TableCell>
                  {p.student ? (
                    <Link to={`/dashboard/students/${p.student.id}`} className="font-medium hover:text-primary hover:underline">
                      {p.student.firstName} {p.student.lastName}
                    </Link>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>{group ? group.name : "—"}</TableCell>
                <TableCell className="font-medium">{formatMoney(p.amount)}</TableCell>
                <TableCell>{p.month}</TableCell>
                <TableCell className="capitalize">{p.method}</TableCell>
                <TableCell>{formatDate(p.paidAt)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => onDelete(p)} aria-label="O'chirish">
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Jami ({payments.length} ta to'lov)</TableCell>
            <TableCell colSpan={5} className="font-bold">
              {formatMoney(total)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

PaymentsTable.propTypes = {
  payments: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default PaymentsTable
