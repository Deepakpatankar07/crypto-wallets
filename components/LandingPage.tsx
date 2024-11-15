import React from 'react'
import { TbBrandTorchain } from 'react-icons/tb'
interface LandingPageProps {
    goToNextSlide: () => void;
  }
  
  const LandingPage: React.FC<LandingPageProps> = ({ goToNextSlide }) => {
    return (
    <div className="flex flex-col justify-center items-center gap-5 mt-14">
      <TbBrandTorchain className="text-white text-6xl font-bold  bg-gradient-to-t from-amber-500 to-amber-300 rounded" />
          {/* <h1 className="text-4xl font-bold  bg-gradient-to-t from-amber-500 to-amber-100 bg-clip-text text-transparent">Dwallet</h1> */}
        <h2 className="text-5xl font-semibold">Welcome to Dwallet</h2>
        <p className="text-stone-300 max-w-screen-sm">
          Dwallet is a decentralized multi-chain wallet that allows you to manage your
          blockchain wallets and secret phrases.
        </p>
        <div className='mt-12'>
          <button onClick={goToNextSlide}
            className="bg-slate-200 hover:bg-slate-300 text-black py-2 px-8 rounded"
          >
            Create a new wallet
          </button>
        </div>
      </div>
  )
}

export default LandingPage