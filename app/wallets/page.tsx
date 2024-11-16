"use client";
import EthereumWallet from "@/components/EthereumWallet";
import SecretPhrase from "@/components/SecretPhrase";
import SolanaWallet from "@/components/SolanaWallet";
import { useMnemonic } from "@/contexts/MnemonicContext";
import CryptoJS from "crypto-js";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { LiaEthereum } from "react-icons/lia";
import { SiSolana } from "react-icons/si";
import { TbBrandTorchain } from "react-icons/tb";

const SolWallet = () => {
  const [selectWallet, setSelectWallet] = useState("");
  const { mnemonic, setMnemonic } = useMnemonic();

  const decryptData = (encryptedData: string, key: string): string | null => {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, key);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return decrypted || null;
      } catch (error) {
        console.error("Decryption failed:", error);
        return null;
      }
    };
  useEffect(() => {
    const encryptedMnemonic = localStorage.getItem("encryptedMnemonic");

    if (encryptedMnemonic) {
      const decryptedMnemonic = decryptData(
        encryptedMnemonic,
        process.env.NEXT_PUBLIC_ENCRYPTION_KEY || ""
      );

      if (decryptedMnemonic) {
        setMnemonic(decryptedMnemonic);
      } else {
        console.error("Failed to decrypt mnemonic.");
        redirect("/");
      }
    } else if (!mnemonic) {
      console.error("Mnemonic is not available.");
      redirect("/");
    }
  }, [mnemonic, setMnemonic]);

  return (
    <div className="min-h-screen text-white px-10 pb-10">
      <header className="flex items-center justify-between py-10">
        <div className="flex gap-3 items-center">
          <TbBrandTorchain className="text-white text-4xl font-bold  bg-gradient-to-t from-amber-500 to-amber-300 rounded" />
          <h1 className="text-4xl font-bold  bg-gradient-to-t from-amber-500 to-amber-100 bg-clip-text text-transparent">Dwallet</h1>
        </div>
        {/* <span className="bg-gray-800 py-1 px-3 rounded">v1.3</span> */}
      </header>

      <SecretPhrase />

      <div className="p-4 mt-6 rounded-lg border border-zinc-800">
        <h1 className="text-3xl font-semibold">Select Wallet</h1>
        <div className="flex items-center gap-4 mt-4">
          <div
          onClick={() => setSelectWallet("solana")}
          className="bg-neutral-800 hover:bg-neutral-900 text-white py-2 px-4 rounded flex gap-4 items-center">
            <SiSolana className="text-cyan-500 text-xl"/>
            <p className="select-none">Solana</p>
          </div>
          <div
          onClick={() => setSelectWallet("ethereum")}
          className="bg-neutral-800 hover:bg-neutral-900 text-white py-2 px-4 rounded flex gap-2 items-center">
            <LiaEthereum className="text-cyan-500 text-2xl"/>
            <p className="select-none">Ethereum</p>
          </div>
        </div>
      </div>

      {
        selectWallet === "solana" ?
        <SolanaWallet />
        : selectWallet === "ethereum" ?
        <EthereumWallet />
        : null
      }
    </div>
  );
};

export default SolWallet;
