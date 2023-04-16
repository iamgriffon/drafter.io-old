import { useMenu } from "@/context/MenuContext"

export function GameIndicator(){

  const { selectedMatch } = useMenu();

  return (
    <div className="flex items-center">
      <p className="font-bold text-sm"> Drafting in:</p>
      <span className="text-md px-2">Game {selectedMatch?.game}</span>
    </div>
  )
}