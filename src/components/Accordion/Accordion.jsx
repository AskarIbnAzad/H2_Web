import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Accordion = ({ title, children, isParentOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    if (isParentOpen === true) {
      setIsOpen(true)
    } else if (isParentOpen === false) {
      setIsOpen(false)
    }
  }, [isParentOpen])



  return (
    <div  className="">

      <button
        onClick={toggleAccordion}
         className="flex items-center w-full text-left py-3 text-black font-plus-jakarta-sans font-bold text-lg sm:text-xl md:text-[20px]"

      >
        <span>{title}</span>
        <div  className="flex-grow mx-4 border-t-2 border-[#346896]"></div>
        <span
           className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
            }`}
        >
          <IoIosArrowDown color="#346896" />
        </span>
      </button>
      <div
         className={`overflow-hidden transition-[max-height] duration-500 ease-in-out`}
        style={{
          maxHeight: isOpen ? "1000px" : "0px",
        }}
      >
        <div  className="py-4 px-4 space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
