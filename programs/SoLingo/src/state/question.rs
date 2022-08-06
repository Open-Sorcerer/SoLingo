use anchor_lang::prelude::*;

/// This account holds the information for a Question account

#[account]
#[derive(Default)]
pub struct Question {
    pub author: Pubkey,     // 32
    title: String,          // 4 + (100 * 4)
    description: String,    // 4 + (200 * 4)
    up_votes: u32,          // 8
    down_votes: u32,        // 8
    tags: String,           // 4 + (50 * 4)
    replies_count: u32,     // 8
    date_created: i64,      // 16 (UnixTimestamp)
    is_answered: bool,      // 1
    pub question_num: u32,  // 8
}

impl Question {
    pub const MAXIMUM_SPACE: usize = 32 + (4 + (100 * 4)) + (4 + (200 * 4)) + 8 + 8 + (4 + (50 * 4)) + 8 + 16 + 1 + 8;

    pub fn new(author: Pubkey, title: String, description: String, tags: String, question_num: u32, date_created: i64) -> Self {
        Question {
            author,
            title,
            description,
            tags,
            question_num,
            date_created,
            is_answered: false,
            ..Default::default() // rest of the fields are initialized to default values
        }
    }
    pub fn question_num(&self) -> u32 {
        self.question_num
    }

    pub fn replies_count(&self) -> u32 {
        self.replies_count
    }

    pub fn answer_question(&mut self) {
        self.is_answered = true;
    }

    pub fn increment_replies(&mut self) {
        self.replies_count += 1;
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