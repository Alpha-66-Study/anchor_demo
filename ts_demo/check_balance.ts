import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

// 配置参数
const RPC_URL = 'https://wider-hardworking-hexagon.solana-mainnet.quiknode.pro/35e0f6a576ee830a77740965af8553d858cf38f2/'; // Solana 主网 RPC
const WALLET_ADDRESS = 'EZxHETJpW1wbGVspyLAVV5nvLMUhQ5NcAA1XLdQwU1cm'; // 替换为要查询的地址

async function checkSolBalance() {
    try {
        // 创建 Solana 网络连接
        const connection = new Connection(RPC_URL, 'confirmed');

        // 验证地址有效性
        let publicKey;
        try {
            publicKey = new PublicKey(WALLET_ADDRESS);
        } catch (err) {
            throw new Error('❌ 无效的 Solana 钱包地址');
        }

        console.log(`🔍 正在查询地址: ${publicKey.toString()}`);

        // 获取余额（单位为 Lamports）
        const balance = await connection.getBalance(publicKey);

        // 转换为 SOL 并显示
        console.log(`✅ 余额查询成功！`);
        console.log(`🪙 Lamports 余额: ${balance}`);
        console.log(`◎ SOL 余额: ${balance / LAMPORTS_PER_SOL}`);

    } catch (error) {
        console.error(`⚠️ 错误: ${(error as Error).message}`);
    }
}

// 执行查询
checkSolBalance();