import PropTypes from "prop-types"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

function ErrorState({ message = "Ma'lumotni yuklashda xatolik yuz berdi", onRetry }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-8 text-center">
      <AlertTriangle className="size-10 text-destructive" />
      <p className="text-sm">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Qayta urinish
        </Button>
      )}
    </div>
  )
}

ErrorState.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
}

export default ErrorState
