import PropTypes from "prop-types"
import { Inbox } from "lucide-react"

function EmptyState({ message = "Ma'lumot topilmadi" }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed p-8 text-center text-muted-foreground">
      <Inbox className="size-10" />
      <p className="text-sm">{message}</p>
    </div>
  )
}

EmptyState.propTypes = {
  message: PropTypes.string,
}

export default EmptyState
