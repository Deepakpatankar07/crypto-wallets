

// lib/index.ts
import bs58 from 'bs58';
import nacl from "tweetnacl";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";


export const deriveWalletFromPath = (mnemonic: string, index: number) => {
    const seed = mnemonicToSeedSync(mnemonic); // Convert mnemonic to seed
    const path = `m/44'/501'/${index}'/0'`; // Derivation path for unique wallet
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const privateKeyArray = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    // Convert to Base58
    const secret = bs58.encode(privateKeyArray);
    const pubKey = Keypair.fromSecretKey(privateKeyArray).publicKey.toBase58();
  
    return { pubKey, secret };
};
  


// // To retrieve and parse it back to an array from localStorage:
// export function getMnemonicArray(): string[] | null {
//     const storedMnemonic = localStorage.getItem("mnemonics");
//     return storedMnemonic ? JSON.parse(storedMnemonic) : null;
// }
