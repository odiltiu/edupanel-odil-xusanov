import PropTypes from "prop-types"
import { Badge } from "@/components/ui/badge"
import { formatMoney } from "@/utils/format"

// Talabaning joriy oy to'lov holati
function DebtBadge({ status, debt }) {
  if (status !== "active") {
    return <span className="text-muted-foreground">—</span>
  }
  if (debt > 0) {
    return <Badge variant="destructive">Qarz: {formatMoney(debt)}</Badge>
  }
  return <Badge className="bg-green-600 text-white">To'langan</Badge>
}

DebtBadge.propTypes = {
  status: PropTypes.string.isRequired,
  debt: PropTypes.number.isRequired,
}

export default DebtBadge
