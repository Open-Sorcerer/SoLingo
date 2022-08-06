import * as anchor from "@project-serum/anchor";
import {Program} from "@project-serum/anchor";
import {SoLingo} from "../target/types/so_lingo";
import {Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import {encode} from "@project-serum/anchor/dist/cjs/utils/bytes/utf8";
import {expect} from "chai";

const toBytesInt32 = (num: number): Buffer => {
    const arr = new ArrayBuffer(4);
    const view = new DataView(arr);
    view.setUint32(0, num);
    return Buffer.from(arr);
};

describe("forum", () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());

    const program = anchor.workspace.SoLingo as Program<SoLingo>;

    const programWallet = (program.provider as anchor.AnchorProvider).wallet;

    let programInfoPDA: PublicKey;
    let grantPDA: PublicKey;
    let author: Keypair;

    // before(async () => {
    //     const [newProgramInfoPDA, program_info_bump] = await anchor.web3.PublicKey.findProgramAddress(
    //         [
    //             encode("question_program_info"),
    //         ],
    //         program.programId
    //     );
    //
    //     programInfoPDA = newProgramInfoPDA;
    //
    //     console.log("kiok")
    //     // initializes the program info
    //     await initProgramInfo()
    //
    // })

    // beforeEach(async () => {
    //     // runs before each test, updates the grant PDA and author keypair
    //     const programInfo = await program.account.questionProgramInfo.fetch(programInfoPDA)
    //
    //     // const [newGrantPDA, grant_bump] = await anchor.web3.PublicKey.findProgramAddress(
    //     //     [
    //     //         encode("grant"),
    //     //         toBytesInt32(programInfo.questionsCount),
    //     //     ],
    //     //     program.programId
    //     // );
    //     //
    //     // grantPDA = newGrantPDA;
    //
    //     // author = await generateFundedKeypair();
    // });

    async function generateFundedKeypair(): Promise<anchor.web3.Keypair> {
        const newKeypair = anchor.web3.Keypair.generate();

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: programWallet.publicKey,
                toPubkey: newKeypair.publicKey,
                lamports: 5 * LAMPORTS_PER_SOL,
            })
        );

        await (
            program.provider as anchor.AnchorProvider
        ).sendAndConfirm(transaction);

        return newKeypair;
    }

    async function initProgramInfo() {
        await program.methods
            .initializeProgramInfo()
            .accounts({
                author: programWallet.publicKey,
                programInfo: programInfoPDA,
            }).rpc();

        return await program.account.questionProgramInfo.fetch(programInfoPDA);
    }

    it("Initializes Grant Program Info!", async () => {

        const [newProgramInfoPDA, program_info_bump] = await anchor.web3.PublicKey.findProgramAddress(
            [
                encode("question_program_info"),
            ],
            program.programId
        );

        programInfoPDA = newProgramInfoPDA;
        console.log(programInfoPDA)

        console.log(await initProgramInfo())

        // const programInfo = await program.account.questionProgramInfo.fetch(programInfoPDA);
        //
        // expect(programInfo.author).to.eql(programWallet.publicKey);
        // expect(programInfo.questionsCount).to.eql(0);

    });
});
