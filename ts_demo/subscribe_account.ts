import { Connection, PublicKey, VersionedBlockResponse } from "@solana/web3.js";
// import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const MAIN_RPC_URL = 'https://wider-hardworking-hexagon.solana-mainnet.quiknode.pro/35e0f6a576ee830a77740965af8553d858cf38f2/'; // Solana  RPC
const connection = new Connection(MAIN_RPC_URL, "confirmed");



const pubkey = new PublicKey("62qc2CNXwrYqQScmEdiZFFAnJR262PxWEuNQtxfafNgV");

// 注册订阅，感受一下什么叫躺着赚钱
const subscriptionId = connection.onAccountChange(pubkey, (updatedAccountInfo, context) => {
    console.log("账户发生变化！");
    console.log("最新账户信息:", updatedAccountInfo);
    console.log("上下文信息:", context);
});

console.log("开始监听pumpfun账户变化...");
console.log("订阅ID:", subscriptionId);


// const subscriptionId1 = connection.onProgramAccountChange(
//     TOKEN_PROGRAM_ID,
//     (keyedAccountInfo) => {
//         const accountPubkey = keyedAccountInfo.accountId.toBase58();
//         console.log(`代币账户 ${accountPubkey} 更新！`);
//         const accountInfo = AccountLayout.decode(keyedAccountInfo.accountInfo.data);
//         console.log(`mint ${accountInfo.mint.toBase58()}`);
//         console.log(`owner ${accountInfo.owner.toBase58()}`);
//         console.log(`amount ${accountInfo.amount}`);
//     },
//     "confirmed"
// );

// console.log("开始监听所有token账户变化...");
// console.log("订阅ID:", subscriptionId1);