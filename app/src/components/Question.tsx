import React from "react";
import {QuestionModel} from "../models";
import {displaySlicedString} from "../utils/displaySlicedString";
import {BiCommentDetail, BiDownvote} from "react-icons/bi";
import {displayPublicKey} from "../utils/getAuthorDisplay";
import {displayCreatedDate} from "../utils/displayCreatedDate";
import upvoteQuestion from "../transactions/question/upvoteQuestion";
import {Provider} from "@project-serum/anchor";
import downvoteQuestion from "../transactions/question/downvoteQuestion";

type QuestionProps = {
    provider: Provider,
    questionData: QuestionModel
}

export const Question = ({ provider, questionData }: QuestionProps) => {
    return (

        <div>
            <div>
                <div className="flex items-start">
                    <div className="row-2">
              <span
                  className="inline-flex justify-center items-center w-6 h-6 rounded text-white font-medium text-sm">
                    <svg className="hover:fill-[#14F195] " width="32" height="32" viewBox="0 0 32 32" onClick={
                        () => {
                            upvoteQuestion(provider, questionData.questionNum).then(
                                //TODO reloadQuestion()
                            );
                        }
                    }
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 0c8.836 0 16 7.164 16 16s-7.164 16 -16 16S0 24.836 0 16 7.164 0 16 0zm8.706
                            19.516H10.34l-2.838 2.814H21.66l2.838 -2.816zm-3.046 -5.292H7.294l-0.068 0.008l2.84 2.816
                            0.07 0.06c0.1 0.07 0.22 0.11 0.344 0.11h14.366l0.068 -0.008l-2.84 -2.816 -0.07 -0.06zM24.706
                             9H10.34l-2.838 2.816H21.66l2.838 -2.814z"
                        />
                    </svg>
              </span>
                    </div>

                    <p className="ml-4 md:ml-6">
                        {questionData.title}
                    </p>
                </div>

                <div className="flex items-start">
                    <div>
              <span
                  className="inline-flex justify-center items-center w-6 h-6 rounded bg-gray-200 text-gray-800 font-medium text-sm">
                <BiDownvote
                onClick={
                    async () => {
                    await downvoteQuestion(provider, questionData.questionNum)
                }
                }/>
              </span>
                    </div>

                    <p className="ml-4 md:ml-6 text-gray-800">
                        {displaySlicedString(questionData.description, 200)}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 md:flex md:items-center mt-5 md:ml-12">
                    <div
                        className="flex md:items-center bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 cursor-pointer group">
                        <BiCommentDetail className="mr-2"/>
                        <span className="text-sm text-gray-800">{`${questionData.repliesCount} comments`}</span>
                    </div>
                    <div
                        className="flex md:items-center bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 cursor-pointer group">
                        <span className="text-sm text-gray-800">{`${questionData.upVotes} upvotes`}</span>
                    </div>

                    <div className="flex items-center md:ml-4">
                        <div className="mr-2 w-6 h-6 overflow-hidden shadow rounded-full border-gray-500">
                            <div className="w-full h-full bg-gray-200"></div>
                        </div>

                        <span className="text-sm text-gray-800 font-bold">
                            {`By ${displayPublicKey(questionData.author)}`}
                        </span>
                        <span
                            className="hidden md:inline-block ml-10">- {`Created on ${displayCreatedDate(questionData.dateCreated)}`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};