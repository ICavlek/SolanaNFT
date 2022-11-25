import * as anchor from "@project-serum/anchor";
import fs from 'mz/fs';

export async function createKeypairFromFile(
    accountName: string,
): Promise<anchor.web3.Keypair> {
    const filePath: string = __dirname + `/../../accounts/${accountName}.json`;
    const secretKeyString = await fs.readFile(filePath, { encoding: 'utf8' });
    const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
    return anchor.web3.Keypair.fromSecretKey(secretKey);
}

export function getNFTPublicKey(NFTToken: string): anchor.web3.PublicKey {
    const dataBase: { [name: string]: string } = {
        "Dinamo Zagreb NFT!": "5cLA8rWgouBLVAFC7f5XUjLxK2SJ7CwMMvfMHNy7MRP4",
        "Dinamo": "C2otQeNVfi2wkaeLPpm8rxSajgbgJSgumDXSC2eVbcaR",
        "Hajduk": "HCvebUTFJbk4qpsj1YN9WkFB3Nx2u3uh96x8dnzDF1XJ",
        "Osijek": "D4AYQKhkstrbK7PoAqpwqs9WCDMU8SG2g1pZG4ppoJoX",
        "Sibenik": "DoAoiN9NdW8Lv7poUj1cCSGJjboGroabJHKxAfYJfWaP",
        "Rijeka": "2DyaLMvjrVm6pVKQjsz8NH9k69ETP2o3kcSh2TPVmp5n"
    };
    return new anchor.web3.PublicKey(
        dataBase[NFTToken]
    );
}