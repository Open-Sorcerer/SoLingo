use anchor_lang::prelude::*;
use crate::state::{Question, QuestionProgramInfo};

/**
 * UpVoteQuestion
 *
 * This instruction allows a user to upvote a question.
 */
#[derive(Accounts)]
pub struct DownVoteQuestion<'info> {
    author: Signer<'info>,

    #[account(
    mut,
    seeds = [b"question", question.question_num.to_be_bytes().as_ref()],
    bump = question.bump,
    has_one = author
    )]
    question: Account<'info, Question>,
}

pub fn downvote_question(ctx: Context<DownVoteQuestion>) -> Result<()> {
    if ctx.accounts.question.up_votes > 0 {
        ctx.accounts.question.decrement_up_votes();
    }

    Ok(())
}