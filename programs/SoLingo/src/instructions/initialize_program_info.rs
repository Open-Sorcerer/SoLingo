use anchor_lang::prelude::*;
use crate::state::{QuestionProgramInfo};

#[derive(Accounts)]
pub struct Initialize<'info> {

    #[account(mut)]
    author: Signer<'info>,

    #[account(init, payer = author, seeds = [b"question_program_info"], bump, space = 8 + QuestionProgramInfo::MAXIMUM_SPACE)]
    program_info: Account<'info, QuestionProgramInfo>,

    system_program: Program<'info, System>,
}

pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
    ctx.accounts.program_info.set_inner(
        QuestionProgramInfo::new(
            ctx.accounts.author.key(),
            *ctx.bumps.get("program_info").unwrap(),
            Default::default(),
        )
    );

    Ok(())
}