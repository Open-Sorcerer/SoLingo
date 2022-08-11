use anchor_lang::prelude::*;

#[error_code]
pub enum ReplyErrors {
    #[msg("The provided description string should be 200 characters long maximum.")]
    DescriptionTooLong,
}