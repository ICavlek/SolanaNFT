use anchor_lang::prelude::*;

pub mod mint;
pub mod sell;

use mint::*;
use sell::*;

declare_id!("8kbjHeUBCB7p7gXa36aZRqqzW9BNMonTJHxp2tvmccm6");

#[program]
pub mod solana_nft {
    use super::*;

    pub fn mint(
        ctx: Context<MintNFT>,
        metadata_title: String,
        metadata_symbol: String,
        metadata_uri: String,
    ) -> Result<()> {
        mint::mint(ctx, metadata_title, metadata_symbol, metadata_uri)
    }

    pub fn sell(ctx: Context<SellNFT>, sale_lamports: u64) -> Result<()> {
        sell::sell(ctx, sale_lamports)
    }
}
