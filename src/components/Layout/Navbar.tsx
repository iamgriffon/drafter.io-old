import { IoMdSettings } from "react-icons/io";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Draft as DraftType, Game, GameSeries } from "@/types/draft";
import { useMenu } from "@/context/MenuContext";
import * as Dialog from "@radix-ui/react-dialog";
import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { Modal } from "./Modal";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DropdownSubMenu } from "../Menu/MenuDropdown";
import { Draft } from "@prisma/client";
import { BiChevronRight } from "react-icons/bi";
import { useDraft } from "@/context/DraftContext";
import { trpc } from "@/utils/trpc";
import {
  DEFAULT_BO1_STATE,
  DEFAULT_BLUE_SIDE_DRAFT_STATE,
  DEFAULT_RED_SIDE_DRAFT_STATE,
} from "@/server/utils/setDefaultValues";

interface NavbarProps {
	importDraft: (param: GameSeries) => void;
	purgeDraft: () => void;
  selectedMatch: Game | null
}

export type OperationsMapEnum =
	| "Import"
	| "Export"
	| "Share"
	| "Delete"
	| "Update"
	| "Create"
  | "Rename";

export function Navbar({ importDraft, purgeDraft, selectedMatch }: NavbarProps) {
  const user = useUser();
  const { matches } = useMenu();
  const { id, setId } = useDraft();
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
  }, [refetch, user]);

  const onDeleteDraft = useCallback(
    (callback: () => void) => {
      deleteDraft(
        {
          id: id,
          user_id: userProps!.id,
        },
        {
          onSettled: () => callback(),
        }
      );
    },
    [deleteDraft, id, userProps]
  );

  const onUpdateDraft = useCallback(
    (callback: () => void) => {
      updateDraft(
        {
          link: link,
          draft: matches,
          name: name,
        },
        {
          onSettled: () => callback(),
        }
      );
    },
    [matches, updateDraft, name, link]
  );

  const onCreateNew = useCallback(
    (callback: () => void) => {
      purgeDraft();
      callback();
    },[purgeDraft]);

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
              <span
                className="text-gray-100 font-bold   hover:text-gray-300 cursor-pointer"
                onClick={() => openModal("Import")}
              >
                {"Import"}
              </span>
              {!!user.isSignedIn && (
                <>
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
                    onClick={() => openModal("Share")}
                    className="text-gray-100 font-bold hover:text-gray-300 cursor-pointer"
                  >
                    {"Share"}
                  </span>
                  <span
                    onClick={() => openModal("Update")}
                    className="text-gray-100 font-bold hover:text-gray-300 cursor-pointer"
                  >
                    {"Save"}
                  </span>
                  <span
                    className="text-gray-100 font-bold   hover:text-gray-300 cursor-pointer"
                    onClick={() => openModal("Create")}
                  >
                    {"New"}
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
                  className="z-10 flex flex-col gap-1 w-[10rem] p-2 bg-white rounded-md shadow-md cursor-pointer"
                >
                  {drafts?.map((draft, index) => (
                    <>
                      <div className="flex flex-col text-gray-600 hover:text-gray-400">
                        <DropdownMenu.Sub>
                          <DropdownMenu.SubTrigger className="flex flex-row items-center justify-between">
                            <p className="w-[90%]  text-gray-600 self-start p-2">
                              {draft.name}
                            </p>
                            <BiChevronRight size={24} />
                          </DropdownMenu.SubTrigger>
                          <DropdownMenu.Portal>
                            <DropdownSubMenu
                              onDelete={() => {
                                setId(draft.id);
                                openModal("Delete", () => {
                                  setLink(draft.link);
                                  setName(draft.name);
                                });
                              }}
                              onImport={() => {
                                openModal("Import", () => {
                                  setLink(draft.link);
                                  setName(draft.name);
                                });
                              }}
                              onShare={() =>
                                openModal("Share", () => {
                                  setLink(draft.link);
                                  setName(draft.name);
                                })
                              }
                              onRename={() => {
                                openModal("Rename", () => {
                                  setName(draft.name);
                                  setLink(draft.link);
                                });
                              }}
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
            onCreateNew={onCreateNew}
          />
        </DropdownMenu.Root>
      </Dialog.Root>
    </>
  );
}
