import { useOutletContext } from "react-router-dom"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PageHeader from "@/components/common/PageHeader"
import PasswordForm from "@/components/settings/PasswordForm"
import { getSavedAdmin } from "@/utils/storage"

function Settings() {
  const admin = getSavedAdmin()
  // DashboardLayout'dagi <Outlet context={...} /> orqali kelgan qiymatlar
  const { theme, onToggleTheme } = useOutletContext()

  return (
    <div className="space-y-6">
      <PageHeader title="Sozlamalar" />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin profili</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <img src={admin.avatar} alt={admin.fullName} className="size-20 rounded-full object-cover" />
              <div>
                <p className="text-lg font-semibold">{admin.fullName}</p>
                <p className="text-sm text-muted-foreground">@{admin.username}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ko'rinish</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">Tungi rejim (dark mode)</p>
                <p className="text-sm text-muted-foreground">Hozir: {theme === "dark" ? "tungi" : "kunduzgi"}</p>
              </div>
              <Button variant="outline" onClick={onToggleTheme}>
                {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
                {theme === "dark" ? "Kunduzgi" : "Tungi"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <PasswordForm />
      </div>
    </div>
  )
}

export default Settings
