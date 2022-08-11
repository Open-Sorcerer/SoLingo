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

function getDate(timeStamp: number): string {
    const date = new Date(timeStamp * 1000);

    // convert the above date into human-readable eg. 8/06/2022
    return date.toLocaleDateString("en-US").toString();
}

describe("forum", () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());

    const program = anchor.workspace.SoLingo as Program<SoLingo>;

    const programWallet = (program.provider as anchor.AnchorProvider).wallet;

    let programInfoPDA: PublicKey;
    let questionPDA: PublicKey;
    let replyPDA: PublicKey;
    let author: Keypair;

    let programInfo = null;
    let question = null;

    // test data
    const title = "title";
    const description = "description";
    const tags = "tags";

    before(async () => {
        const [newProgramInfoPDA, program_info_bump] = await anchor.web3.PublicKey.findProgramAddress(
            [
                encode("question_program_info"),
            ],
            program.programId
        );

        programInfoPDA = newProgramInfoPDA;

        // initializes the program info
        await initProgramInfo()
    })

    beforeEach(async () => {
        // runs before each test, updates the grant PDA and author keypair
        programInfo = await program.account.questionProgramInfo.fetch(programInfoPDA)

        const [newQuestionPDA, question_bump] = await anchor.web3.PublicKey.findProgramAddress(
            [
                encode("question"),
                toBytesInt32(programInfo.questionsCount),
            ],
            program.programId
        );

        questionPDA = newQuestionPDA;
        author = await generateFundedKeypair();

        question = await postQuestion(author, title)

        const [newReplyPDA, reply_bump] = await anchor.web3.PublicKey.findProgramAddress(
            [
                encode("reply"),
                toBytesInt32(question.repliesCount),
                toBytesInt32(programInfo.questionsCount),
            ],
            program.programId
        );

        replyPDA = newReplyPDA;
    });

    async function updateQuestionPDA() {
        const [newQuestionPDA, question_bump] = await anchor.web3.PublicKey.findProgramAddress(
            [
                encode("question"),
                toBytesInt32(programInfo.questionsCount),
            ],
            program.programId
        );

        questionPDA = newQuestionPDA;
    }

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

    it("should initialize Grant Program Info!", async () => {

        const programInfo = await program.account.questionProgramInfo.fetch(programInfoPDA);

        expect(programInfo.author).to.eql(programWallet.publicKey);
        expect(programInfo.questionsCount).to.eql(1);

    });

    async function postQuestion(author: Keypair, title: string) {
        await program.methods
            .postQuestion(title, description, tags)
            .accounts({
                author: author.publicKey,
                question: questionPDA,
                programInfo: programInfoPDA,
            })
            .signers([author])
            .rpc();

        return program.account.question.fetch(questionPDA);
    }

    it("should post a question", async () => {

        const question = await program.account.question.fetch(questionPDA);

        expect(question.author).to.eql(author.publicKey);
        expect(question.title).to.eql(title);
        expect(question.description).to.eql(description);
        expect(question.tags).to.eql(tags);
        expect(question.upVotes).to.eql(0);
        expect(question.downVotes).to.eql(0);
        expect(question.repliesCount).to.eql(0);
        expect(question.isAnswered).to.eql(false);
        expect(question.questionNum).to.eql(1);
        expect(question.dateCreated);

        // log the date created
        const dateCreated = getDate(question.dateCreated.toNumber());
        console.log(dateCreated);
    })

    async function postReply(author: Keypair, replyPDA: PublicKey, description: string) {
        await program.methods
            .postReply(description)
            .accounts({
                author: author.publicKey,
                reply: replyPDA,
                question: questionPDA,
                programInfo: programInfoPDA,
            })
            .signers([author])
            .rpc();

        return program.account.reply.fetch(replyPDA);
    }

    it("should post a reply", async () => {

        const reply = await postReply(author, replyPDA, description);

        expect(reply.author).to.eql(author.publicKey);
        expect(reply.description).to.eql(description);
        expect(reply.upVotes).to.eql(0);
        expect(reply.downVotes).to.eql(0);
        expect(reply.correctAnswer).to.eql(false);
        expect(reply.questionNum).to.eql(2);
        expect(reply.replyNum).to.eql(0);
        expect(reply.dateCreated);

        // log the date created
        const dateCreated = getDate(reply.dateCreated.toNumber());
        console.log(dateCreated);
    })

    it("should post a reply to a specific question", async () => {

        console.log(question.questionNum);
        const questionNum = question.questionNum

        // creating PDA for specific question number
        const [replyPDA, reply_bump] = await anchor.web3.PublicKey.findProgramAddress(
            [
                encode("reply"),
                toBytesInt32(question.repliesCount),
                toBytesInt32(questionNum),
            ],
            program.programId
        );

        const reply = await postReply(author, replyPDA, description);

        expect(reply.author).to.eql(author.publicKey);
        expect(reply.description).to.eql(description);
        expect(reply.upVotes).to.eql(0);
        expect(reply.downVotes).to.eql(0);
        expect(reply.correctAnswer).to.eql(false);
        expect(reply.questionNum).to.eql(questionNum);
        expect(reply.replyNum).to.eql(0);
        expect(reply.dateCreated);

        // log the date created
        const dateCreated = getDate(reply.dateCreated.toNumber());
        console.log(dateCreated);
    })

    async function getReplyPDA(questionNum: number, replyNum: number,) {
        const [replyPDA, grant_bump] = await anchor.web3.PublicKey.findProgramAddress(
            [
                encode("reply"),
                toBytesInt32(replyNum),
                toBytesInt32(questionNum),
            ],
            program.programId
        );

        return replyPDA;
    }

    it('should get reply for a specific question', async () => {

        // gets address for 0th reply for 2nd question
        const replyPDA = await getReplyPDA(2, 0)
        const reply = await program.account.reply.fetch(replyPDA);

        expect(reply.description).to.eql(description);
    });
});
