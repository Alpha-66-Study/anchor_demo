# 发送交易
solana中有两种不同的发送交易的方法 `sendAndConfirmTransaction()` 和 `sendRawTransaction()`。

## 1. sendAndConfirmTransaction
这个方法是最常用的方法，因为它封装了：
- 交易构造（包含 blockhash）
- 签名
- 发送交易
- 等待确认


```ts
// 参考 ts_demo/send_tx.ts
const instruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: receiver,
  lamports: 0.001 * LAMPORTS_PER_SOL,
});

const transaction = new Transaction().add(instruction);
console.log("正在发送交易...");
const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);
console.log("等待交易确认...");
const subscriptionId6 = connection.onSignature(
        signature,
        (signatureResult, context) => {
            console.log("交易确认！");
            console.log("slot:", context.slot);
            console.log("结果:", signatureResult); // { err: null } 表示成功
        },
        "confirmed"
);
```

## 2. sendRawTransaction

还有另一种更底层的发送交易的方法 `sendRawTransaction`，需要你手动处理签名、blockhash 等，我们在第5讲演示过一次。下面的代码可以做到 `sendAndConfirmTransaction` 的功能：

```ts
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
```