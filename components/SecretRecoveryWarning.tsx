import React, { useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { MdLock } from "react-icons/md";
interface PageProps {
  goToNextSlide: () => void;
}

const SecretRecoveryWarning: React.FC<PageProps> = ({ goToNextSlide }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleNextClick = () => {
    if (isChecked) {
      // Navigate to the next step or perform the next action
      console.log("Proceeding to the next step");
      goToNextSlide();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="text-center py-10 max-w-lg">
        <h1 className="text-3xl font-semibold">
          Secret Recovery Phrase Warning
        </h1>
        <p className="text-gray-400 mt-4">
          On the next page, you will <span className="font-semibold">Generate</span> your secret recovery phrase.
        </p>

        <div className="mt-6 space-y-4 px-4">
          <div className="flex items-center p-4 bg-zinc-800 rounded-lg">
            <AiOutlineWarning className="text-yellow-500 text-2xl mr-3" />
            <p>
              This is the <span className="font-semibold">ONLY</span> way to
              recover your account if you lose access to your device or
              password.
            </p>
          </div>
          <div className="flex items-center p-4 bg-zinc-800 rounded-lg">
            <MdLock className="text-green-500 text-2xl mr-3" />
            <p>
              Write it down, store it in a safe place, and{" "}
              <span className="font-semibold">NEVER</span> share it with anyone.
            </p>
          </div>
        </div>

        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            id="acknowledgment"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="w-10 h-10 text-blue-600 bg-gray-700 rounded border-gray-600 focus:ring-blue-500"
          />
          <label htmlFor="acknowledgment" className="ml-3 text-gray-300">
            I understand that I am responsible for saving my secret recovery
            phrase, and that it is the only way to recover my wallet.
          </label>
        </div>

        <button
          onClick={handleNextClick}
          disabled={!isChecked}
          className={`w-full py-3 mt-6 text-white rounded ${
            isChecked
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SecretRecoveryWarning;
