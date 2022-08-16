use anchor_lang::prelude::*;
use crate::state::UserQuizStats;

/**
 * IncrementLevel
 *
 * This instruction increases the level of a user
 */
#[derive(Accounts)]
pub struct IncrementLevel<'info> {
    #[account(mut)]
    author: Signer<'info>,

    #[account(
    mut,
    seeds = [b"user", user_quiz_stats.author.key().to_bytes().as_ref()],
    bump = user_quiz_stats.bump,
    )]
    user_quiz_stats: Account<'info, UserQuizStats>,
    system_program: Program<'info, System>,
}

pub fn increment_level(ctx: Context<IncrementLevel>) -> Result<()> {
    ctx.accounts.user_quiz_stats.increment_level();

    Ok(())
}