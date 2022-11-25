import * as anchor from "@project-serum/anchor";
import { NFTOwner } from "./NFTOwner/NFTOwner";
import { NFTData } from "./NFTData/NFTData";
import { createKeypairFromFile, getNFTPublicKey } from "./utils/utils";

async function main() {
    const mintNFT: boolean = false;
    const newNFTName: string = "Sibenik";
    const sellNFT: boolean = false;
    const whichNFTToSell: string = "Sibenik";
    const toWhichAccount: string = "john";

    const nftOwner: NFTOwner = new NFTOwner();
    if (mintNFT) {
        const nftData: NFTData = new NFTData(newNFTName);
        await nftOwner.mint(nftData);
    }

    if (sellNFT) {
        const nftPublicKey: anchor.web3.PublicKey = getNFTPublicKey(whichNFTToSell);
        const keypairJohn: anchor.web3.Keypair = await createKeypairFromFile(toWhichAccount);
        await nftOwner.sell(nftPublicKey, keypairJohn);
    }
}

main().then(
    () => process.exit(),
    err => {
        console.error(err);
        process.exit(-1);
    },
);