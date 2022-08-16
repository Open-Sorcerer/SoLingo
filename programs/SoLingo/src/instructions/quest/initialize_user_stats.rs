use anchor_lang::prelude::*;
use crate::state::UserQuizStats;

/**
 * InitializeUserStats
 *
 * This instruction initializes a new user with level 0
 */
#[derive(Accounts)]
pub struct InitializeUserStats<'info> {
    #[account(mut)]
    author: Signer<'info>,

    #[account(
    init,
    payer = author,
    seeds = [b"user", author.key().to_bytes().as_ref()],
    bump,
    space = 8 + UserQuizStats::MAXIMUM_SPACE
    )]
    user: Account<'info, UserQuizStats>,
    system_program: Program<'info, System>,
}

pub fn initialize_user_stats(ctx: Context<InitializeUserStats>) -> Result<()> {
    ctx.accounts.user.set_inner(UserQuizStats::new(
        *ctx.bumps
            .get("user")
            .expect("We should've gotten the grant's canonical bump"),
        ctx.accounts.author.key()
    ));

    Ok(())
}