import { Camera, Clock, Users } from "lucide-react";

export const timelineData = [
  {
    title: "Valores das Aulas",
    description: "50,00 para não membros e 200,00 para membros da Advec.",
    icon: <Camera size={20} />,
    align: "left",
  },
  {
    title: "Duração das Aulas",
    description: "As aulas presenciais tem duração média de 1h de duração, ficando a cargo do professor.",
    icon: <Clock size={20} />,
    align: "right",
  },
  {
    title: "Materiais para Estudo",
    description: "Os materiais para estudo em vídeo, PDF, link ou material impresso serão enviados exclusivamente no canal particular de cada aluno, ficando a cargo do professor e aluno decidirem.",
    icon: <Users size={20} />,
    align: "left",
  },

  {
    title: "Objetivo do Curso",
    description: "Desenvolver o nível musical do zero ao baixista seguro, tocando suas primeiras músicas, mesmo sendo iniciante.1",
    icon: <Users size={20} />,
    align: "right",
  },
];