import PropTypes from "prop-types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FormField from "@/components/common/FormField"
import { paymentSchema } from "@/schemas/paymentSchema"
import { getPaidForMonth } from "@/utils/debt"
import { getCurrentMonth, getToday } from "@/utils/date"
import { selectClass } from "@/lib/styles"

function PaymentForm({ defaultValues, onSubmit, isSubmitting, students, groups, payments, onCancel }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: { studentId: "", month: getCurrentMonth(), method: "naqd", paidAt: getToday(), ...defaultValues },
  })

  // watch — maydonning hozirgi qiymatini kuzatadi (har o'zgarishda komponent qayta chiziladi)
  const studentId = watch("studentId")
  const month = watch("month")

  const student = students.find((s) => s.id === Number(studentId))
  const group = student ? groups.find((g) => g.id === student.groupId) : null
  // Tanlangan talaba shu oy uchun to'liq to'laganmi?
  const fullyPaid = student && group && getPaidForMonth(payments, student.id, month) >= group.monthlyPrice

  // Talaba tanlanganda summaga avtomatik uning guruh narxini qo'yamiz
  function handleStudentChange(e) {
    const selected = students.find((s) => s.id === Number(e.target.value))
    const selectedGroup = selected ? groups.find((g) => g.id === selected.groupId) : null
    if (selectedGroup) setValue("amount", selectedGroup.monthlyPrice)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="Talaba" htmlFor="studentId" error={errors.studentId?.message}>
        <select id="studentId" className={selectClass} {...register("studentId", { onChange: handleStudentChange })}>
          <option value="">Tanlang...</option>
          {students.map((s) => (
            <option key={s.id} value={String(s.id)}>
              {s.firstName} {s.lastName}
            </option>
          ))}
        </select>
      </FormField>

      {fullyPaid && (
        <p className="flex items-center gap-2 rounded-md bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-400">
          <AlertTriangle className="size-4 shrink-0" />
          Bu talaba tanlangan oy uchun to'lovni to'liq amalga oshirgan.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Summa (so'm)" htmlFor="amount" error={errors.amount?.message}>
          <Input id="amount" type="number" {...register("amount", { valueAsNumber: true })} />
        </FormField>
        <FormField label="Qaysi oy uchun" htmlFor="month" error={errors.month?.message}>
          <Input id="month" type="month" {...register("month")} />
        </FormField>
        <FormField label="To'lov usuli" htmlFor="method" error={errors.method?.message}>
          <select id="method" className={selectClass} {...register("method")}>
            <option value="naqd">Naqd</option>
            <option value="karta">Karta</option>
            <option value="click">Click</option>
          </select>
        </FormField>
        <FormField label="To'lov sanasi" htmlFor="paidAt" error={errors.paidAt?.message}>
          <Input id="paidAt" type="date" {...register("paidAt")} />
        </FormField>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Bekor qilish
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </div>
    </form>
  )
}

PaymentForm.propTypes = {
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  students: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  payments: PropTypes.array.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default PaymentForm
