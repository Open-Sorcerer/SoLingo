import {AnchorProvider} from "@project-serum/anchor";
import {AnchorWallet} from "@solana/wallet-adapter-react";
import {Connection} from "@solana/web3.js";
import {notify} from "../../utils/notifications";
import {DEVNET_API, processed} from "../../utils/constants";

/**
 *
 * @returns provider to the caller if wallet is connected else shows error
 */
export default function getProvider(wallet: AnchorWallet | undefined) {
    if (!wallet) {
        console.log('error', 'Wallet not connected!');
        notify({type: 'error', message: 'error', description: 'Wallet not connected!'});
        return;
    }

    /* Create the provider and return it to the caller */
    const connection = new Connection(DEVNET_API, processed);

    new AnchorProvider(
        connection, wallet, {preflightCommitment: processed},
    )
    return new AnchorProvider(
        connection, wallet, {preflightCommitment: processed},
    );
}