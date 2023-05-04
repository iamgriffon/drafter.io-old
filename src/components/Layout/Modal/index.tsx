import { GameSeries } from "@/types/draft";
import * as Dialog from "@radix-ui/react-dialog";
import { ExportModal } from "./Export";
import { ImportModal } from "./Import";

export interface ModalPageProps {
	closeModal: () => void;
	label: "Import" | "Export";
	importDraft: (param: GameSeries) => void;
};

export interface ImportModalProps {
  closeModal: () => void;
	label: "Import" | "Export";
  onSubmit: (param: GameSeries) => void;
}

export interface ExportModalProps {
  closeModal: () => void;
	label: "Import" | "Export";
}

export function Modal({ closeModal, label, importDraft }: ModalPageProps) {

  const ModalMap = {
    "Import": <ImportModal closeModal={closeModal} label={label} onSubmit={importDraft} />,
    "Export": <ExportModal closeModal={closeModal} label={label} /> 
  };

  return (
    <Dialog.Content className="w-full h-full bg-slate-700 bg-opacity-90 z-10  flex flex-col items-center content-center fixed">
      { ModalMap[label] }
    </Dialog.Content>
  );
}
