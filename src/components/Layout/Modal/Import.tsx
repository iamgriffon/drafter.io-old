import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BiLinkAlt } from "react-icons/bi";
import { ImportModalProps } from ".";
import { trpc } from "@/utils/trpc";
import { FaSpinner, FaCheck } from "react-icons/fa";

export function ImportModal({ closeModal, label, onSubmit: importDraft }: ImportModalProps) {
  const [draftLink, setDraftLink] = useState("");
  const { isLoading, isSuccess, refetch, data } = trpc.draft.import.useQuery({
    link: draftLink
  },{
    enabled: false,
    refetchOnMount: false
  });

  console.log({isLoading: isLoading, isSuccess: isSuccess});

  async function onImportDraft(){
    await refetch().then(res => {
      if (res.data){
        const x = JSON.parse(JSON.stringify(res.data.data));
        importDraft(x);
      }
    });
    closeModal();
  }

  return (
    <div className="flex font-bold text-gray-800 mt-10 bg-slate-400 w-[45%] opacity-100 rounded-lg h-48 flex-col justify-between border-gray-700 p-8">
      <div className="flex justify-between items-start">
        <p className="text-white mb-4 drop-shadow-lg shadow-black text-lg">
          {label} Draft
        </p>
        <Dialog.Close
          className="font-bold text-white text-lg"
          onClick={() => closeModal()}
        >
					X
        </Dialog.Close>
      </div>

      <div>
        <p className="text-white">Enter your link below</p>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="p-4 h-12 rounded-md w-full flex items-center bg-white">
            <BiLinkAlt
              size={18}
              className="mr-2"
            />
            <input
              className="p-2 font-mono text-sm font-normal w-full outline-none bg-transparent"
              type="text"
              value={draftLink}
              onChange={(e) => setDraftLink(e.target.value)}
            />
          </div>
          <button
            className="w-32 h-12 rounded-lg flex justify-center bg-green-500 opacity-100 font-bold text-white hover:bg-green-600 transition-colors"
            onClick={() => {onImportDraft();}}
          >
            {!isLoading && !data && !!isSuccess ? (
              <FaSpinner className="animate-spin self-center w-6 h-6" />
            ) : !!isSuccess && !isLoading ? (
              <FaCheck className="w-6 h-6 self-center" />
            ) : (
              <p className="self-center">OK</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
