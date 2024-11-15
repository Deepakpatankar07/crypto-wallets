"use client";
import React, { useState } from "react";
import { TbBrandTorchain } from "react-icons/tb";
import { SiSolana } from "react-icons/si";
import { LiaEthereum } from "react-icons/lia";
import SecretPhrase from "@/components/SecretPhrase";
import SolanaWallet from "@/components/SolanaWallet";

const SolWallet = () => {
  const [selectWallet, setSelectWallet] = useState("")
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
            <p>Solana</p>
          </div>
          <div
          onClick={() => setSelectWallet("ethereum")}
          className="bg-neutral-800 hover:bg-neutral-900 text-white py-2 px-4 rounded flex gap-2 items-center">
            <LiaEthereum className="text-cyan-500 text-2xl"/>
            <p>Ethereum</p>
          </div>
        </div>
      </div>

      {
        selectWallet === "solana" ?
        <SolanaWallet />
        : selectWallet === "ethereum" ?
        <>
        <div className="pb-4 mt-10">
        <div className="flex justify-between items-center px-4">
          <h2 className="text-4xl font-bold">Ethereum Wallet</h2>
          <div className="flex space-x-2">
            <button
              // onClick={handleAddWallet}
              className="bg-slate-200 hover:bg-slate-300 text-black py-2 px-4 rounded"
            >
              Add Wallet
            </button>
            <button
              // onClick={clearWallets}
              className="bg-rose-800 hover:bg-rose-900 text-white py-2 px-4 rounded"
            >
              Clear Wallets
            </button>
          </div>
        </div>
        <div className="p-8 mt-6 rounded-lg border border-zinc-800 flex justify-center">
          <p className=" text-stone-300">
            The Ethereum wallet is currently under development.
          </p>
        </div>
    </div>
        </>
        : null
      }
    </div>
  );
};

export default SolWallet;
