import { IoMdSettings } from "react-icons/io";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { GameSeries } from "@/types/draft";
import { useMenu } from "@/context/MenuContext";
import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect, useCallback } from "react";
import { Modal } from "./Modal";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DropdownSubMenu } from "../Menu/MenuDropdown";
import { Draft } from "@prisma/client";
import { BiChevronRight } from "react-icons/bi";
import { useDraft } from "@/context/DraftContext";
import { trpc } from "@/utils/trpc";

interface NavbarProps {
	purgeDraft: () => void;
	importDraft: (param: GameSeries) => void;
}

export type OperationsMapEnum =
	| "Import"
	| "Export"
	| "Share"
	| "Delete"
	| "Update";

export function Navbar({ importDraft }: NavbarProps) {
  const user = useUser();
  const { matches, selectedMatch } = useMenu();
  const { id } = useDraft();
  const { user: userProps } = user;
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState<OperationsMapEnum>("Import");
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const { mutate: updateDraft } = trpc.draft.update.useMutation();
  const { mutate: deleteDraft } = trpc.draft.delete.useMutation();
  const { refetch } = trpc.draft.fetch.useQuery(
    {
      user_id: userProps?.id || "",
    },
    {
      enabled: true,
      refetchOnMount: true,
    }
  );
  const [drafts, setDrafts] = useState<Draft[]>([]);

  const fetchDrafts = useCallback(async () => {
    if (user) {
      const response = (await refetch()).data;
      if (response) setDrafts(response);
    }
  },[refetch, user]);

  const onDeleteDraft = useCallback((callback: () => void) => {
    deleteDraft({
      id: id
    },{
      onSettled: () => callback()
    });
  },[deleteDraft, id]);

  const onUpdateDraft = useCallback((callback: () => void) =>{
    updateDraft({
      id: id,
      draft: matches,
      name: name
    },{
      onSettled: () => callback()
    });
  },[id, matches, updateDraft, name]); 


  useEffect(() => {
    fetchDrafts();
  }, [onDeleteDraft, onUpdateDraft, fetchDrafts]);

  function openModal(param: OperationsMapEnum, callback?: () => void) {
    if (callback) callback();
    setLabel(param);
    setOpen(true);
  }


  return (
    <>
      <Dialog.Root
        defaultOpen={false}
        open={open}
      >
        <DropdownMenu.Root>
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

                  {!!user.isSignedIn &&
									matches.games.length > 0 &&
									selectedMatch !== null ? (
                      <button
                        className="text-gray-100 font-bold   hover:text-gray-300 cursor-pointer"
                        onClick={() => openModal("Export")}
                      >
                        {"Export"}
                      </button>
                    ) : null}
                  <span
                    onClick={() => openModal("Update")}
                    className="text-gray-100 font-bold hover:text-gray-300 cursor-pointer"
                  >
                    {"Save"}
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-row gap-4">
              {drafts?.length ? (
                <DropdownMenu.Trigger>
                  <p className="font-bold">My Drafts</p>
                </DropdownMenu.Trigger>
              ) : null}
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  sideOffset={5}
                  className="z-10 flex flex-col gap-1 w-[10rem] px-2 bg-white rounded-md p-1 shadow-md cursor-pointer"
                >
                  {drafts?.map((draft, index) => (
                    <>
                      <div className="flex flex-col text-gray-600 hover:text-gray-400">
                        <DropdownMenu.Sub>
                          <DropdownMenu.SubTrigger className="flex flex-row items-center justify-between">
                            <p className="w-[90%] self-start">{draft.name}</p>
                            <BiChevronRight size={24} />
                          </DropdownMenu.SubTrigger>
                          <DropdownMenu.Portal>
                            <DropdownSubMenu
                              onDelete={() =>
                                openModal("Delete", () => {
                                  setLink(draft.link);
                                  setName(draft.name);
                                })
                              }
                              onImport={() =>
                                openModal("Import", () => {
                                  setLink(draft.link);
                                  setName(draft.name);
                                })
                              }
                              onShare={() =>
                                openModal("Share", () => {
                                  setLink(draft.link);
                                  setName(draft.name);
                                })
                              }
                            />
                          </DropdownMenu.Portal>
                          {!(index + 1 >= drafts.length) && (
                            <div className="border-t border-gray-300 w-[80%] self-center"></div>
                          )}
                        </DropdownMenu.Sub>
                      </div>
                    </>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>

              <IoMdSettings
                size={24}
                className="fill-gray-100 cursor-pointer hover:fill-gray-300"
              />

              {!!user.isSignedIn && (
                <div className="rounded-full h-5">
                  <Image
                    src={userProps?.profileImageUrl!}
                    className="rounded-full cursor-pointer"
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
          <Modal
            open={open}
            label={label}
            closeModal={() => setOpen(false)}
            importDraft={importDraft}
            link={link}
            setLink={setLink}
            name={name}
            onDeleteDraft={onDeleteDraft}
            onUpdateDraft={onUpdateDraft}
          />
        </DropdownMenu.Root>
      </Dialog.Root>
    </>
  );
}
