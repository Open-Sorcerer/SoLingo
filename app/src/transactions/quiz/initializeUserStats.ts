import {Provider} from "@project-serum/anchor";
import getProgram from "../api/getProgram";
import {notify} from "../../utils/notifications";
import {Keypair} from "@solana/web3.js";
import getUserStatsPDA from "../pda/getUserStatsPDA";

export default async function initializeUserStats(provider: Provider, author: Keypair): Promise<any> {
    const program = getProgram(provider)

    const userStatsPDA = await getUserStatsPDA(program, author.publicKey)

    if (provider) {
        await program.methods
            .initializeUserStats()
            .accounts({
                author: author.publicKey,
                user: userStatsPDA,
            })
            .signers([author])
            .rpc();

        console.log(await program.account.userQuizStats.fetch(userStatsPDA));
    } else {
        console.log('error', 'Wallet not connected!');
        notify({type: 'error', message: 'error', description: 'Wallet not connected!'});
        return;
    }
}