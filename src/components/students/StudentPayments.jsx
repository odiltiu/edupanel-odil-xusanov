import PropTypes from "prop-types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import EmptyState from "@/components/common/EmptyState"
import { formatDate, formatMoney } from "@/utils/format"

function StudentPayments({ payments, debt }) {
  // Yangisi tepada: paidAt bo'yicha kamayish tartibida ([...] — asl massivni buzmaslik uchun nusxa)
  const sorted = [...payments].sort((a, b) => b.paidAt.localeCompare(a.paidAt))
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>To'lovlar tarixi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-md bg-muted p-3">
            <p className="text-sm text-muted-foreground">Jami to'langan</p>
            <p className="text-lg font-bold">{formatMoney(totalPaid)}</p>
          </div>
          <div className="rounded-md bg-muted p-3">
            <p className="text-sm text-muted-foreground">Joriy oy qarzi</p>
            <p className={`text-lg font-bold ${debt > 0 ? "text-destructive" : "text-green-600 dark:text-green-400"}`}>
              {debt > 0 ? formatMoney(debt) : "Qarz yo'q"}
            </p>
          </div>
        </div>

        {sorted.length === 0 ? (
          <EmptyState message="Hali to'lovlar yo'q" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sana</TableHead>
                <TableHead>Oy</TableHead>
                <TableHead>Usul</TableHead>
                <TableHead className="text-right">Summa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{formatDate(p.paidAt)}</TableCell>
                  <TableCell>{p.month}</TableCell>
                  <TableCell className="capitalize">{p.method}</TableCell>
                  <TableCell className="text-right font-medium">{formatMoney(p.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

StudentPayments.propTypes = {
  payments: PropTypes.array.isRequired,
  debt: PropTypes.number.isRequired,
}

export default StudentPayments
