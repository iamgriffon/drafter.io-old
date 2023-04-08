import { useMenu } from "@/context/MenuContext";

export function Switch() {
  const { stageMode, handleToggle } = useMenu();
  const toggleClass = " transform translate-x-5";

  return (
    <div className="flex flex-row gap-3">
      <div className="flex flex-col justify-center items-center">
        {/*   Switch Container */}
        <div
          className={`md:w-13 md:h-7 w-[3.4rem] h-4 flex items-center rounded-full p-1 cursor-pointer ${
            stageMode ? "bg-green-400" : "bg-cyan-400"
          }`}
          onClick={handleToggle}
        >
          {/* Switch */}
          <div
            className={
              "bg-gray-100 md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
              (stageMode ? "" : toggleClass)
            }
          ></div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold">
          {stageMode ? "Stage Mode" : "Scrim Mode"}
        </p>
        <span className="text-sm  flex-nowrap">{stageMode ? 'One game at a time' : 'Pick games freely'}</span>
      </div>
    </div>
  );
}
