import {PublicKey} from "@solana/web3.js";
import "dayjs/plugin/relativeTime";

export interface QuestionModel {

    bump?: number;
    publicKey?: PublicKey;
    author?: PublicKey;
    title?: string;
    description?: string;
    tags?: string;
    upVotes?: number;
    downVotes?: number;
    repliesCount?: number;
    dateCreated?: number;
    isAnswered?: boolean;
    questionNum?: number;
}