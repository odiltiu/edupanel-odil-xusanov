import PropTypes from "prop-types"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function AttendanceFilters({ groups, groupId, onGroupChange, date, onDateChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Select value={groupId} onValueChange={onGroupChange}>
        <SelectTrigger className="w-full sm:w-56">
          <SelectValue placeholder="Guruhni tanlang" />
        </SelectTrigger>
        <SelectContent>
          {groups.map((g) => (
            <SelectItem key={g.id} value={String(g.id)}>
              {g.name} — {g.course}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input type="date" value={date} onChange={(e) => onDateChange(e.target.value)} className="sm:w-48" />
    </div>
  )
}

AttendanceFilters.propTypes = {
  groups: PropTypes.array.isRequired,
  groupId: PropTypes.string.isRequired,
  onGroupChange: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
}

export default AttendanceFilters
