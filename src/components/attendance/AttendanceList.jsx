import PropTypes from "prop-types"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// marks — { studentId: true/false } ko'rinishidagi obyekt
function AttendanceList({ students, marks, onMark }) {
  return (
    <ul className="divide-y rounded-md border bg-background">
      {students.map((student, index) => {
        const present = marks[student.id] === true
        return (
          <li key={student.id} className="flex flex-wrap items-center justify-between gap-2 p-3">
            <span className="font-medium">
              {index + 1}. {student.firstName} {student.lastName}
            </span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={present ? "default" : "outline"}
                className={present ? "bg-green-600 text-white hover:bg-green-700" : ""}
                onClick={() => onMark(student.id, true)}
              >
                <Check className="size-4" /> Keldi
              </Button>
              <Button
                size="sm"
                variant={!present ? "destructive" : "outline"}
                onClick={() => onMark(student.id, false)}
              >
                <X className="size-4" /> Kelmadi
              </Button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

AttendanceList.propTypes = {
  students: PropTypes.array.isRequired,
  marks: PropTypes.object.isRequired,
  onMark: PropTypes.func.isRequired,
}

export default AttendanceList
