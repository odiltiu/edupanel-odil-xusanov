import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
      <p className="text-7xl font-bold text-primary">404</p>
      <h1 className="text-2xl font-semibold">Sahifa topilmadi</h1>
      <p className="text-muted-foreground">Siz qidirgan sahifa mavjud emas yoki o'chirilgan.</p>
      <Button onClick={() => navigate("/dashboard")}>Bosh panelga qaytish</Button>
    </div>
  )
}

export default NotFound
