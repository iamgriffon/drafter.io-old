import { useState } from "react";

interface SwitchProps {
  sortChampions?: () => void;
}

export function Switch({sortChampions}: SwitchProps) {
  const [toggle, setToggle] = useState(true);
  const toggleClass = " transform translate-x-5";


  function handleToggle(){
    setToggle(!toggle);
    sortChampions;
  }

  return (
    <div className="flex flex-row gap-3">
      <div className="flex flex-col justify-center items-center">
        {/*   Switch Container */}
        <div
          className={`md:w-14 md:h-7 w-[3.4rem] h-4 flex items-center rounded-full p-1 cursor-pointer ${toggle ? "bg-green-400" : "bg-gray-400"}`}
          onClick={() => handleToggle()}
        >
          {/* Switch */}
          <div
            className={
              "bg-gray-100 md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" 
              + (toggle ? "" : toggleClass)
            }
          ></div>
        </div>
      </div>
      <p className="font-bold   pt-3.5">Sort by Order</p>
    </div>
  );
}
