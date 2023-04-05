import Image from 'next/image'
import { useMenu } from "@/context/MenuContext";

export function ChampionList() {
const {champions, searchChampion} = useMenu();

const filteredChampions = champions?.filter(champion => champion.name.toLowerCase().includes(searchChampion.toLowerCase()))

  return (
    <div className="overflow-x-hidden h-[45rem] w-screen max-w-5xl border-4 rounded-md border-gray-400 cursor-pointer 
      scroll scrollbar scrollbar-track-transparent scrollbar-thumb-gray-200 scrollbar-thumb-rounded-md">
      <div className="grid grid-cols-10 m-3 p-3 gap-3 items-center">
        {filteredChampions?.map(champion => (
          <div key={champion.id} className=''>
            <Image width={75} height={75} src={champion.image} alt={champion.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
