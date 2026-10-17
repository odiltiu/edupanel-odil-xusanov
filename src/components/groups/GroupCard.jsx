import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { CalendarDays, Clock, Pencil, Trash2, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import StatusBadge from "@/components/students/StatusBadge"
import { formatMoney } from "@/utils/format"

function GroupCard({ group, studentCount, onEdit, onDelete }) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between gap-2">
        <div>
          <CardTitle className="text-xl">
            <Link to={`/dashboard/groups/${group.id}`} className="hover:text-primary hover:underline">
              {group.name}
            </Link>
          </CardTitle>
          <p className="text-sm text-muted-foreground">{group.course}</p>
        </div>
        <StatusBadge status={group.status} />
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <p className="flex items-center gap-2">
          <User className="size-4 text-muted-foreground" /> {group.teacher}
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays className="size-4 text-muted-foreground" />
          {group.days === "toq" ? "Toq kunlar" : "Juft kunlar"}
        </p>
        <p className="flex items-center gap-2">
          <Clock className="size-4 text-muted-foreground" /> {group.time}
        </p>
        <p className="flex items-center gap-2">
          <Users className="size-4 text-muted-foreground" /> {studentCount} ta talaba
        </p>
        <p className="pt-2 text-lg font-bold">
          {formatMoney(group.monthlyPrice)} <span className="text-sm font-normal text-muted-foreground">/ oy</span>
        </p>
      </CardContent>

      <CardFooter className="justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(group)}>
          <Pencil className="size-4" /> Tahrirlash
        </Button>
        <Button variant="outline" size="sm" onClick={() => onDelete(group)}>
          <Trash2 className="size-4 text-destructive" /> O'chirish
        </Button>
      </CardFooter>
    </Card>
  )
}

GroupCard.propTypes = {
  group: PropTypes.object.isRequired,
  studentCount: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default GroupCard
