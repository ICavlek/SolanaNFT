import * as anchor from "@project-serum/anchor";
import { SolanaNft } from "../../target/types/solana_nft";

export class NFTOwner {
    wallet: anchor.Wallet;
    tokenMetaDataProgramID: anchor.web3.PublicKey;
    program: anchor.Program<SolanaNft>;

    constructor() {
        this.wallet = this.createWallet();
        this.tokenMetaDataProgramID = this.createTokenMetaDataProgramID();
        this.program = this.createProgram();
    }

    private createWallet(): anchor.Wallet {
        const provider = anchor.AnchorProvider.env();
        const wallet = provider.wallet as anchor.Wallet;
        anchor.setProvider(provider);
        return wallet;
    }

    private createTokenMetaDataProgramID(): anchor.web3.PublicKey {
        return new anchor.web3.PublicKey(
            "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        ); // Don't know what that is, googled and extracted from metaplex
    }

    private createProgram(): anchor.Program<SolanaNft> {
        return anchor.workspace.SolanaNft as anchor.Program<SolanaNft>;
    }
}