import {PublicKey} from "@solana/web3.js";

export function displayPublicKey(publicKey: PublicKey) {
    const author = publicKey?.toBase58()
    return author?.slice(0,4) + '..' + author?.slice(-4)
}