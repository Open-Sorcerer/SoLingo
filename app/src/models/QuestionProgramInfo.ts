import {PublicKey} from "@solana/web3.js";
import dayjs from "dayjs";
import "dayjs/plugin/relativeTime";

export interface QuestionProgramInfo {

    bump?: number,
    questionsCount?: number,
    author?: PublicKey,
}