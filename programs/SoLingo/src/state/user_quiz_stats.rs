use anchor_lang::prelude::*;

/// This account holds the information for a Question account

#[account]
#[derive(Default)]
pub struct UserQuizStats {
    pub bump: u8, // 1
    pub author: Pubkey, // 32
    level: u32,          // 8
}

impl UserQuizStats{
    pub const MAXIMUM_SPACE: usize = 1 + 32 + 8;

    pub fn new(bump: u8, author: Pubkey) -> Self {
        UserQuizStats {
            bump,
            author,
            ..Default::default()
        }
    }

    pub fn increment_level(&mut self) {
        self.level += 1;
    }

}