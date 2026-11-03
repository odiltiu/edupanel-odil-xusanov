import { lazy, Suspense, useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import ProtectedRoute from "@/routes/ProtectedRoute"
import PublicRoute from "@/routes/PublicRoute"
import DashboardLayout from "@/layouts/DashboardLayout"
import LoadingState from "@/components/common/LoadingState"

// Sahifalar alohida fayllarga bo'linadi va faqat ochilganda yuklanadi.
// Masalan, grafik kutubxonasi (recharts) faqat bosh panelga kirganda yuklanadi.
const Login = lazy(() => import("@/pages/Login"))
const Dashboard = lazy(() => import("@/pages/Dashboard"))
const Students = lazy(() => import("@/pages/Students"))
const StudentDetail = lazy(() => import("@/pages/StudentDetail"))
const Groups = lazy(() => import("@/pages/Groups"))
const GroupDetail = lazy(() => import("@/pages/GroupDetail"))
const Payments = lazy(() => import("@/pages/Payments"))
const Attendance = lazy(() => import("@/pages/Attendance"))
const Settings = lazy(() => import("@/pages/Settings"))
const NotFound = lazy(() => import("@/pages/NotFound"))
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
      <Suspense fallback={<div className="p-6"><LoadingState /></div>}>
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
      </Suspense>

      <Toaster theme={theme} richColors position="top-right" />
    </>
  )
}

export default App
