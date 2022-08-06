use anchor_lang::prelude::*;

#[error_code]
pub enum QuestionErrors {
    #[msg("The provided tags string should be 50 characters long maximum.")]
    TagsTooLong,

    #[msg("The provided title string should be 100 characters long maximum.")]
    TitleTooLong,

    #[msg("The provided description string should be 200 characters long maximum.")]
    DescriptionTooLong,
}