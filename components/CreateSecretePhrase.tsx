"use client";
import { useMnemonic } from "@/contexts/MnemonicContext";
import { generateMnemonic } from "bip39";
import CryptoJS from "crypto-js";
import { redirect } from "next/navigation";
import { TbBrandTorchain } from "react-icons/tb";


const CreateSecretPhrase = () => {
  const { setMnemonic } = useMnemonic();

  // Function to encrypt data
  const encryptData = (data: string) => {
    return CryptoJS.AES.encrypt(data, process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "").toString();
  };

  // Function to decrypt data
  const decryptData = (encryptedData: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "");
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  // Function to handle mnemonic setup
  const handleMnemonicSetup = () => {
    const encryptedMnemonic = localStorage.getItem("encryptedMnemonic");

    if (encryptedMnemonic) {
      // Decrypt and set the mnemonic from localStorage
      const decryptedMnemonic = decryptData(encryptedMnemonic);
      if (decryptedMnemonic) {
        setMnemonic(decryptedMnemonic); // Set in context
        redirect("/wallets"); // Navigate to next page
        return;
      }
    }

    // Generate new mnemonic if none exists
    const newMnemonic = generateMnemonic();
    const encryptedNewMnemonic = encryptData(newMnemonic);
    localStorage.setItem("encryptedMnemonic", encryptedNewMnemonic); // Save encrypted mnemonic
    setMnemonic(newMnemonic); // Set in context
    redirect("/wallets"); // Navigate to next page
  };

  return (
    <div className="text-white px-10 pb-10 w-screen">
      <header className="flex items-center justify-between py-10">
        <div className="flex gap-3 items-center">
        <TbBrandTorchain className="text-white text-4xl font-bold  bg-gradient-to-t from-amber-500 to-amber-300 rounded" />
        <h1 className="text-4xl font-bold  bg-gradient-to-t from-amber-500 to-amber-100 bg-clip-text text-transparent">Dwallet</h1>
        </div>
        {/* <span className="bg-gray-800 py-1 px-3 rounded">v1.3</span> */}
      </header>
      <h1 className="text-4xl mt-6">Generate Secret Phrase</h1>
      <p className="mt-4 text-stone-300">
        A secret phrase is used to recover your wallet. Make sure to store it in
        a safe place.
      </p>
      <button
        onClick={handleMnemonicSetup}
        className="bg-slate-200 hover:bg-slate-300 text-black mt-10 py-2 px-8 rounded"
      >
        Create
      </button>
    </div>
  );
};

export default CreateSecretPhrase;
