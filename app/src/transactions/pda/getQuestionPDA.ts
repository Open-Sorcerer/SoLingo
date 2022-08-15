import * as anchor from "@project-serum/anchor";
import {encode} from "@project-serum/anchor/dist/cjs/utils/bytes/utf8";
import {Program} from "@project-serum/anchor";
import {QuestionProgramInfo} from "../../models/QuestionProgramInfo";

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
 * gets question PDA using program and programInfo
 * @param program
 * @param questionCount
 */
export default async function getQuestionPDA(program: Program, questionCount: number) {
    const [questionPDA, question_bump] = await anchor.web3.PublicKey.findProgramAddress(
        [
            encode("question"),
            toBytesInt32(questionCount),
        ],
        program.programId
    );

    return questionPDA;
}