import PropTypes from "prop-types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EmptyState from "@/components/common/EmptyState"
import { formatDate, formatMoney } from "@/utils/format"

function RecentPayments({ payments }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>So'nggi to'lovlar</CardTitle>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? (
          <EmptyState message="Hali to'lovlar yo'q" />
        ) : (
          <ul className="divide-y">
            {payments.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-2 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {p.student ? `${p.student.firstName} ${p.student.lastName}` : "O'chirilgan talaba"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(p.paidAt)} · {p.method}
                  </p>
                </div>
                <span className="shrink-0 font-semibold text-green-600 dark:text-green-400">
                  {formatMoney(p.amount)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

RecentPayments.propTypes = {
  payments: PropTypes.array.isRequired,
}

export default RecentPayments
