import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import bs58 from "bs58";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
// ethereum
import { HDNodeWallet, Wallet } from "ethers";

export const deriveSolWallet = (mnemonic: string, index: number) => {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error("Invalid mnemonic");
  }
  const seed = bip39.mnemonicToSeedSync(mnemonic); // Convert mnemonic to seed
  const path = `m/44'/501'/${index}'/0'`; // Derivation path for unique wallet
  const derivedSeed = derivePath(path, Buffer.from(seed).toString("hex")).key;
  const privateKeyArray = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  // Secret: Base58-encoded private key
  const secret = bs58.encode(privateKeyArray);

  // Public Key: Base58-encoded public key
  const pubKey = Keypair.fromSecretKey(privateKeyArray).publicKey.toBase58();

  return { pubKey, secret };
};

export function deriveEthWallet(mnemonic: string, index: number) {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error("Invalid mnemonic");
  }
  const seed = bip39.mnemonicToSeedSync(mnemonic); // Convert mnemonic to seed

  // Ethereum derivation path
  const path = `m/44'/60'/${index}'/0/0`;

  // Create HD node from seed and derive key at the path
  const hdNode = HDNodeWallet.fromSeed(seed);
  const { privateKey } = hdNode.derivePath(path);

  // Create wallet and get address
  const { address } = new Wallet(privateKey);

  // Return both private key and public address
  return { privateKey, address };
}

// // To retrieve and parse it back to an array from localStorage:
// export function getMnemonicArray(): string[] | null {
//     const storedMnemonic = localStorage.getItem("mnemonics");
//     return storedMnemonic ? JSON.parse(storedMnemonic) : null;
// }

// const hdkey = require('ethereumjs-wallet/hdkey')
// const privateKey = hdkey.fromMasterSeed('random')._hdkey._privateKey
// const Wallet = require('ethereumjs-wallet').default
// const wallet = Wallet.fromPrivateKey(privateKey)
// wallet.getPublicKeyString()
