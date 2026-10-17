import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"
import { GraduationCap, X } from "lucide-react"
import { navLinks } from "./navLinks"

function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobilda sidebar ochiq bo'lsa — orqadagi qora fon, bosilsa yopiladi */}
      {open && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} />}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-background transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2 font-bold text-lg">
            <GraduationCap className="size-6 text-primary" />
            EduPanel
          </div>
          <button onClick={onClose} className="rounded-md p-1 hover:bg-accent md:hidden" aria-label="Yopish">
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/dashboard"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`
                }
              >
                <Icon className="size-4" />
                {link.label}
              </NavLink>
            )
          })}
        </nav>
      </aside>
    </>
  )
}

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Sidebar
