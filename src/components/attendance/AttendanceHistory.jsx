import PropTypes from "prop-types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EmptyState from "@/components/common/EmptyState"
import { calcLessonPercent } from "@/utils/attendance"
import { formatDate } from "@/utils/format"

// Guruhning oxirgi 10 ta davomati: sana va kelganlar foizi
function AttendanceHistory({ history }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Oxirgi davomatlar</CardTitle>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <EmptyState message="Bu guruhda hali davomat olinmagan" />
        ) : (
          <ul className="space-y-3">
            {history.map((item) => {
              const percent = calcLessonPercent(item.records)
              return (
                <li key={item.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{formatDate(item.date)}</span>
                    <span className="font-medium">{percent}%</span>
                  </div>
                  {/* Foiz chizig'i: kengligi = foiz */}
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-600" style={{ width: `${percent}%` }} />
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

AttendanceHistory.propTypes = {
  history: PropTypes.array.isRequired,
}

export default AttendanceHistory
