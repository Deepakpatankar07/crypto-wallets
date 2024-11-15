"use client";
import { useMnemonic } from '@/contexts/MnemonicContext';
import React, { useState } from 'react';
import { LiaClipboardListSolid } from "react-icons/lia";

const SecretPhrase: React.FC = () => {
  const { mnemonic } = useMnemonic();
  const [isSecretVisible, setIsSecretVisible] = useState(false);

  const toggleSecretVisibility = () => {
    setIsSecretVisible(!isSecretVisible);
  };

  const handleCopy = () => {
    if (mnemonic) {
      navigator.clipboard.writeText(mnemonic);
    }
  };

  return (
    // {/* Secret Phrase Section */}
       <div className="p-4 rounded-lg border border-zinc-800">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Your Secret Phrase</h2>
      <button
        onClick={toggleSecretVisibility}
        className="text-sm text-blue-400 hover:text-slate-200 focus:outline-none px-4 py-2 rounded hover:bg-slate-800"
      >
        {isSecretVisible ? "Hide" : "View"}
      </button>
    </div>
     

      {isSecretVisible && (
        <>
          <div className="mt-4 rounded-lg grid grid-cols-4 gap-4">
            {mnemonic && mnemonic.split(' ').map((word: string, index: number) => (
              <div key={index} className="px-2 py-4 bg-zinc-800 rounded text-center text-white">
                {word}
              </div>
            ))}
          </div>
          <button
            onClick={handleCopy}
            className="mt-4 text-gray-400 flex items-center justify-center gap-2 text-sm bg-zinc-800 p-2 rounded hover:bg-zinc-700"
          >
            <LiaClipboardListSolid className='text-xl'/> Copy Secret Phrase
          </button>
        </>
      )}
    </div>
  );
};

export default SecretPhrase;



// "use client";
// import { useMnemonic } from '@/contexts/MnemonicContext';
// import React, { useState } from 'react'

// const SecretPhrase = () => {
//   const { mnemonic } = useMnemonic();

//     const [isSecretVisible, setIsSecretVisible] = useState(false);
//     const toggleSecretVisibility = () => {
//         setIsSecretVisible(!isSecretVisible);
//       };
//   return (
//     <>
//     {/* Secret Phrase Section */}
//     <div className="p-4 rounded-lg border border-zinc-800">
//     <div className="flex justify-between items-center">
//       <h2 className="text-xl font-semibold">Your Secret Phrase</h2>
//       <button
//         onClick={toggleSecretVisibility}
//         className="text-sm text-blue-400 hover:text-blue-600 focus:outline-none px-4 py-2 rounded hover:bg-slate-800"
//       >
//         {isSecretVisible ? "Hide" : "View"}
//       </button>
//     </div>

//     {isSecretVisible && (
//       <div className="mt-4 p-3 rounded">
//         <p>{mnemonic}</p>
//       </div>
//     )}
//   </div>
//   </>
//   )
// }

// export default SecretPhrase