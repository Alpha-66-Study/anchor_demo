import { Connection, SystemProgram, PublicKey, sendAndConfirmTransaction, LAMPORTS_PER_SOL, Keypair, Transaction, VersionedBlockResponse } from "@solana/web3.js";
import bs58 from "bs58";
import fs from "fs";


const DEV_RPC_URL = 'https://shy-empty-bridge.solana-devnet.quiknode.pro/01d7d4aef2eade46994e08e719a8655123cd1142/'; // Solana  RPC
const connection = new Connection(DEV_RPC_URL, "confirmed");


// 接收者地址（可以改为你的另一个钱包）
const receiver = new PublicKey("4xxeGf2jZAyLVW1sEELTJy2Fd4hwRerNTDCg8ZQuH4tn");
const secretKeyBase58 = fs.readFileSync("wallet.txt", "utf-8");
const sender = Keypair.fromSecretKey(bs58.decode(secretKeyBase58));
console.log("Sender Public Key:", sender.publicKey.toBase58());



const sendTx = async () => {
    const instruction = SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: receiver,
        lamports: 0.001 * LAMPORTS_PER_SOL,
    });

    const transaction = new Transaction().add(instruction);
    console.log("正在发送交易...");
    const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);

    console.log("等待交易确认...");
    // const confirmation = await connection.confirmTransaction(signature, "confirmed");
    // if (confirmation.value.err) {
    //     console.error("交易失败:", confirmation.value.err);
    // } else {
    //     console.log("交易成功确认！");
    //     console.log("交易签名:", signature);
    // }
    // 使用监听的形式进行交易确认
    const subscriptionId6 = connection.onSignature(
        signature,
        (signatureResult, context) => {
            console.log("交易确认！");
            console.log("slot:", context.slot);
            console.log("结果:", signatureResult); // { err: null } 表示成功
        },
        "confirmed"
    );

}

const sendRawTx = async () => {

    const instruction = SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: receiver,
        lamports: 0.001 * LAMPORTS_PER_SOL,
    });

    // 创建交易
    const transaction = new Transaction().add(instruction);

    // 获取最新的 blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = sender.publicKey;

    // 签名交易
    transaction.sign(sender);

    // 序列化交易，转换为Buffer类型
    const serializedTransaction = transaction.serialize();

    // 使用 sendRawTransaction 发送交易
    console.log("正在发送交易...");
    const signature = await connection.sendRawTransaction(serializedTransaction, {
        skipPreflight: true, // 是否跳过预检查，用于加速
        preflightCommitment: "confirmed", // 预检查的确认级别
        maxRetries: 0, // 最大重试次数
    });

    console.log("交易已发送，签名:", signature);

    // 8. 等待交易确认
    console.log("等待交易确认...");
    const confirmation = await connection.confirmTransaction(signature, "confirmed");

    if (confirmation.value.err) {
        console.error("交易失败:", confirmation.value.err);
    } else {
        console.log("交易成功确认！");
        console.log("交易签名:", signature);
    }

}

sendTx();
// sendRawTx();