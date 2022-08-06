use anchor_lang::prelude::*;
use instructions::*;

pub mod state;
mod instructions;
mod errors;
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod so_lingo {
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

    pub fn down_vote_question(ctx: Context<DownVoteQuestion>) -> Result<()> {
        instructions::down_vote_question(ctx)
    }

    pub fn upvote_reply(ctx: Context<UpVoteReply>) -> Result<()> {
        instructions::upvote_reply(ctx)
    }
}