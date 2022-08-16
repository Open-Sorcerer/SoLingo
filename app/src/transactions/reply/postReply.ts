import getProgram from "../api/getProgram";
import {QuestionModel} from "../../models";
import {notify} from "../../utils/notifications";
import getQuestionPDA from "../pda/getQuestionPDA";
import {getProgramInfoPDA} from "../pda/getProgramInfoPDA";
import {QuestionProgramInfo} from "../../models/QuestionProgramInfo";
import {Provider} from "@project-serum/anchor";
import {Keypair, PublicKey} from "@solana/web3.js";
import {ReplyModel} from "../../models/ReplyModel";
import getReplyPDA from "../pda/getReplyPDA";

/**
 * Posts a question and returns the question
 * @param provider
 * @param questionNum
 * @param reply
 */
export default async function postReply(provider: Provider, questionNum: number, reply: ReplyModel): Promise<any> {
    const program = getProgram(provider)

    const questionProgramInfoPDA = await getProgramInfoPDA(program)

    const questionPDA = await getQuestionPDA(program, questionNum)

    const replyPDA = await getReplyPDA(program, questionNum, reply.replyNum)

    if (provider) {
            await program.methods
                .postReply(reply.description)
                .accounts({
                    // @ts-ignore
                    author: provider.wallet.publicKey,
                    reply: replyPDA,
                    question: questionPDA,
                    programInfo: questionProgramInfoPDA,
                })
                .rpc();

        console.log(await program.account.reply.fetch(replyPDA));
        return program.account.reply.fetch(replyPDA);
    } else {
        console.log('error', 'Wallet not connected!');
        notify({type: 'error', message: 'error', description: 'Wallet not connected!'});
        return;
    }
}