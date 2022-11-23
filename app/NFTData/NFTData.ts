export class NFTData {
    title: string;
    symbol: string;
    uri: string;

    constructor(name: string) {
        this.title = `NFT ${name}`;
        this.symbol = `${name}`;
        this.uri = `https://raw.githubusercontent.com/ICavlek/SolanaNFT/main/assets/${name.toLowerCase()}.json`;
    }
}