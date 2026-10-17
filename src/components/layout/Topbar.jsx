import { useState } from "react"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import { LogOut, Menu, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import ConfirmDialog from "@/components/common/ConfirmDialog"
import { getSavedAdmin, removeAdmin } from "@/utils/storage"

function Topbar({ title, onMenuClick, theme, onToggleTheme }) {
  const navigate = useNavigate()
  const admin = getSavedAdmin()
  const [logoutOpen, setLogoutOpen] = useState(false)

  function handleLogout() {
    removeAdmin()
    navigate("/login")
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background px-4 md:px-6">
      {/* Burger tugmasi faqat mobilda ko'rinadi */}
      <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick} aria-label="Menyu">
        <Menu className="size-5" />
      </Button>

      <h1 className="flex-1 truncate text-lg font-semibold">{title}</h1>

      <Button variant="ghost" size="icon" onClick={onToggleTheme} aria-label="Mavzuni almashtirish">
        {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
      </Button>

      <div className="flex items-center gap-2">
        <img src={admin?.avatar} alt={admin?.fullName} className="size-9 rounded-full object-cover" />
        <span className="hidden text-sm font-medium sm:block">{admin?.fullName}</span>
      </div>

      <Button variant="outline" size="sm" onClick={() => setLogoutOpen(true)}>
        <LogOut className="size-4" />
        <span className="hidden sm:inline">Chiqish</span>
      </Button>

      <ConfirmDialog
        open={logoutOpen}
        title="Tizimdan chiqish"
        description="Rostdan ham chiqmoqchimisiz?"
        confirmText="Chiqish"
        onConfirm={handleLogout}
        onCancel={() => setLogoutOpen(false)}
      />
    </header>
  )
}

Topbar.propTypes = {
  title: PropTypes.string.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
}

export default Topbar
