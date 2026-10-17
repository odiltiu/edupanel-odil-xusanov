import PropTypes from "prop-types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FormField from "@/components/common/FormField"
import { groupSchema } from "@/schemas/groupSchema"
import { selectClass } from "@/lib/styles"

const emptyValues = {
  name: "",
  course: "",
  teacher: "",
  days: "toq",
  time: "",
  startDate: "",
  status: "active",
}

// Qo'shish va tahrirlash uchun bitta forma
function GroupForm({ defaultValues, onSubmit, isSubmitting, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(groupSchema),
    defaultValues: { ...emptyValues, ...defaultValues },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Guruh nomi" htmlFor="name" error={errors.name?.message}>
          <Input id="name" placeholder="FN-25" {...register("name")} />
        </FormField>
        <FormField label="Kurs" htmlFor="course" error={errors.course?.message}>
          <Input id="course" placeholder="Frontend" {...register("course")} />
        </FormField>
        <FormField label="O'qituvchi" htmlFor="teacher" error={errors.teacher?.message}>
          <Input id="teacher" {...register("teacher")} />
        </FormField>
        <FormField label="Oylik narx (so'm)" htmlFor="monthlyPrice" error={errors.monthlyPrice?.message}>
          <Input id="monthlyPrice" type="number" {...register("monthlyPrice", { valueAsNumber: true })} />
        </FormField>
        <FormField label="Kunlar" htmlFor="days" error={errors.days?.message}>
          <select id="days" className={selectClass} {...register("days")}>
            <option value="toq">Toq kunlar (Du, Chor, Ju)</option>
            <option value="juft">Juft kunlar (Se, Pay, Sha)</option>
          </select>
        </FormField>
        <FormField label="Dars vaqti" htmlFor="time" error={errors.time?.message}>
          <Input id="time" type="time" {...register("time")} />
        </FormField>
        <FormField label="Boshlanish sanasi" htmlFor="startDate" error={errors.startDate?.message}>
          <Input id="startDate" type="date" {...register("startDate")} />
        </FormField>
        <FormField label="Holat" htmlFor="status" error={errors.status?.message}>
          <select id="status" className={selectClass} {...register("status")}>
            <option value="active">Faol</option>
            <option value="finished">Tugagan</option>
          </select>
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

GroupForm.propTypes = {
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
}

export default GroupForm
