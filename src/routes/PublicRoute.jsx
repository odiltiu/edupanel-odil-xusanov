import PropTypes from "prop-types"
import { Navigate } from "react-router-dom"
import { getSavedAdmin } from "@/utils/storage"

// Admin allaqachon kirgan bo'lsa — /login o'rniga /dashboard ga yuboradi
function PublicRoute({ children }) {
  const admin = getSavedAdmin()

  if (admin) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PublicRoute
