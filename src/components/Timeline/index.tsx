interface TimelineItemProps {
  title: string;
  description: string;
  align: "left" | "right";
  icon: React.ReactNode;
}

export const Timeline = (data: TimelineItemProps) => {
  const isLeft = data.align === "left";

  return (
    <div className="container relative w-full h-auto md:w-1/2 px-4 py-8">
      <div className={`absolute top-10 ${isLeft ? "right-[1rem] md:right-[-20px] top-[-0.2rem] md:top-[16rem]" : "top-[-0.2rem] md:left-[-20px]"} z-10`}>
        <div className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center">
          {data.icon}
        </div>
      </div>
      <div className={`${isLeft ? "text-right md:mt-48 md:mb-8 md:pr-10" : "text-left md:pl-10"}`}>
        <h4 className="text-lg font-semibold text-black mt-2 mb-4">{data.title}</h4>
        <p className="text-sm text-gray-900 mt-1">{data.description}</p>
      </div>
    </div>
  )
}


