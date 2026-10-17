import PropTypes from "prop-types"
import { Skeleton } from "@/components/ui/skeleton"

// Ma'lumot yuklanayotganda kulrang "miltillovchi" qatorlar
function LoadingState({ rows = 5 }) {
  // [0, 1, 2, ...] massivini yasab, har biri uchun bitta Skeleton chiqaramiz
  const items = Array.from({ length: rows }, (_, i) => i)

  return (
    <div className="space-y-3">
      {items.map((i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  )
}

LoadingState.propTypes = {
  rows: PropTypes.number,
}

export default LoadingState
