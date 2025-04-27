
import { useStudentsData } from "@/hooks/useStudents"
import { Calendar, User } from "lucide-react"

interface DialogProps {
  studentId: string
}

export const DialogStudents = ({ studentId }: DialogProps) => {

  const { listDataStudents } = useStudentsData()

  const student = listDataStudents.find(students => students.id === studentId)

  return (
    <div className="w-full flex flex-col items-start justify-center gap-2">
      <div className="space-y-2">

        <h1 className="text-xl font-semibold mb-3">Informações do Aluno</h1>
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <User className="size-9" />
            <h1 className="font-semibold flex items-center gap-1">
              Nome do Aluno:
            </h1>
            <p>{student?.name}</p>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="size-9" />
            <h1 className="font-semibold">Data de Nascimento:</h1>
            <p>{student?.data_de_nascimento}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <h1 className="font-semibold">Email do Aluno:</h1>
          <p>{student?.email}</p>
        </div>


        <div className="flex gap-2">
          <h1 className="font-semibold">Telefone do Aluno:</h1>
          <p>{student?.telefone}</p>
        </div>
      </div>
    </div>
  )
}


