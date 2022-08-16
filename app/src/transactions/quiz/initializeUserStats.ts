import {Provider} from "@project-serum/anchor";
import getProgram from "../api/getProgram";
import {notify} from "../../utils/notifications";
import { PublicKey} from "@solana/web3.js";
import getUserStatsPDA from "../pda/getUserStatsPDA";

export default async function initializeUserStats(provider: Provider, author: PublicKey): Promise<any> {
    const program = getProgram(provider)

    const userStatsPDA = await getUserStatsPDA(program, author)

    if (provider) {
        await program.methods
            .initializeUserStats()
            .accounts({
                author: author,
                user: userStatsPDA,
            })
            .rpc();

        console.log(await program.account.userQuizStats.fetch(userStatsPDA));
    } else {
        console.log('error', 'Wallet not connected!');
        notify({type: 'error', message: 'error', description: 'Wallet not connected!'});
        return;
    }
}