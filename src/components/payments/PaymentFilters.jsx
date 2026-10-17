import PropTypes from "prop-types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function PaymentFilters({ month, onMonthChange, method, onMethodChange }) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      <Input type="month" value={month} onChange={(e) => onMonthChange(e.target.value)} className="sm:w-48" />

      <Select value={method} onValueChange={onMethodChange}>
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Usul" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Barcha usullar</SelectItem>
          <SelectItem value="naqd">Naqd</SelectItem>
          <SelectItem value="karta">Karta</SelectItem>
          <SelectItem value="click">Click</SelectItem>
        </SelectContent>
      </Select>

      {(month || method !== "all") && (
        <Button
          variant="ghost"
          onClick={() => {
            onMonthChange("")
            onMethodChange("all")
          }}
        >
          Filtrni tozalash
        </Button>
      )}
    </div>
  )
}

PaymentFilters.propTypes = {
  month: PropTypes.string.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
  onMethodChange: PropTypes.func.isRequired,
}

export default PaymentFilters
