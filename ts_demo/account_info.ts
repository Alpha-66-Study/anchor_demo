import {
    Connection,
    clusterApiUrl,
    Keypair,
    PublicKey,
    LAMPORTS_PER_SOL,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";
import bs58 from "bs58";
import fs from "fs";


const DEV_RPC_URL = 'https://shy-empty-bridge.solana-devnet.quiknode.pro/01d7d4aef2eade46994e08e719a8655123cd1142/'; // Solana  RPC
const pubkey = new PublicKey("J3FYYfPzXc5WGLbh4SSrmqJFU4FdVCQCjbYMYrEqfQv3")

const readAccountInfo = async () => {
    // read account info
    const connection = new Connection(DEV_RPC_URL, "confirmed");
    const accountInfo = await connection.getAccountInfo(pubkey);
    console.log(JSON.stringify(accountInfo, null, 2));

    // createAccount below system account
}

const createAccount = async () => {
    const connection = new Connection(DEV_RPC_URL, "confirmed");
    // 读取已有私钥作为付款账户
    const secretKeyBase58 = fs.readFileSync("wallet.txt", "utf-8");
    const payer = Keypair.fromSecretKey(bs58.decode(secretKeyBase58));

    // 创建新账户
    const newAccount = Keypair.generate();

    // 你可以先用 SystemProgram 作为 owner（表示这个账户没有合约逻辑）
    const programId = SystemProgram.programId;

    // 分配 64 字节空间（可自定义）
    const space = 64;


    // 获取租金豁免所需 lamports
    const lamports = await connection.getMinimumBalanceForRentExemption(space);
    console.log("需要的租金:", lamports / LAMPORTS_PER_SOL, "SOL");

    // 创建指令
    const instruction = SystemProgram.createAccount({
        fromPubkey: payer.publicKey,
        newAccountPubkey: newAccount.publicKey,
        lamports,
        space,
        programId,
    });

    const tx = new Transaction().add(instruction);

    // 发送交易
    console.log("🚀 正在创建账户...");
    const sig = await sendAndConfirmTransaction(connection, tx, [payer, newAccount]);

    console.log("✅ 账户创建成功！");
    const accountAddress = newAccount.publicKey
    console.log("新账户地址:", accountAddress.toBase58());
    console.log("交易哈希:", sig);
    console.log(`🔍 https://solscan.io/tx/${sig}?cluster=mainnet-beta`);

    const accountInfo2 = await connection.getAccountInfo(accountAddress);

    if (!accountInfo2) {
        console.log("❌ 账户不存在或尚未初始化");
        return;
    } else {
        console.log("✅ 账户创建成功");
        console.log(JSON.stringify(accountInfo2, null, 2));
    }

}

// readAccountInfo();
createAccount();