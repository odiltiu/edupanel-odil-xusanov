import PropTypes from "prop-types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FormField from "@/components/common/FormField"
import { studentSchema } from "@/schemas/studentSchema"
import { selectClass } from "@/lib/styles"

const emptyValues = {
  firstName: "",
  lastName: "",
  phone: "+998",
  birthDate: "",
  groupId: "",
  status: "active",
  note: "",
}

// Qo'shish va tahrirlash uchun BITTA forma.
// Tahrirlashda defaultValues ichida talaba ma'lumotlari keladi.
function StudentForm({ defaultValues, onSubmit, isSubmitting, groups, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: { ...emptyValues, ...defaultValues },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Ism" htmlFor="firstName" error={errors.firstName?.message}>
          <Input id="firstName" {...register("firstName")} />
        </FormField>
        <FormField label="Familiya" htmlFor="lastName" error={errors.lastName?.message}>
          <Input id="lastName" {...register("lastName")} />
        </FormField>
        <FormField label="Telefon" htmlFor="phone" error={errors.phone?.message}>
          <Input id="phone" placeholder="+998901234567" {...register("phone")} />
        </FormField>
        <FormField label="Tug'ilgan sana" htmlFor="birthDate" error={errors.birthDate?.message}>
          <Input id="birthDate" type="date" {...register("birthDate")} />
        </FormField>
        <FormField label="Guruh" htmlFor="groupId" error={errors.groupId?.message}>
          <select id="groupId" className={selectClass} {...register("groupId")}>
            <option value="">Tanlang...</option>
            {groups.map((g) => (
              <option key={g.id} value={String(g.id)}>
                {g.name} — {g.course}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Holat" htmlFor="status" error={errors.status?.message}>
          <select id="status" className={selectClass} {...register("status")}>
            <option value="active">Faol</option>
            <option value="frozen">Muzlatilgan</option>
            <option value="left">Ketgan</option>
          </select>
        </FormField>
      </div>

      <FormField label="Izoh" htmlFor="note">
        <Input id="note" placeholder="Ixtiyoriy" {...register("note")} />
      </FormField>

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

StudentForm.propTypes = {
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  groups: PropTypes.array.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default StudentForm
