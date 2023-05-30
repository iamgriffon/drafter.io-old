import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BiExport, BiImport, BiTrash } from "react-icons/bi";

interface DropdownSubMenuProps {
  onImport: () => void;
  onShare: () => void;
  onDelete: () => void;
}

export function DropdownSubMenu({
  onImport, onShare, onDelete
}: DropdownSubMenuProps) {
  return (
    <DropdownMenu.SubContent
      className="z-10 flex flex-col gap-1 w-24 px-2 content-center justify-between bg-white rounded-md p-1 shadow-md cursor-pointer"
      sideOffset={10}
      alignOffset={5}
      hideWhenDetached
    >
      <DropdownMenu.Item 
        className="flex flex-row items-center justify-between text-gray-600 hover:text-gray-400" 
        textValue="Import"
        onClick={() => onImport()}>
        Import
        <BiImport size={18} />
      </DropdownMenu.Item>
      <DropdownMenu.Separator className="border-t border-gray-300 w-[80%] self-center" />
      <DropdownMenu.Item 
        className="flex flex-row items-center justify-between text-gray-600 hover:text-gray-400" 
        textValue="Delete"
        onClick={() => onShare()}>
        Share
        <BiExport size={18} />
      </DropdownMenu.Item>
      <DropdownMenu.Separator className="border-t border-gray-300 w-[80%] self-center" />
      <DropdownMenu.Item 
        className="flex flex-row items-center justify-between text-gray-600 hover:text-gray-400" 
        textValue="Delete"
        onClick={() => onDelete()}>
        Delete
        <BiTrash size={18} />
      </DropdownMenu.Item>
    </DropdownMenu.SubContent>
  );
}
