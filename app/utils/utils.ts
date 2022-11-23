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
    return new anchor.web3.PublicKey(
        "5cLA8rWgouBLVAFC7f5XUjLxK2SJ7CwMMvfMHNy7MRP4"
    );
}