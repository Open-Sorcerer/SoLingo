use anchor_lang::prelude::*;
use instructions::*;

pub mod state;
mod instructions;
mod errors;
declare_id!("4bbtjhfydBhiuhqgHi1td5xHNhS2RUJXYWkgix4H6L5r");


#[program]
pub mod so_lingo {
    use crate::state::UserQuizStats;
    use super::*;

    pub fn initialize_program_info(ctx: Context<Initialize>) -> Result<()> {
        initialize(ctx)
    }

    pub fn post_question(ctx: Context<PostQuestion>, title: String, description: String, tags: String) -> Result<()> {
        instructions::post_question(ctx, title, description, tags)
    }

    pub fn post_reply(ctx: Context<PostReply>, description: String) -> Result<()> {
        instructions::post_reply(ctx, description)
    }

    pub fn upvote_question(ctx: Context<UpVoteQuestion>) -> Result<()> {
        instructions::upvote_question(ctx)
    }

    pub fn downvote_question(ctx: Context<DownVoteQuestion>) -> Result<()> {
        instructions::downvote_question(ctx)
    }

    pub fn upvote_reply(ctx: Context<UpVoteReply>) -> Result<()> {
        instructions::upvote_reply(ctx)
    }

    pub fn down_vote_reply(ctx: Context<DownVoteReply>) -> Result<()> {
        instructions::down_vote_reply(ctx)
    }

    pub fn initialize_user_stats(ctx: Context<InitializeUserStats>) -> Result<()> {
        instructions::initialize_user_stats(ctx)
    }

    pub fn increment_level(ctx: Context<IncrementLevel>) -> Result<()> {
        instructions::increment_level(ctx)
    }
}