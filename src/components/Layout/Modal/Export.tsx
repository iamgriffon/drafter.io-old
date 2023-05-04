import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { BiLinkAlt } from "react-icons/bi";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { ExportModalProps } from ".";
import { v4 as uuid } from "uuid";
import { trpc } from "@/utils/trpc";
import { useMenu } from "@/context/MenuContext";
import { useUser } from "@clerk/nextjs";
import { validateGameSeries } from "@/utils/checkForDraft";
import { GameSeries } from "@/types/draft";

export function ExportModal({ closeModal, label }: ExportModalProps) {
  const { mutate, isLoading, isSuccess } = trpc.draft.export.useMutation();
  const [draftLink, setDraftLink] = useState("Your link will appear here");
  const [draftString, setDraftString] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { matches } = useMenu();
  const draftSlug = () => uuid().substring(12);
  const { user } = useUser();
  const isDraftValid = validateGameSeries(matches);

  useEffect(() => {
    console.log({ isLoading: isLoading, isSuccess: isSuccess });
  }, [isLoading, isSuccess]);

  let user_id: string;
  let draft: GameSeries;

  function exportDraft() {
    const link = `https://drafter.io/${draftSlug}`;
    if (user) user_id = user.id;
   
    if (isDraftValid) draft = matches;
    console.log({matches: matches});
    errorMessage();
    if (!isDraftValid || user_id.length == 0 || draftString.length < 4) return;

    console.log({ data: draft, link, name: draftString, user_id });
    mutate({
    	draft,
    	link,
    	name: draftString,
    	user_id,
    });

    if (isSuccess){
      setDraftLink(link);
    }
  }

  function errorMessage() {
    if (!isDraftValid) setErrorMsg("Error: Incomplete Draft");
    if (draftString.length < 4)
      setErrorMsg("Error: A Draft name must be at least 4 characters long");
  }

  return (
    <div className="flex font-bold text-gray-800 mt-10 bg-slate-400 w-4/12 opacity-100 rounded-lg h-72 flex-col justify-between border-gray-700 p-8">
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

      <div className="flex flex-col gap-2">
        <p className="text-white">Give your Draft a name:</p>
        <div className="p-4 h-12 rounded-md w-full flex items-center bg-white">
          <input
            className="p-2 font-mono font-normal w-full outline-none bg-transparent"
            type="text"
            value={draftString}
            onChange={(e) => setDraftString(e.target.value)}
          />
        </div>
        <p className="text-white">Link</p>
        <div className="flex w-full items-center justify-between gap-2">
          <div
            className="p-4 h-12 rounded-md w-full flex items-center bg-white aria-disabled:bg-gray-400 aria-disabled:cursor-not-allowed aria-disabled:border-gray-500 aria-disabled:border-2"
            aria-disabled={!isLoading}
          >
            <BiLinkAlt
              size={18}
              className="mr-2"
            />
            <input
              className="p-2 font-mono font-normal w-full outline-none bg-transparent disabled:cursor-not-allowed"
              type="text"
              value={draftLink}
              disabled={!isLoading}
            />
          </div>
          <div>
            <button onClick={() => { isSuccess ? closeModal() : exportDraft();}}
              className="w-12 h-12 flex items-center justify-center rounded-lg bg-green-500 opacity-100 font-bold text-white hover:bg-green-600 transition-colors"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin self-center w-6 h-6" />
              ) : isSuccess ? (
                <FaCheck className="w-6 h-6 self-center" />
              ) : (
                <p onClick={() => closeModal()}>OK</p>
              )}
            </button>
          </div>
        </div>
        {errorMsg ? (
          <p className="text-red-400">{ "*" + errorMsg}</p>
        ) : null}
      </div>
    </div>
  );
}
