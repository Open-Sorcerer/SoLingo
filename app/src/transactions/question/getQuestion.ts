import {Provider} from "@project-serum/anchor";
import getProgram from "../api/getProgram";
import {notify} from "../../utils/notifications";
import getQuestionPDA from "../pda/getQuestionPDA";

export default async function getQuestions(provider: Provider, startIndex: number, endIndex: number): Promise<any> {
    try {
        if (!provider) {
            notify({type: "error", message: "error", description: "Wallet not connected!"});
            return {err: true};
        }

        const program = getProgram(provider)

        const indices = [];
        for (let i = startIndex; i <= endIndex; i++) {
            indices.push(i);
        }

        const questionPDAs = await Promise.all(indices.map(async (idx) => {
            return await getQuestionPDA(program, idx);
        }));

        const questions = await program.account.question.fetchMultiple(questionPDAs);

        return {err: false, data: questions}
    } catch (error) {
        console.log(error);
        return {err: true}
    }
}