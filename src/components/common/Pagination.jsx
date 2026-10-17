import PropTypes from "prop-types"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

function Pagination({ page, total, limit, onChange }) {
  // Jami sahifalar soni: 25 ta talaba, 10 tadan → 3 sahifa
  const totalPages = Math.ceil(total / limit) || 1

  return (
    <div className="mt-4 flex items-center justify-between gap-2">
      <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        <ChevronLeft className="size-4" />
        Oldingi
      </Button>

      <span className="text-sm text-muted-foreground">
        {page}-sahifa / {totalPages}
      </span>

      <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        Keyingi
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Pagination
