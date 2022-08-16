import {PublicKey} from "@solana/web3.js";

export interface UserQuizStats {

    bump?: number,
    author?: PublicKey,
    level: number,
}