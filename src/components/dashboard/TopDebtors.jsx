import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EmptyState from "@/components/common/EmptyState"
import { formatMoney } from "@/utils/format"

// debtors: [{ student, group, debt }, ...] — qarzi kattasi birinchi
function TopDebtors({ debtors }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Qarzdorlar</CardTitle>
      </CardHeader>
      <CardContent>
        {debtors.length === 0 ? (
          <EmptyState message="Qarzdorlar yo'q 🎉" />
        ) : (
          <ul className="divide-y">
            {debtors.map(({ student, group, debt }) => (
              <li key={student.id}>
                <Link
                  to={`/dashboard/students/${student.id}`}
                  className="flex items-center justify-between gap-2 rounded-md px-2 py-3 hover:bg-accent"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">{group.name}</p>
                  </div>
                  <span className="shrink-0 font-semibold text-destructive">{formatMoney(debt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

TopDebtors.propTypes = {
  debtors: PropTypes.array.isRequired,
}

export default TopDebtors
