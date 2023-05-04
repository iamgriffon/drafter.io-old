import { IoMdSettings } from "react-icons/io";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { MockDraft } from "@/utils/mockDraft";
import { GameSeries } from "@/types/draft";
import { useMenu } from "@/context/MenuContext";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Modal } from "./Modal";

interface NavbarProps {
	purgeDraft: () => void;
	importDraft: (param: GameSeries) => void;
}

export function Navbar({ importDraft }: NavbarProps) {
  const user = useUser();
  const { matches } = useMenu();
  const { user: userProps } = user;
  const exampleDraft: GameSeries = JSON.parse(JSON.stringify(MockDraft));
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState<"Import"|"Export" >("Import");


  function openModal(param: "Import"|"Export"){
    setLabel(param);
    setOpen(true);
  };

  function onSubmitModal(){
    if (label === "Export"){
      console.log("Exported Draft: ", JSON.stringify(matches));
    } else if (label === "Import"){
      importDraft(exampleDraft);
    }
  }

  return (
    <>
      <Dialog.Root
        defaultOpen={false}
        open={open}
      >
        <div className="flex flex-row justify-between self-center items-center py-4 px-8 w-full max-w-[1440px] border-b-2 mb-3">
          <div className="flex flex-row gap-8">
            {!!user.isSignedIn && (
              <>
                <Dialog.Trigger>
                  <span
                    className="text-gray-100 font-bold   hover:text-gray-300 cursor-pointer"
                    onClick={() => openModal("Import")}
                  >
                    {"Import"}
                  </span>
                </Dialog.Trigger>
                <span
                  className="text-gray-100 font-bold   hover:text-gray-300 cursor-pointer"
                  onClick={() =>
                    openModal("Export")
                  }
                >
                  {"Export"}
                </span>
                <span className="text-gray-100 font-bold   hover:text-gray-300 cursor-pointer">
                  {"Save"}
                </span>
              </>
            )}
          </div>
          <div className="flex flex-row gap-4">
            <IoMdSettings
              size={24}
              className="fill-gray-100 cursor-pointer hover:fill-gray-300"
            />
            {!!user.isSignedIn && (
              <div className="rounded-full h-5">
                <Image
                  src={userProps?.profileImageUrl!}
                  className="rounded-full"
                  width={24}
                  height={24}
                  alt="Profile Picture"
                />
              </div>
            )}
            <div>
              {!user.isSignedIn && <SignInButton />}
              {!!user.isSignedIn && <SignOutButton />}
            </div>
          </div>
        </div>
        <Modal label={label} closeModal={() => setOpen(false)} importDraft={importDraft}  />
      </Dialog.Root>
    </>
  );
}
