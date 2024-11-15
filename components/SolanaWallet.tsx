"use client";

// components/CreateWallet.tsx
import React, { useState } from "react";
import { useMnemonic } from "@/contexts/MnemonicContext";
import { deriveWalletFromPath } from "@/lib";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { redirect } from "next/navigation";

interface Wallet {
  pubKey: string;
  secret: string;
}

const SolanaWallet = () => {
  const { mnemonic } = useMnemonic();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
   
    // Function to toggle visibility
    const togglePrivateKeyVisibility = () => {
      setShowPrivateKey((prev) => !prev);
    };

  const handleAddWallet = () => {
    if (mnemonic) {
      const newWallet = deriveWalletFromPath(mnemonic, wallets.length); // Derive a new wallet with incremented index
      setWallets([...wallets, newWallet]);
    }else {
      console.error("Mnemonic is not available.");
      redirect("/"); // Redirect to home page
    }
  };
  const clearWallets = () => setWallets([]);
  const dltWallet = (index: number) => {
    setWallets((prev) => prev.filter((_, i) => i !== index));
  }
  return (
    <>
    {/* Solana Wallet Section */}
    <div className="pb-4 mt-10">
        <div className="flex justify-between items-center px-4">
          <h2 className="text-4xl font-bold">Solana Wallet</h2>
          <div className="flex space-x-2">
            <button
              onClick={handleAddWallet}
              className="bg-slate-200 hover:bg-slate-300 text-black py-2 px-4 rounded"
            >
              Add Wallet
            </button>
            <button
              onClick={clearWallets}
              className="bg-rose-800 hover:bg-rose-900 text-white py-2 px-4 rounded"
            >
              Clear Wallets
            </button>
          </div>
        </div>
    </div>
      
        {/* Wallet List */}
        <div className="mt-6 space-y-4">
          {wallets.map((wallet,index) => (
            <div
              key={index}
              className="pt-4 rounded-lg border border-zinc-800 shadow-md"
            >
              <div className="flex justify-between items-center pb-4 px-4">
                <h2 className="text-2xl font-semibold">Wallet {index + 1}</h2>
                <button onClick={()=>dltWallet(index)} className="text-red-500 hover:text-red-700">🗑️</button>
              </div>

              {/* Public and Private Key Sections */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-900">
                <div className="mt-4 p-4 ">
                  <h4 className="text-lg font-medium">Public Key</h4>
                  <p className="truncate">{wallet.pubKey}</p>
                </div>

                <div className="mt-4 p-4 ">
                  <h4 className="text-lg font-medium">Private Key</h4>
                  <div className="flex items-center justify-between">
                    <p className="truncate">
                      {showPrivateKey ? (
                        wallet.secret
                      ) : (
                        <span className="text-lg tracking-widest">
                          ••••••••••••••••••••••••••••••••••••
                        </span>
                      )}
                    </p>
                    <button
                      onClick={togglePrivateKeyVisibility}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      {showPrivateKey ? <BsEyeSlash /> : <BsEye />}{" "}
                      {/* Replace with icons as desired */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    </>
  );
};

export default SolanaWallet;
