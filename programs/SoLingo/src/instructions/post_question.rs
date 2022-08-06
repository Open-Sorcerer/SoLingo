use anchor_lang::prelude::*;
use crate::{state::{Question, QuestionProgramInfo}, errors::QuestionErrors};

#[derive(Accounts)]
pub struct PostQuestion<'info> {
    #[account(mut)]
    author: Signer<'info>,

    #[account(
    init,
    payer = author,
    seeds = [b"question", program_info.questions_count().to_be_bytes().as_ref()],
    bump,
    space = 8 + Question::MAXIMUM_SPACE
    )]
    question: Account<'info, Question>,

    #[account(mut, seeds = [b"question_program_info"], bump = program_info.bump())]
    program_info: Account<'info, QuestionProgramInfo>,

    system_program: Program<'info, System>,
}

pub fn post_question(ctx: Context<PostQuestion>, title: String, description: String, tags: String) -> Result<()> {
    // checking if tags string is longer than 50 characters
    if tags.chars().count() > 50 {
        return Err(QuestionErrors::TagsTooLong.into());
    }

    // checking if title string is longer than 100 characters
    if description.chars().count() > 100 {
        return Err(QuestionErrors::TitleTooLong.into());
    }

    // checking if description string is longer than 200 characters
    if description.chars().count() > 200 {
        return Err(QuestionErrors::DescriptionTooLong.into());
    }

    ctx.accounts.question.set_inner(Question::new(
        ctx.accounts.author.key(),
        title,
        description,
        tags,
        ctx.accounts.program_info.questions_count(),
    ));

    // Increment the number of questions by one
    ctx.accounts.program_info.increment_questions_count();

    Ok(())
}
