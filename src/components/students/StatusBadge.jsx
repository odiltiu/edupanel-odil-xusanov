import PropTypes from "prop-types"
import { Badge } from "@/components/ui/badge"

// Talaba (active/frozen/left) va guruh (active/finished) holatlari uchun
function StatusBadge({ status }) {
  if (status === "active") {
    return <Badge className="bg-green-600 text-white">Faol</Badge>
  }
  if (status === "frozen") {
    return <Badge className="bg-sky-500 text-white">Muzlatilgan</Badge>
  }
  if (status === "left") {
    return <Badge variant="secondary">Ketgan</Badge>
  }
  if (status === "finished") {
    return <Badge variant="outline">Tugagan</Badge>
  }
  return <Badge variant="outline">{status}</Badge>
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
}

export default StatusBadge
