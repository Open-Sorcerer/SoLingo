use anchor_lang::prelude::*;
use crate::state::{Question, QuestionProgramInfo};

/**
 * UpVoteQuestion
 *
 * This instruction allows a user to upvote a question.
 */
#[derive(Accounts)]
pub struct UpVoteQuestion<'info> {
    author: Signer<'info>,

    #[account(
    mut,
    seeds = [b"question", question.question_num.to_be_bytes().as_ref()],
    bump = question.bump,
    has_one = author
    )]
    question: Account<'info, Question>,
}

pub fn upvote_question(ctx: Context<UpVoteQuestion>) -> Result<()> {
    ctx.accounts.question.increment_up_votes();

    Ok(())
}