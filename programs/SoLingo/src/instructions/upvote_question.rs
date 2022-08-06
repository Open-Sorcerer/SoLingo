use anchor_lang::prelude::*;
use crate::errors::GrantErrors;
use crate::state::{Grant, GrantsProgramInfo, Question};

/**
 * UpVoteQuestion
 *
 * This instruction allows a user to upvote a question.
 */
#[derive(Accounts)]
pub struct UpVoteQuestion<'info> {
    #[account(mut)]
    author: Signer<'info>,

    #[account(
    mut,
    seeds = [b"question", question.question_num().to_be_bytes().as_ref()],
    bump,
    )]
    question: Account<'info, Question>,

    #[account(mut, seeds = [b"question_program_info"], bump = program_info.bump(), has_one = admin)]
    program_info: Account<'info, GrantsProgramInfo>,

    system_program: Program<'info, System>,
}

pub fn upvote_question(ctx: Context<UpVoteQuestion>) -> Result<()> {
    ctx.accounts.question.increment_up_votes();

    Ok(())
}