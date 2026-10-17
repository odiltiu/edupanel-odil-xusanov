import PropTypes from "prop-types"
import { CheckCheck, Save } from "lucide-react"
import { Button } from "@/components/ui/button"

// Jonli hisob ("Keldi: 12 / Kelmadi: 3") va tugmalar
function AttendanceToolbar({ presentCount, absentCount, onMarkAll, onSave, saving, disabled }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm">
        <span className="font-semibold text-green-600 dark:text-green-400">Keldi: {presentCount}</span>
        {" / "}
        <span className="font-semibold text-destructive">Kelmadi: {absentCount}</span>
      </p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onMarkAll} disabled={disabled}>
          <CheckCheck className="size-4" /> Hammasi keldi
        </Button>
        <Button size="sm" onClick={onSave} disabled={saving || disabled}>
          <Save className="size-4" /> {saving ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </div>
    </div>
  )
}

AttendanceToolbar.propTypes = {
  presentCount: PropTypes.number.isRequired,
  absentCount: PropTypes.number.isRequired,
  onMarkAll: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default AttendanceToolbar
