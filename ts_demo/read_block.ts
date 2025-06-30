import { Connection, VersionedBlockResponse } from "@solana/web3.js";


const DEV_RPC_URL = 'https://shy-empty-bridge.solana-devnet.quiknode.pro/01d7d4aef2eade46994e08e719a8655123cd1142/'; // Solana  RPC
const connection = new Connection(DEV_RPC_URL, "confirmed");


const readBlock = async () => {
    // 读取区块
    // 获取最新 slot
    const slot = await connection.getSlot();

    // 获取对应区块
    const block = await connection.getBlock(slot, {
        maxSupportedTransactionVersion: 0,
    });

    if (!block || block.transactions.length === 0) {
        console.log("该区块为空");
    } else {
        console.log(`区块 Slot: ${slot}`);
        console.log(JSON.stringify(block, null, 2));
    }
}


readBlock();