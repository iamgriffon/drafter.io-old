import * as Dialog from "@radix-ui/react-dialog";
import { ImCross } from "react-icons/im";
import { ConfirmModalProps } from "..";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { useState } from "react";

export function ConfirmModal({ closeModal, label, name, onAccept }: ConfirmModalProps) {
  const [step, setStep] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  function handleClick(){
    setStep(1);
    onAccept(() => {
      if (label === "Delete") setSuccessMessage("Sucessfuly Deleted!");
      if (label === "Update") setSuccessMessage("Sucessfuly Updated!");
      setStep(2);
    });
  }

  interface ButtonStepMap {
    [key: number]: JSX.Element;
  }
  
  const buttonStepMap: ButtonStepMap  = {
    0: <FaCheck onClick={() => handleClick()} className="w-6 h-6 self-center" />,
    1: <FaSpinner className="animate-spin self-center w-6 h-6" />,
    2: <FaCheck onClick={() => closeModal()} className="w-6 h-6 self-center" />,
  };

  return (
    <div className="flex font-bold text-gray-800 mt-10 bg-slate-400 w-1/4 opacity-100 rounded-lg h-56 flex-col justify-between border-gray-700 p-8">
      <div className="flex justify-between items-start">
        <div className="flex flex-col text-white mb-4 drop-shadow-lg shadow-black text-lg">
          {label} Draft: <p className="font-thin">{name}</p>
        </div>
        <Dialog.Close
          className="font-bold text-white text-lg"
          onClick={() => closeModal()}
        >
					X
        </Dialog.Close>
      </div>
      <div>
        <p className="text-white">Are you sure about that?</p>
        <div className="flex w-full items-center justify-between gap-2 mt-2">
          <button className="w-32 h-12 rounded-lg flex justify-center bg-green-500 opacity-100 font-bold text-white hover:bg-green-600 transition-colors">
            { buttonStepMap[step] }
          </button>
          <button className="w-32 h-12 rounded-lg flex justify-center bg-red-500 opacity-100 font-bold text-white hover:bg-red-600 transition-colors">
            <ImCross
              onClick={() => closeModal()}
              className="w-6 h-6 self-center"
            />
          </button>
        </div>
      </div>
      {successMessage.trim().length > 0 ? (
        <p className="mt-1 text-green-200">{successMessage}</p>
      ) : null}
    </div>
  );
}
