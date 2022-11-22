use anchor_lang::prelude::*;

pub mod mint;
use mint::*;

declare_id!("FRp18Tu2U545ztPWqma7uHudGW1eiSLnBdpG2SJjgybR");

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
}
