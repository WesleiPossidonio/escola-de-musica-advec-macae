import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
// import { useUser } from '@/hooks/userUser'

import api from '../services/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

interface CreateStudentsProps {
  id_prof: string
  id_hours: string
  name: string
  email: string
  telefone: string
  experiencia_com_musica: boolean
  data_de_nascimento: string
  responsible_name: string
  password: string
  instrumento_musical: string
}

interface CreateProfPros {
  name: string
  email: string
  password: string
  telefone_contato: string
  update_number?: string
  instrumento_musical1: string
  instrumento_musical2?: string
}

interface CreatePaymentProps {
  url_pdf: File
  id_alunos: string,
  mes_referencia: string,
}

interface CreateTimeProps {
  id_prof: string
  dia: string
  horario: string
  turno: string
  quantidade_alunos: string
  disponibilidade_horario?: string
  disponibilidade_alunos?: string
  instrumento: string
}

interface ListScheduleProps extends CreateTimeProps {
  id: string
}

interface PaymentProp {
  id: string
  pix_comprovante: string
  id_comprovante: string
  mes_referencia: string
}
interface studentsHoursProps extends CreateTimeProps {
  id: string
}

export interface GetStudentsProps extends CreateStudentsProps {
  id: string
  horarios_alunos: studentsHoursProps
  pagamentos: PaymentProp[]
}

interface DataProfProps {
  id: string,
  name: string,
  instrumento_musical1: string
  instrumento_musical2: string
  alunos: GetStudentsProps
  horarios: ListScheduleProps
}

interface schoolProviderProps {
  handleCreateStudents: (data: CreateStudentsProps) => Promise<void>
  handleCreateProf: (data: CreateProfPros) => Promise<void>
  handleCreateTime: (data: CreateTimeProps) => Promise<void>
  handleCreatePayment: (data: CreatePaymentProps) => Promise<void>
  getProf: () => Promise<void>
  getStudents: () => Promise<void>
  listDataProf: DataProfProps[]
  listDataSchedules: ListScheduleProps[]
  listDataStudents: GetStudentsProps[]
}

interface SchoolProviderProps {
  children: ReactNode
}

export const SchoolContext = createContext({} as schoolProviderProps)

export const SchoolContextProvider = ({
  children,
}: SchoolProviderProps) => {
  // const { userDataLogin } = useUser()
  const [listDataProf, setListDataProf] = useState<DataProfProps[]>([])
  const [listDataStudents, setListDataStudents] = useState<GetStudentsProps[]>([])
  const [listDataSchedules, setListDataSchedules] = useState<ListScheduleProps[]>([])

  const navigate = useNavigate()

  const getProf = useCallback(async () => {
    try {
      const dataProps = await api.get('getProf')
      const { data } = dataProps
      setListDataProf(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const getSchedules = useCallback(async () => {
    try {
      const dataProps = await api.get('getHours')
      const { data } = dataProps
      setListDataSchedules(data)

    } catch (error) {
      console.log(error)
    }
  }, [])

  const getStudents = useCallback(async () => {
    try {
      const dataProps = await api.get('getAlunos')
      const { data } = dataProps
      setListDataStudents(data)
    } catch (error) {
      console.log(error)
    }
  }, [])


  useEffect(() => {
    getProf()
    getSchedules()
    getStudents()


  }, [getProf, getSchedules, getStudents])

  const handleCreateStudents = async (data: CreateStudentsProps) => {
    const {
      id_prof,
      id_hours,
      name,
      email,
      telefone,
      experiencia_com_musica,
      data_de_nascimento,
      responsible_name,
      password,
      instrumento_musical
    } = data

    try {
      await toast.promise(
        api.post('createAlunos', {
          id_prof,
          id_hours,
          name,
          email,
          telefone,
          experiencia_com_musica,
          data_de_nascimento,
          responsible_name,
          password,
          instrumento_musical
        }), {
        pending: 'Enviando Dados',
        success: 'Inscrição feita com Sucesso!',
        error: 'Error ao fazer a inscrição verifique seus dados 🤯',
      }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateProf = async (data: CreateProfPros) => {
    const {
      email,
      instrumento_musical1,
      instrumento_musical2,
      name,
      password,
      telefone_contato,
      update_number
    } = data

    try {
      await toast.promise(
        api.post('createProf', {
          email,
          instrumento_musical1,
          instrumento_musical2,
          name,
          password,
          telefone_contato,
          update_number
        }), {
        pending: 'Enviando Dados',
        success: 'Professor com Sucesso!',
        error: 'Error ao criar no servidor 🤯',
      }
      )

      navigate('/admin')
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateTime = async (data: CreateTimeProps) => {
    const {
      dia,
      horario,
      turno,
      disponibilidade_horario,
      id_prof,
      quantidade_alunos,
      instrumento
    } = data

    try {
      await toast.promise(api.post('createHours', {
        dia,
        horario,
        turno,
        disponibilidade_alunos: 0,
        disponibilidade_horario,
        id_prof,
        quantidade_alunos,
        instrumento
      }), {
        pending: 'Enviando Dados',
        success: 'Horário Criado com Sucesso!',
        error: 'Error ao criar o horário 🤯 Data Existente',
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreatePayment = async (data: CreatePaymentProps) => {
    const { mes_referencia, id_alunos, url_pdf } = data;

    const formData = new FormData();
    formData.append("mes_referencia", mes_referencia);
    formData.append("id_alunos", String(id_alunos));

    // Detecta o tipo do arquivo e usa o campo adequado
    const fileType = url_pdf.type;

    if (fileType === "application/pdf") {
      formData.append("pdfs", url_pdf); // campo esperado pelo multer
    } else if (["image/jpeg", "image/png"].includes(fileType)) {
      formData.append("images", url_pdf);
    } else if (["video/mp4", "video/avi"].includes(fileType)) {
      formData.append("videos", url_pdf);
    } else {
      console.error("Tipo de arquivo não suportado.");
      return;
    }

    try {
      await toast.promise(
        api.post('payment', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
        {
          pending: 'Enviando Dados',
          success: 'Pagamento Cadastrado com Sucesso!',
          error: 'Erro ao criar o pagamento 🤯',
        }
      );
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <SchoolContext.Provider
      value={{
        handleCreateStudents,
        handleCreateProf,
        handleCreateTime,
        getProf,
        handleCreatePayment,
        getStudents,
        listDataProf,
        listDataSchedules,
        listDataStudents
      }}
    >
      {children}
    </SchoolContext.Provider>
  )
}

