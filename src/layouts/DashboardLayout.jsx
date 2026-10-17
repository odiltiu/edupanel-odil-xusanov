import { useState } from "react"
import PropTypes from "prop-types"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"
import { getPageTitle } from "@/components/layout/navLinks"

function DashboardLayout({ theme, onToggleTheme }) {
  // Mobil sidebar ochiq yoki yopiq
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // useLocation — hozirgi URL (sahifa nomini topish uchun)
  const location = useLocation()

  return (
    <div className="flex min-h-screen bg-muted/40">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title={getPageTitle(location.pathname)}
          onMenuClick={() => setSidebarOpen(true)}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />
        <main className="flex-1 p-4 md:p-6">
          {/* Shu yerga ichki sahifalar qo'yiladi; context — ularga (Settings) theme berish uchun */}
          <Outlet context={{ theme, onToggleTheme }} />
        </main>
      </div>
    </div>
  )
}

DashboardLayout.propTypes = {
  theme: PropTypes.string.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
}

export default DashboardLayout
