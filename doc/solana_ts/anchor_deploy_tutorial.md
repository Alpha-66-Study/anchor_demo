# anchor合约部署教程

## 安装必要工具

```bash
   # 安装 Rust
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

   # 安装 Solana CLI
   sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

   # 安装 Node.js (v18+)
   # 推荐使用 nvm: https://github.com/nvm-sh/nvm

   # 安装 Anchor CLI
   cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
   avm install latest
   avm use latest

```

## 设置 Solana 网络（以 Devnet 为例）：

```
   solana config set --url devnet
   solana-keygen new  # 创建新钱包（保存好助记词！）
   solana airdrop 2   # 获取测试 SOL

```

## 创建anchor项目 & 编写合约

### 创建新项目：

```
   anchor init counter-app
   cd counter-app
```

### 编写合约代码 (programs/counter-app/src/lib.rs)：

### 编写合约测试代码(tests/)

### 更新项目ID

* 复制 Anchor.toml 中的 [programs.localnet] 下的程序ID
* 粘贴到 declare_id! 和 lib.rs 顶部的 declare_id! 中

## 构建 & 测试

```
anchor build
anchor test
```

## 部署合约 & 验证部署

```
anchor deploy --provider.cluster devnet # 部署到devnet
anchor deploy --provider.cluster https://solana.rpc/ # 使用自定义的rpc链接部署合约
solana program show --programs # 验证是否成功部署,在列表中查找你的程序ID
```


