import { NFTOwner } from "./NFTOwner/NFTOwner";
import { NFTData } from "./NFTData/NFTData";

async function main() {
    const nftOwner: NFTOwner = new NFTOwner();
    const nftData: NFTData = new NFTData("Osijek");
    await nftOwner.mint(nftData);
}

main().then(
    () => process.exit(),
    err => {
        console.error(err);
        process.exit(-1);
    },
);