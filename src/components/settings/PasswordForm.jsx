import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FormField from "@/components/common/FormField"
import { getAdmin, updateAdmin } from "@/api/auth"
import { getSavedAdmin } from "@/utils/storage"
import { passwordSchema } from "@/schemas/passwordSchema"

function PasswordForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  })

  async function onSubmit(values) {
    const admin = getSavedAdmin()
    try {
      // Joriy parolni serverdagi bilan solishtiramiz
      const fresh = await getAdmin(admin.id)
      if (fresh.password !== values.currentPassword) {
        // setError — xatoni qo'lda kerakli maydon ostiga chiqaradi
        setError("currentPassword", { message: "Joriy parol noto'g'ri" })
        return
      }
      await updateAdmin(admin.id, { password: values.newPassword })
      toast.success("Parol muvaffaqiyatli o'zgartirildi")
      reset() // formani tozalaymiz
    } catch {
      toast.error("Parolni o'zgartirib bo'lmadi")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parolni o'zgartirish</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Joriy parol" htmlFor="currentPassword" error={errors.currentPassword?.message}>
            <Input id="currentPassword" type="password" {...register("currentPassword")} />
          </FormField>
          <FormField label="Yangi parol" htmlFor="newPassword" error={errors.newPassword?.message}>
            <Input id="newPassword" type="password" {...register("newPassword")} />
          </FormField>
          <FormField label="Yangi parolni tasdiqlash" htmlFor="confirmPassword" error={errors.confirmPassword?.message}>
            <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
          </FormField>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saqlanmoqda..." : "Parolni saqlash"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default PasswordForm
