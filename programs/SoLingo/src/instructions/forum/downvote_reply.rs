use anchor_lang::prelude::*;
use crate::state::{Question, QuestionProgramInfo, Reply};

/**
 * DownVoteQuestion
 *
 * This instruction allows a user to down vote a reply.
 */
#[derive(Accounts)]
pub struct DownVoteReply<'info> {
    #[account(mut)]
    author: Signer<'info>,

    #[account(
    mut,
    seeds = [
    b"reply",
    reply.reply_num().to_be_bytes().as_ref(),
    question.question_num.to_be_bytes().as_ref()
    ],
    bump = reply.bump,
    )]
    reply: Account<'info, Reply>,

    #[account(
    mut,
    seeds = [b"question", question.question_num.to_be_bytes().as_ref()],
    bump = question.bump,
    )]
    question: Account<'info, Question>,
}

pub fn down_vote_reply(ctx: Context<DownVoteReply>) -> Result<()> {
    if ctx.accounts.reply.up_votes > 0 {
        ctx.accounts.reply.decrement_up_votes();
    }
    Ok(())
}