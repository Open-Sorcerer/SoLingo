use anchor_lang::prelude::*;

/// This account holds the information for a Question account

#[account]
#[derive(Default)]
pub struct UserQuizStats {
    pub author: Pubkey, // 32
    level: u32,          // 8
}

impl UserQuizStats{
    pub const MAXIMUM_SPACE: usize = 32 + 8;

    pub fn new(author: Pubkey) -> Self {
        UserQuizStats {
            author,
            ..Default::default()
        }
    }

    pub fn increment_level(&mut self) {
        self.level += 1;
    }

}