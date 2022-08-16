import {Provider} from "@project-serum/anchor";
import getProgram from "../api/getProgram";
import {notify} from "../../utils/notifications";
import {UserQuizStats} from "../../models";
import {PublicKey} from "@solana/web3.js";
import getUserStatsPDA from "../pda/getUserStatsPDA";

export default async function incrementLevel(provider: Provider, author: PublicKey): Promise<any> {
    const program = getProgram(provider)

    const userStatsPDA = await getUserStatsPDA(program, author)

    // @ts-ignore
    const userQuizStats: UserQuizStats = await program.account.userQuizStats.fetch(userStatsPDA)

    console.log(userQuizStats)

    if (provider) {
        await program.methods
            .incrementLevel()
            .accounts({
                // @ts-ignore
                author: provider.wallet.publicKey,
                userQuizStats: userStatsPDA,
            }).rpc();

        console.log(await program.account.userQuizStats.fetch(userStatsPDA));
    } else {
        console.log('error', 'Wallet not connected!');
        notify({type: 'error', message: 'error', description: 'Wallet not connected!'});
        return;
    }
}