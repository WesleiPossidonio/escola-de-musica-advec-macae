import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"


export const Faq = () => {
  return (
    <section className="w-full h-auto md:min-w-[30rem] bg-white">
      <div className="container mx-auto flex flex-col items-center justify-center gap-10 px-6 md:px-10 py-10">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl text-black font-bold+">FAQ</h1>
          <p className="text-sm md:text-md">
            Tem dúvidas? Aqui estão as respostas para as perguntas mais frequentes sobre nossas aulas e como você pode começar a sua jornada musical conosco!
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="item-1" className="bg-white px-2 rounded border border-neutral-400">
            <AccordionTrigger className="text-black no-underline md:text-lg">Qual é o valor das aulas?</AccordionTrigger>
            <AccordionContent>
              O valor mensal de qualquer curso é R$ 200,00, com uma hora de aula por semana.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="bg-white px-2 rounded border border-neutral-400">
            <AccordionTrigger className="text-black no-underline md:text-lg">As aulas são em grupo ou individuais?</AccordionTrigger>
            <AccordionContent>
              Todas as aulas são individuais, com exceção das de Pandeiro e Teoria Musical, que são oferecidas em turmas.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-white px-2 rounded border border-neutral-400">
            <AccordionTrigger className="text-black no-underline md:text-lg">Qual é a duração de cada aula?</AccordionTrigger>
            <AccordionContent>
              Cada aula tem 1 hora de duração por semana.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="bg-white px-2 rounded border border-neutral-400">
            <AccordionTrigger className="text-black no-underline md:text-lg">Posso começar a aula sem ter experiência prévia?</AccordionTrigger>
            <AccordionContent>
              Sim! Nossos cursos são para todos os níveis, desde iniciantes até alunos mais avançados.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="bg-white px-2 rounded border border-neutral-400">
            <AccordionTrigger className="text-black no-underline md:text-lg">Quais instrumentos são oferecidos na escola de música?</AccordionTrigger>
            <AccordionContent>
              Oferecemos aulas de Guitarra, Violão, Bateria, Baixo, Teclado, Pandeiro e Teoria Musical.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}


