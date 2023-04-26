import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { BiLinkAlt } from "react-icons/bi";

interface ModalProps {
	closeModal: () => void;
	label: string;
	onSubmitModal: () => void;
}

export function Modal({ closeModal, label, onSubmitModal }: ModalProps) {
  const [draftString, setDraftString] = useState("");

  return (
    <Dialog.Content className="w-full h-full bg-slate-700 bg-opacity-90 z-10  flex flex-col items-center content-center fixed">
      <div className="flex font-bold text-gray-800 mt-10 bg-slate-400 w-4/12 opacity-100 rounded-lg h-48 flex-col justify-between border-gray-700 p-8">
        <Dialog.Close
          className="font-bold text-white self-end text-lg"
          onClick={() => closeModal()}
        >
					X
        </Dialog.Close>
        <p className="text-white mb-4 drop-shadow-lg shadow-black text-lg">{label} Draft</p>
        <div className="flex mt-4 w-full items-center justify-between gap-2">
          <div className="p-4 h-12 rounded-md w-full flex items-center bg-white">
            <BiLinkAlt
              size={18}
              className="mr-2"
            />
            <input
              className="p-2 font-mono font-normal w-full outline-none bg-transparent"
              type="text"
              value={draftString}
              onChange={(e) => setDraftString(e.target.value)}
            />
          </div>
          <button
            className="w-32 h-12 rounded-lg bg-green-500 opacity-100 font-bold text-white hover:bg-green-600 transition-colors"
            onClick={() => {
              onSubmitModal();
              closeModal();
            }}
          >OK</button>
        </div>
      </div>
    </Dialog.Content>
  );
}
