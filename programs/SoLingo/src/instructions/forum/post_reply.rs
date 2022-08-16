use anchor_lang::prelude::*;
use crate::{state::{Question, QuestionProgramInfo, Reply}, errors::ReplyErrors};

#[derive(Accounts)]
pub struct PostReply<'info> {
    #[account(mut)]
    author: Signer<'info>,

    #[account(
    init,
    payer = author,
    seeds = [
        b"reply",
        question.replies_count().to_be_bytes().as_ref(),
        question.question_num.to_be_bytes().as_ref()
    ],
    bump,
    space = 8 + Reply::MAXIMUM_SPACE
    )]
    reply: Account<'info, Reply>,

    #[account(
    mut,
    seeds = [b"question", question.question_num.to_be_bytes().as_ref()],
    bump,
    )]
    question: Account<'info, Question>,

    #[account(mut, seeds = [b"question_program_info"], bump = program_info.bump)]
    program_info: Account<'info, QuestionProgramInfo>,

    system_program: Program<'info, System>,
}

pub fn post_reply(ctx: Context<PostReply>, description: String) -> Result<()> {

    // checking if description string is longer than 200 characters
    if description.chars().count() > 200 {
        return Err(ReplyErrors::DescriptionTooLong.into());
    }

    let clock: Clock = Clock::get().unwrap();

    ctx.accounts.reply.set_inner(Reply::new(
        *ctx.bumps
            .get("reply")
            .expect("We should've gotten the grant's canonical bump"),
        ctx.accounts.author.key(),
        description,
        ctx.accounts.question.question_num,
        clock.unix_timestamp,
    ));

    // Increment the number of replies by one
    ctx.accounts.question.increment_replies();

    Ok(())
}
