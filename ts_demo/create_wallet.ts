import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import fs from "fs";

const wallet = Keypair.generate();

console.log("新钱包创建成功！");
console.log("Public Key:", wallet.publicKey.toBase58());
console.log("Private Key (base58):", bs58.encode(wallet.secretKey));

// save to file
const privateKey58 = bs58.encode(wallet.secretKey);
fs.writeFileSync("wallet.txt", privateKey58);
console.log("私钥已保存到 wallet.txt");


// recover from file
const savedKey58 = fs.readFileSync("wallet.txt", "utf-8");
const recoveredSecretKey = bs58.decode(savedKey58);
const recoveredWallet = Keypair.fromSecretKey(recoveredSecretKey);

console.log("钱包恢复成功！");
console.log("Recovered Public Key:", recoveredWallet.publicKey.toBase58());

// transform wallet type
console.log("原始私钥:", wallet.secretKey);
console.log("Base58 编码后的私钥:", privateKey58);
const decoded = bs58.decode(privateKey58);
console.log("解码后的原始私钥:", Uint8Array.from(decoded));