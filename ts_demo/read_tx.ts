import { Connection, VersionedBlockResponse } from "@solana/web3.js";


const DEV_RPC_URL = 'https://shy-empty-bridge.solana-devnet.quiknode.pro/01d7d4aef2eade46994e08e719a8655123cd1142/'; // Solana  RPC
const connection = new Connection(DEV_RPC_URL, "confirmed");

const readTxByTxHash = async () => {

    // 替换为你想查询的交易哈希
    const txSig = "orRwprYQMWAxF6Gpw5bzS5AAgXSDtunG8F1EhtCfbnVyfn4w4bXU1ZcyDPypCoxQmmbzUJe41mxTzcwSh75nQ2H";
    // 读取单笔交易
    const tx = await connection.getTransaction(txSig, {
        maxSupportedTransactionVersion: 0,
    });
    console.log(JSON.stringify(tx, null, 2));

    // 读取单笔交易详情（交易指令解析）
    const parsedTx = await connection.getParsedTransaction(txSig, {
        maxSupportedTransactionVersion: 0,
    });
    console.log(JSON.stringify(parsedTx?.transaction?.message?.instructions, null, 2));
}


readTxByTxHash();