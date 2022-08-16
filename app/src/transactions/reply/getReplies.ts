import {Provider} from "@project-serum/anchor";
import getProgram from "../api/getProgram";
import {notify} from "../../utils/notifications";
import getReplyPDA from "../pda/getReplyPDA";

export default async function getReplies(provider: Provider, questionNum: number, startIndex: number, endIndex: number): Promise<any> {
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

        const replyPDAs = await Promise.all(indices.map(async (idx) => {
            return await getReplyPDA(program, questionNum, idx);
        }));

        const replies = await program.account.reply.fetchMultiple(replyPDAs);


        return {err: false, data: replies}
    } catch (error) {
        console.log(error);
        return {err: true}
    }
}