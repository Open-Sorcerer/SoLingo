use anchor_lang::prelude::*;

/// This account holds the information for a Question account

#[account]
#[derive(Default)]
pub struct Reply {
    pub author: Pubkey,     // 32
    description: String,    // 4 + (200 * 4)
    up_votes: u32,          // 8
    down_votes: u32,        // 8
    date_created: i64,      // 16 (UnixTimestamp)
    correct_answer: bool,   // 1
    pub question_num: u32,  // 8
    pub reply_num: u32,     // 8
}

impl Reply {
    pub const MAXIMUM_SPACE: usize = 32 + (4 + (200 * 4)) + 8 + 8 + 16 + 1 + 8 + 8;

    pub fn new(author: Pubkey, description: String, question_num: u32) -> Self {
        Reply {
            author,
            description,
            question_num,
            correct_answer: false,
            ..Default::default() // rest of the fields are initialized to default values
        }
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

    pub fn increment_down_votes(&mut self) {
        self.down_votes += 1;
    }

    pub fn decrement_down_votes(&mut self) {
        self.down_votes -= 1;
    }
}