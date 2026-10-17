import PropTypes from "prop-types"
import { Navigate } from "react-router-dom"
import { getSavedAdmin } from "@/utils/storage"

// Admin kirmagan bo'lsa — /login ga yuboradi, kirgan bo'lsa — sahifani ko'rsatadi
function ProtectedRoute({ children }) {
  const admin = getSavedAdmin()

  if (!admin) {
    return <Navigate to="/login" replace />
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ProtectedRoute
