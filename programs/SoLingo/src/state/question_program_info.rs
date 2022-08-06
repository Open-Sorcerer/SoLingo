use anchor_lang::prelude::*;

/// This account holds the information of number of questions
#[account]
#[derive(Default)]
pub struct QuestionProgramInfo {
    pub author: Pubkey,     // 32
    pub bump: u8, // 1
    pub questions_count: u32,  // 8
}

impl QuestionProgramInfo {
    pub const MAXIMUM_SPACE: usize = 1 + 8;

    pub fn new(author: Pubkey, bump: u8, questions_count: u32) -> Self {
        QuestionProgramInfo {
            author,
            bump,
            questions_count,
        }
    }

    pub fn author(&self) -> Pubkey {
        self.author
    }

    pub fn bump(&self) -> u8 {
        self.bump
    }

    pub fn questions_count(&self) -> u32 {
        self.questions_count
    }

    /// Increment the number of questions by one
    pub fn increment_questions_count(&mut self) {
        self.questions_count += 1;
    }
}