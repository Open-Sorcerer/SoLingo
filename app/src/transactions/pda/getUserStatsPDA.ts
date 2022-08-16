import * as anchor from "@project-serum/anchor";
import {encode} from "@project-serum/anchor/dist/cjs/utils/bytes/utf8";
import {Program} from "@project-serum/anchor";
import {PublicKey} from "@solana/web3.js";


/**
 * gets user stats PDA using author's PublicKey
 * @param program
 * @param author
 */
export default async function getUserStatsPDA(program: Program, author: PublicKey) {
    const [userStatsPDA, userStatsBump] = await anchor.web3.PublicKey.findProgramAddress(
        [
            encode("user"),
            author.toBuffer(),
        ],
        program.programId
    );
    return userStatsPDA;
}