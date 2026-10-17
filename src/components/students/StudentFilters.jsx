import PropTypes from "prop-types"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function StudentFilters({ search, onSearchChange, groupId, onGroupChange, status, onStatusChange, groups }) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Ism, familiya yoki telefon bo'yicha qidirish..."
          className="pl-9"
        />
      </div>

      {/* "all" — filtr yo'q degani */}
      <Select value={groupId} onValueChange={onGroupChange}>
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Guruh" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Barcha guruhlar</SelectItem>
          {groups.map((g) => (
            <SelectItem key={g.id} value={String(g.id)}>
              {g.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Holat" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Barcha holatlar</SelectItem>
          <SelectItem value="active">Faol</SelectItem>
          <SelectItem value="frozen">Muzlatilgan</SelectItem>
          <SelectItem value="left">Ketgan</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

StudentFilters.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
  onGroupChange: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
}

export default StudentFilters
