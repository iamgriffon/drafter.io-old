import { GameSeries } from "@/types/draft";
import { trpc } from "@/utils/trpc";
import { useUser } from "@clerk/nextjs";
import * as Dialog from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction, useEffect, useCallback } from "react";
import { OperationsMapEnum } from "../Navbar";
import { ConfirmModal } from "./Confirm";
import { ExportModal } from "./Export";
import { ImportModal } from "./Import";
import { ShareModal } from "./Share";

export interface ModalPageProps {
	open: boolean;
	name: string;
	closeModal: () => void;
	label: OperationsMapEnum;
	importDraft: (param: GameSeries) => void;
	link: string;
	setLink: Dispatch<SetStateAction<string>>;
  onUpdateDraft: (param: () => void) => void;
  onDeleteDraft: (param: () => void) => void;
}

export interface ImportModalProps {
	closeModal: () => void;
	label: OperationsMapEnum;
	onSubmit: (param: GameSeries) => void;
	link: string;
}

export interface ExportModalProps {
	closeModal: () => void;
	label: OperationsMapEnum;
}

export interface ShareModalProps {
	closeModal: () => void;
	label: OperationsMapEnum;
	link: string;
}

export interface ConfirmModalProps {
	closeModal: () => void;
	label: OperationsMapEnum;
	name: string;
	onAccept: (param: () => void) => void
}

export function Modal({
  open,
  closeModal,
  label,
  importDraft,
  link = "",
  setLink,
  name,
  onDeleteDraft,
  onUpdateDraft
}: ModalPageProps) {

  const purgeLink = useCallback(() => {
    setLink("");
  }, [setLink]);

  useEffect(() => {
    if (open.valueOf() == false) purgeLink();
  }, [open, purgeLink]);



  const ModalMap = {
    Import: (
      <ImportModal
        closeModal={closeModal}
        label={label}
        onSubmit={importDraft}
        link={link}
      />
    ),
    Export: (
      <ExportModal
        closeModal={closeModal}
        label={label}
      />
    ),
    Share: (
      <ShareModal
        closeModal={closeModal}
        label={label}
        link={link}
      />
    ),
    Delete: (
      <ConfirmModal
        closeModal={closeModal}
        name={name}
        label={label}
        onAccept={onDeleteDraft}
      />
    ),
    Update: (
      <ConfirmModal
        closeModal={closeModal}
        label={label}
        name={name}
        onAccept={onUpdateDraft}
      />
    ),
  };

  return (
    <Dialog.Content className="w-full h-full bg-slate-700 bg-opacity-90 z-10  flex flex-col items-center content-center fixed">
      {ModalMap[label]}
    </Dialog.Content>
  );
}
