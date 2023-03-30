import { IoMdSettings } from "react-icons/io";
import { BsBellFill } from "react-icons/bs";
import { trpc } from "@/utils/trpc";

export function Navbar() {
  const { data } = trpc.hello.useQuery({ msg: "" });
  const NAVBAR_OPTIONS = [
    'Start/Reset',
    'New Draft',
    'Import',
    'Export',
    
  ]
  return (
    <>
      <div className="flex flex-row justify-between self-center items-center py-4 px-8 w-full max-w-[1440px] border-b-2 mb-3">
        <div className="flex flex-row gap-8">
          <span className="text-gray-100 font-bold   hover:text-gray-300 cursor-pointer">
            {"Start/Reset"}
          </span>
          <span className="text-gray-100 font-bold   hover:text-gray-300 cursor-pointer">
            {"New Draft"}
          </span>
          <span className="text-gray-100 font-bold   hover:text-gray-300 cursor-pointer">
            {"Import"}
          </span>
          <span className="text-gray-100 font-bold   cursor-pointer">
            {"Export"}
          </span>
          <span className="text-gray-100 font-bold   hover:text-gray-300 cursor-pointer">
            {"Save"}
          </span>
        </div>
        <div className="flex flex-row gap-4">
          <IoMdSettings
            size={24}
            className="fill-gray-100 cursor-pointer hover:fill-gray-300"
          />
          <BsBellFill
            size={24}
            className="fill-gray-100 cursor-pointer hover:fill-gray-300"
          />
          <p className="text-gray-100">{data?.toString()}</p>
        </div>
      </div>
    </>
  );
}
