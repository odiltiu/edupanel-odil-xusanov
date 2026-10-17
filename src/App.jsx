import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">EduPanel</h1>
      <Button onClick={() => toast.success("Hammasi ishlayapti!")}>Tekshirish</Button>
      <Toaster />
    </div>
  )
}

export default App
