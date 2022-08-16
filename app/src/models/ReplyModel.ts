import {PublicKey} from "@solana/web3.js";
import "dayjs/plugin/relativeTime";

export interface ReplyModel {
    bump?: number;
    publicKey?: PublicKey;
    author?: PublicKey;
    description?: string;
    tags?: string;
    upVotes?: number;
    downVotes?: number;
    dateCreated?: number,
    correctAnswer?: boolean,
    questionNum?: number,
    replyNum?: number,
}