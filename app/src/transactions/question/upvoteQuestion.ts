import {Provider} from "@project-serum/anchor";
import getProgram from "../api/getProgram";
import {notify} from "../../utils/notifications";
import getQuestionPDA from "../pda/getQuestionPDA";
import {getProgramInfoPDA} from "../pda/getProgramInfoPDA";
import {QuestionProgramInfo} from "../../models/QuestionProgramInfo";
import {QuestionModel} from "../../models";

export default async function upvoteQuestion(provider: Provider, questionNum: number): Promise<any> {
    const program = getProgram(provider)

    const questionPDA = await getQuestionPDA(program, questionNum)

    // @ts-ignore
    const question: QuestionModel = await program.account.question.fetch(questionPDA)
    console.log(question)

    if (provider) {
        await program.methods
            .upvoteQuestion()
            .accounts({
                question: questionPDA,
                // @ts-ignore
                author: provider.wallet.publicKey
            })
            .rpc();

        console.log(await program.account.question.fetch(questionPDA));
    } else {
        console.log('error', 'Wallet not connected!');
        notify({type: 'error', message: 'error', description: 'Wallet not connected!'});
        return;
    }
}