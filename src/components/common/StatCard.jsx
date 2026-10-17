import PropTypes from "prop-types"
import { Card, CardContent } from "@/components/ui/card"

// variant bo'yicha ikonka rangi
const variantClasses = {
  default: "bg-primary/10 text-primary",
  success: "bg-green-500/10 text-green-600 dark:text-green-400",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  danger: "bg-red-500/10 text-red-600 dark:text-red-400",
}

function StatCard({ title, value, icon: Icon, variant = "default", hint }) {
  return (
    <Card className="min-w-0">
      <CardContent className="flex items-center gap-4">
        <div className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${variantClasses[variant]}`}>
          <Icon className="size-6" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-xl leading-tight font-bold">{value}</p>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType.isRequired,
  variant: PropTypes.oneOf(["default", "success", "warning", "danger"]),
  hint: PropTypes.string,
}

export default StatCard
