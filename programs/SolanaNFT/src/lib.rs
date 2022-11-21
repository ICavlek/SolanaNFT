use {
    anchor_lang::{prelude::*, solana_program::program::invoke, system_program},
    anchor_spl::{associated_token, token},
    mpl_token_metadata::{instruction as token_instruction, ID as TOKEN_METADATA_ID},
};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod solana_nft {
    use super::*;

    pub fn mint(ctx: Context<MintNFT>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct MintNFT<'info> {
    /// CHECK: We are about to create this with Metaplex
    #[account(mut)]
    pub metadata: UncheckedAccount<'info>,
}
