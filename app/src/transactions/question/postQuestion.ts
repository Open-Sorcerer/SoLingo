import getProgram from "../api/getProgram";
import {QuestionModel} from "../../models";
import {notify} from "../../utils/notifications";
import getQuestionPDA from "../pda/getQuestionPDA";
import {getProgramInfoPDA} from "../pda/getProgramInfoPDA";
import {QuestionProgramInfo} from "../../models/QuestionProgramInfo";
import {Provider} from "@project-serum/anchor";

/**
 * Posts a question and returns the question
 * @param provider
 * @param question
 */
export default async function postQuestion(provider: Provider, question: QuestionModel): Promise<any> {
    const program = getProgram(provider)

    const questionProgramInfoPDA = await getProgramInfoPDA(program)

    const questionProgramInfo: QuestionProgramInfo = await program.account.questionProgramInfo.fetch(questionProgramInfoPDA)

    const questionPDA = await getQuestionPDA(program, questionProgramInfo.questionsCount)

    if (provider) {
        await program.methods
            .postQuestion(question.title, question.description, question.tags)
            .accounts({
                question: questionPDA,
                programInfo: questionProgramInfoPDA,
                // @ts-ignore
                author: provider.wallet.publicKey
            })
            .rpc();

        console.log(await program.account.question.fetch(questionPDA));
        return program.account.question.fetch(questionPDA);
    } else {
        console.log('error', 'Wallet not connected!');
        notify({type: 'error', message: 'error', description: 'Wallet not connected!'});
        return;
    }
}