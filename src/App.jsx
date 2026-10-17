import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import ProtectedRoute from "@/routes/ProtectedRoute"
import PublicRoute from "@/routes/PublicRoute"
import DashboardLayout from "@/layouts/DashboardLayout"
import Login from "@/pages/Login"
import Dashboard from "@/pages/Dashboard"
import Students from "@/pages/Students"
import StudentDetail from "@/pages/StudentDetail"
import Groups from "@/pages/Groups"
import GroupDetail from "@/pages/GroupDetail"
import Payments from "@/pages/Payments"
import Attendance from "@/pages/Attendance"
import Settings from "@/pages/Settings"
import NotFound from "@/pages/NotFound"
import { applyTheme, getSavedTheme } from "@/utils/theme"

function App() {
  // Mavzu (dark mode) — sahifa yangilansa localStorage'dan tiklanadi
  const [theme, setTheme] = useState(getSavedTheme())

  // theme o'zgarganda <html> ga "dark" klassini qo'yamiz va saqlaymiz
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      <Routes>
        {/* Ochiq sahifa: kirgan admin bu yerga kirsa /dashboard ga qaytariladi */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Himoyalangan sahifalar: hammasi DashboardLayout ichida (<Outlet />) ochiladi */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout theme={theme} onToggleTheme={toggleTheme} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="students/:id" element={<StudentDetail />} />
          <Route path="groups" element={<Groups />} />
          <Route path="groups/:id" element={<GroupDetail />} />
          <Route path="payments" element={<Payments />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster theme={theme} richColors position="top-right" />
    </>
  )
}

export default App
