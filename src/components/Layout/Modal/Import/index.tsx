import { ChangeEvent, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BiLinkAlt } from "react-icons/bi";
import { ImportModalProps } from "..";
import { trpc } from "@/utils/trpc";
import { FaSpinner, FaCheck } from "react-icons/fa";
import { TbError404 } from "react-icons/tb";
import { useDraft } from "@/context/DraftContext";

interface ButtonStepMap {
  [key: number]: JSX.Element;
}

export function ImportModal({
  closeModal,
  label,
  onSubmit: importDraft,
  link,
}: ImportModalProps) {
  const [draftLink, setDraftLink] = useState(link);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { setId } = useDraft();
  const [step, setStep] = useState(1);
  const { isLoading, isSuccess, refetch } = trpc.draft.import.useQuery(
    {
      link: draftLink,
    },
    {
      enabled: false,
      refetchOnMount: false,
    }
  );
  const hasError = errorMessage.trim().length && !isLoading;

  useEffect(() => {
    setLoading(() => isLoading);
    setSuccess(() => isSuccess);
  }, [isLoading, isSuccess]);

  useEffect(() => {
    setLoading(false);
    setSuccess(false);
    setStep(0);
  }, []);

  async function onImportDraft() {
    setErrorMessage("");
    if (!draftLink.includes("https://")) {
      setDraftLink((prevState) => `https://drafter.io/${prevState}`);
    };
    setStep(1);
    return await refetch().then((res) => {
      if (res.data?.data) {
        importDraft(JSON.parse(JSON.stringify(res.data?.data)));
        setId(res.data.id);
        setStep(2);
        setTimeout(() => {
          closeModal();
        }, 200);
      } else if (res.error) {
        setErrorMessage(res.error.message);
      }
    });
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    if (hasError && !draftLink.trim().length) {
      setDraftLink("");
    } else {
      setDraftLink(event.target.value);
    }
  }

  const buttonStepMap: ButtonStepMap  = {
    0:  <p onClick={async () => await onImportDraft()} className="self-center">GO!</p>,
    1: <FaSpinner className="animate-spin self-center w-6 h-6" />,
    2: <FaCheck onClick={() => closeModal()} className="w-6 h-6 self-center" />
  };

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
              onChange={(e) => onChange(e)}
            />
          </div>
          {!errorMessage.trim().length ? (
            <button
              className="w-32 h-12 rounded-lg flex justify-center bg-green-500 opacity-100 font-bold text-white hover:bg-green-600 transition-colors"
            >
              { buttonStepMap[step] }
            </button>
          ) : (
            <button
              className="w-32 h-12 rounded-lg flex justify-center bg-red-500 opacity-100 font-bold text-white hover:bg-red-600 transition-colors"
              onClick={() => {
                onImportDraft();
              }}
            >
              <TbError404 className="w-6 h-6 self-center" />
            </button>
          )}
        </div>
      </div>
      {errorMessage.trim().length ? (
        <p className="text-red-500 mt-1">* {errorMessage}</p>
      ) : null}
    </div>
  );
}
