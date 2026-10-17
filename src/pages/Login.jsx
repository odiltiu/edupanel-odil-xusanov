import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { GraduationCap } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/api/auth"
import { saveAdmin } from "@/utils/storage"
import { loginSchema } from "@/schemas/loginSchema"

function Login() {
  const navigate = useNavigate()
  // Server javobidagi xato (login/parol noto'g'ri) — forma ustida chiqadi
  const [serverError, setServerError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  })

  async function onSubmit(values) {
    setServerError("")
    try {
      const result = await login(values.username, values.password)

      if (result.length === 0) {
        setServerError("Login yoki parol noto'g'ri")
        return
      }

      // Parolni localStorage'ga yozmaymiz — faqat kerakli maydonlar
      const found = result[0]
      saveAdmin({
        id: found.id,
        username: found.username,
        fullName: found.fullName,
        avatar: found.avatar,
      })
      toast.success(`Xush kelibsiz, ${found.fullName}!`)
      navigate("/dashboard")
    } catch {
      setServerError("Server bilan bog'lanib bo'lmadi. json-server ishga tushganini tekshiring")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <GraduationCap className="size-6" />
          </div>
          <CardTitle className="text-2xl">EduPanel</CardTitle>
          <CardDescription>Boshqaruv paneliga kirish</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {serverError && (
              <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {serverError}
              </p>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Login</Label>
              <Input id="username" placeholder="admin" {...register("username")} />
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Parol</Label>
              <Input id="password" type="password" placeholder="••••••" {...register("password")} />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Tekshirilmoqda..." : "Kirish"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
