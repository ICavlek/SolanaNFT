import * as anchor from "@project-serum/anchor";
import { SolanaNft } from "../../target/types/solana_nft";
import { NFTData } from "../NFTData/NFTData";

export class NFTOwner {
    wallet: anchor.Wallet;
    tokenMetaDataProgramID: anchor.web3.PublicKey;
    program: anchor.Program<SolanaNft>;

    constructor() {
        this.wallet = this.createWallet();
        this.tokenMetaDataProgramID = this.createTokenMetaDataProgramID();
        this.program = this.createProgram();
    }

    async mint(nftData: NFTData) {
        const mintKeypair: anchor.web3.Keypair = this.createMintKeypair();
        const tokenAddress: anchor.web3.PublicKey = await this.createTokenAddress(mintKeypair);
        const metadataAddress: anchor.web3.PublicKey = await this.createMetadataAddress(mintKeypair);
        const masterEditionAddress: anchor.web3.PublicKey = await this.createMasterEditionAddress(mintKeypair);
        await this.callMint(masterEditionAddress, metadataAddress, mintKeypair, tokenAddress, nftData);
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

    private createMintKeypair(): anchor.web3.Keypair {
        console.log("Generating mint keypair...");
        const mintKeypair: anchor.web3.Keypair = anchor.web3.Keypair.generate();
        console.log(`New token: ${mintKeypair.publicKey}`);
        return mintKeypair;
    }

    private async createTokenAddress(mintKeypair: anchor.web3.Keypair): Promise<anchor.web3.PublicKey> {
        console.log("Creating token address...");
        return await anchor.utils.token.associatedAddress({
            mint: mintKeypair.publicKey,
            owner: this.wallet.publicKey
        });
    }

    private async createMetadataAddress(mintKeypair: anchor.web3.Keypair): Promise<anchor.web3.PublicKey> {
        console.log("Initializing metadata...");
        return (await anchor.web3.PublicKey.findProgramAddress(
            [
                Buffer.from("metadata"),
                this.tokenMetaDataProgramID.toBuffer(),
                mintKeypair.publicKey.toBuffer(),
            ],
            this.tokenMetaDataProgramID
        ))[0];
    }

    private async createMasterEditionAddress(mintKeypair: anchor.web3.Keypair): Promise<anchor.web3.PublicKey> {
        console.log("Initializing master edition address...");
        return (await anchor.web3.PublicKey.findProgramAddress(
            [
                Buffer.from("metadata"),
                this.tokenMetaDataProgramID.toBuffer(),
                mintKeypair.publicKey.toBuffer(),
                Buffer.from("edition"),
            ],
            this.tokenMetaDataProgramID
        ))[0];
    }

    private async callMint(masterEditionAddress: anchor.web3.PublicKey, metadataAddress: anchor.web3.PublicKey, mintKeypair: anchor.web3.Keypair, tokenAddress: anchor.web3.PublicKey, nftData: NFTData) {
        await this.program.methods.mint(
            nftData.title, nftData.symbol, nftData.uri
        )
            .accounts({
                masterEdition: masterEditionAddress,
                metadata: metadataAddress,
                mint: mintKeypair.publicKey,
                tokenAccount: tokenAddress,
                mintAuthority: this.wallet.publicKey,
                tokenMetadataProgram: this.tokenMetaDataProgramID,
            })
            .signers([mintKeypair])
            .rpc();
    }
}