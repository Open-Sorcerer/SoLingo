import * as anchor from "@project-serum/anchor";
import {encode} from "@project-serum/anchor/dist/cjs/utils/bytes/utf8";
import {Program} from "@project-serum/anchor";

/**
 * converts number to bytes int32
 * @param num
 */
const toBytesInt32 = (num: number): Buffer => {
    const arr = new ArrayBuffer(4);
    const view = new DataView(arr);
    view.setUint32(0, num);
    return Buffer.from(arr);
};

/**
 * gets reply PDA using program, questions and programInfo
 * @param program
 * @param questionNum
 * @param replyNum
 */
export default async function getReplyPDA(program: Program, questionNum: number, replyNum: number) {
    const [replyPDA, reply_bump] = await anchor.web3.PublicKey.findProgramAddress(
        [
            encode("reply"),
            toBytesInt32(replyNum),
            toBytesInt32(questionNum),
        ],
        program.programId
    );


    return replyPDA;
}