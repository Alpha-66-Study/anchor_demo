use anchor_lang::prelude::*;

declare_id!("GSFGU7iwVFcuMzwm8gfcXPQqkhX1ZyhV4H2yUKtyr3Ly");

#[program]
pub mod anchor_demo {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
