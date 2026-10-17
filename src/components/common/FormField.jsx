import PropTypes from "prop-types"
import { Label } from "@/components/ui/label"

// Forma maydoni: label + input (children) + xato xabari
function FormField({ label, htmlFor, error, children }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  htmlFor: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default FormField
