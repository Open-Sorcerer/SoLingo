use anchor_lang::prelude::*;

/// This account holds the information for a Question account

#[account]
#[derive(Default)]
pub struct Reply {
    pub bump: u8,           // 1
    pub author: Pubkey,     // 32
    description: String,    // 4 + (300 * 4)
    pub up_votes: u32,          // 8
    date_created: i64,      // 16 (UnixTimestamp)
    correct_answer: bool,   // 1
    pub question_num: u32,  // 8
    pub reply_num: u32,     // 8
}

impl Reply {
    pub const MAXIMUM_SPACE: usize = 32 + (4 + (300 * 4)) + 8 + 8 + 16 + 1 + 8 + 8;

    pub fn new(bump:u8, author: Pubkey, description: String, question_num: u32, date_created: i64) -> Self {
        Reply {
            bump,
            author,
            description,
            question_num,
            date_created,
            correct_answer: false,
            ..Default::default() // rest of the fields are initialized to default values
        }
    }

    pub fn reply_num(&self) -> u32 {
        self.reply_num
    }

    pub fn make_correct_question(&mut self) {
        self.correct_answer = true;
    }

    pub fn increment_up_votes(&mut self) {
        self.up_votes += 1;
    }

    pub fn decrement_up_votes(&mut self) {
        self.up_votes -= 1;
    }
}