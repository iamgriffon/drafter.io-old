import { useMenu } from "@/context/MenuContext";

export function WinnerPicker() {
  const { setWinnerTeam, stageMode } = useMenu();

  return (
    <div className="max-xl:absolute md:static lg:static sm:static pl-3 left-[76%] mt-1 flex gap-3 items-center justify-start">
      <button
        className="bg-red-600 h-10 w-10 rounded-full focus:border-2 focus:border-gray-200"
        onClick={() => setWinnerTeam("red")}
      ></button>
      |
      <button
        className="bg-blue-600 h-10 w-10 rounded-full focus:border-2 focus:border-gray-200"
        onClick={() => setWinnerTeam("blue")}
      ></button>
      {!stageMode && (
        <>
          |
          <button
            className="bg-white h-10 w-10 rounded-full focus:border-2 focus:border-gray-200"
            onClick={() => setWinnerTeam("not")}
          ></button>
        </>
      )}
    </div>
  );
}
