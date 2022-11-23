import * as anchor from "@project-serum/anchor";
import { SolanaNft } from "../target/types/solana_nft";

async function mint(wallet: anchor.Wallet, TOKEN_METADATA_PROGRAM_ID: anchor.web3.PublicKey, program: anchor.Program<SolanaNft>, testNFTTitle, testNFTSymbol, testNFTUri) {
    // Derive the mint address and the associated token account address

    const mintKeypair: anchor.web3.Keypair = anchor.web3.Keypair.generate();
    const tokenAddress = await anchor.utils.token.associatedAddress({
        mint: mintKeypair.publicKey,
        owner: wallet.publicKey
    });
    console.log(`New token: ${mintKeypair.publicKey}`);

    // Derive the metadata and master edition addresses

    const metadataAddress = (await anchor.web3.PublicKey.findProgramAddress(
        [
            Buffer.from("metadata"),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mintKeypair.publicKey.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID
    ))[0];
    console.log("Metadata initialized");
    const masterEditionAddress = (await anchor.web3.PublicKey.findProgramAddress(
        [
            Buffer.from("metadata"),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mintKeypair.publicKey.toBuffer(),
            Buffer.from("edition"),
        ],
        TOKEN_METADATA_PROGRAM_ID
    ))[0];
    console.log("Master edition metadata initialized");

    // Transact with the "mint" function in our on-chain program

    await program.methods.mint(
        testNFTTitle, testNFTSymbol, testNFTUri
    )
        .accounts({
            masterEdition: masterEditionAddress,
            metadata: metadataAddress,
            mint: mintKeypair.publicKey,
            tokenAccount: tokenAddress,
            mintAuthority: wallet.publicKey,
            tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        })
        .signers([mintKeypair])
        .rpc();
}

async function main() {
    const testNFTTitle = "NFT Dinamo";
    const testNFTSymbol = "Dinamo";
    const testNFTUri = "https://raw.githubusercontent.com/ICavlek/SolanaNFT/main/assets/dinamo.json";

    const provider = anchor.AnchorProvider.env();
    const wallet = provider.wallet as anchor.Wallet;
    anchor.setProvider(provider);

    const program = anchor.workspace.SolanaNft as anchor.Program<SolanaNft>;

    const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
        "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
    ); // Don't know what that is, googled and extracted from metaplex

    await mint(wallet, TOKEN_METADATA_PROGRAM_ID, program, testNFTTitle, testNFTSymbol, testNFTUri);
}

main().then(
    () => process.exit(),
    err => {
        console.error(err);
        process.exit(-1);
    },
);