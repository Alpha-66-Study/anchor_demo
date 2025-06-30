use anchor_lang::prelude::*;

declare_id!("GSFGU7iwVFcuMzwm8gfcXPQqkhX1ZyhV4H2yUKtyr3Ly");

#[program]
pub mod anchor_demo {
    use super::*;

    // 初始化计数器账户
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.counter.count = 0;
        Ok(())
    }

    // 增加计数器
    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        ctx.accounts.counter.count += 1;
        Ok(())
    }
}

// 初始化账户结构
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// 更新账户结构
#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>,
}

// 数据账户
#[account]
pub struct Counter {
    pub count: u64,
}
