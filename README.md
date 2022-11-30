# SolanaNFT
Example of minting and selling Solana NFT within anchor framework. All credits for idea to https://www.youtube.com/watch?v=c1GJ-13z6pE&list=PLUBKxx7QjtVnU3hkPc8GF1Jh4DE7cf4n1&index=8&ab_channel=Coding%26Crypto.

### Creating your own solana keypair
```shell
solana-keygen new
```

### Setting devnet
```shell
solana config set --url devnet
```

### Funding your own solana keypair
```shell
solana airdrop 1
```
Sometimes it might fail, because solana devnet might be busy.

### Creating test accounts

```shell
solana-keygen new --no-bip39-passphrase -o accounts/john.json
```

Necessary to fund it.

```shell
solana airdrop --keypair accounts/john.json 1
```
### Building and deploying program

```shell
anchor build && anchor deploy
```

After deploying, NECESSARY to replace created program id's with the ones inside Anchor.toml and lib.rs.
Rerun:

```shell
anchor build && anchor deploy
```

### NFT Assets

Simple .json examples of NFTs are shown in assets folder. If new one is created, it's public key needs to be added to utils/getNFTPublicKey database.

### Running

```shell
anchor run MintSellNFT
```
