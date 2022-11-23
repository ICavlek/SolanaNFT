import * as anchor from "@project-serum/anchor";
import { NFTOwner } from "./NFTOwner/NFTOwner";
import { NFTData } from "./NFTData/NFTData";
import { createKeypairFromFile, getNFTPublicKey } from "./utils/utils";

async function main() {
    const nftOwner: NFTOwner = new NFTOwner();
    const nftData: NFTData = new NFTData("Osijek");
    // await nftOwner.mint(nftData);

    const nftPublicKey: anchor.web3.PublicKey = getNFTPublicKey("Dinamo Zagreb NFT!");
    const keypairJohn: anchor.web3.Keypair = await createKeypairFromFile("john");
    nftOwner.sell(nftPublicKey, keypairJohn);
}

main().then(
    () => process.exit(),
    err => {
        console.error(err);
        process.exit(-1);
    },
);