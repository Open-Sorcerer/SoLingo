use anchor_lang::prelude::*;
use crate::state::{Question, QuestionProgramInfo, Reply};

/**
 * UpVoteReply
 *
 * This instruction allows a user to upvote a reply.
 */
#[derive(Accounts)]
pub struct UpVoteReply<'info> {
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

pub fn upvote_reply(ctx: Context<UpVoteReply>) -> Result<()> {
    ctx.accounts.reply.increment_up_votes();

    Ok(())
}