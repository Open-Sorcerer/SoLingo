use anchor_lang::prelude::*;
use crate::state::{Question, QuestionProgramInfo};

/**
 * DownVoteQuestion
 *
 * This instruction allows a user to down vote a question.
 */
#[derive(Accounts)]
pub struct DownVoteQuestion<'info> {
    #[account(mut)]
    author: Signer<'info>,

    #[account(
    mut,
    seeds = [b"question", question.question_num().to_be_bytes().as_ref()],
    bump,
    )]
    question: Account<'info, Question>,

    #[account(mut, seeds = [b"question_program_info"], bump = program_info.bump(), has_one = author)]
    program_info: Account<'info, QuestionProgramInfo>,

    system_program: Program<'info, System>,
}

pub fn down_vote_question(ctx: Context<DownVoteQuestion>) -> Result<()> {
    ctx.accounts.question.increment_down_votes();

    Ok(())
}