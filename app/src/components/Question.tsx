import React, { useState } from "react";
import { QuestionModel } from "../models";
import { displaySlicedString } from "../utils/displaySlicedString";
import { displayPublicKey } from "../utils/getAuthorDisplay";
import { displayCreatedDate } from "../utils/displayCreatedDate";
import upvoteQuestion from "../transactions/question/upvoteQuestion";
import { Provider } from "@project-serum/anchor";
import downvoteQuestion from "../transactions/question/downvoteQuestion";
import { Icon } from "@iconify/react";

type QuestionProps = {
  provider: Provider;
  questionData: QuestionModel;
};

export const Question = ({ provider, questionData }: QuestionProps) => {
  const [isUpVoted, setIsUpVoted] = useState(false);
  const [isDownVoted, setIsDownVoted] = useState(false);
  const [isInputShown, setIsInputShown] = useState(false);
  return (
    <div>
      <div>
        <div className="flex items-start">
          <p className="ml-4 md:ml-6 text-xl font-semibold">
            {questionData.title}
          </p>
        </div>

        <div className="flex items-start">
          <p className="ml-4 md:ml-6 text-white text-lg">
            {displaySlicedString(questionData.description, 200)}
          </p>
        </div>

        <div className="flex items-start">
          <p className="ml-4 md:ml-6 text-white flex flex-row text-md gap-5">
            {questionData.tags.split(',').map((tag) => {
              return <div className="text-cyan-500">#{tag}</div>
            })}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:flex md:items-center mt-5 ml-4 md:ml-6">
          <div className="flex flex-row justify-evenly items-center">
            <div
              tabIndex={0}
              className="btn btn-square btn-ghost text-right"
              onClick={() => {
                upvoteQuestion(provider, questionData.questionNum)
                  .then
                  //TODO reloadQuestion()
                  ();
                setIsUpVoted(!isUpVoted);
                setIsDownVoted(false);
              }}
            >
              {isUpVoted ? (
                <Icon className="text-cyan-500 w-6 h-6" icon="bxs:upvote" />
              ) : (
                <Icon className="text-cyan-500 w-6 h-6" icon="bx:upvote" />
              )}
            </div>
            <div className="flex justify-evenly items-center">
              <h3 className="text-cyan-500 text-lg font-bold">{`${questionData.upVotes}`}</h3>
            </div>
            <div
              tabIndex={0}
              className="btn btn-square btn-ghost text-right"
              onClick={async () => {
                await downvoteQuestion(provider, questionData.questionNum);
                setIsDownVoted(!isDownVoted);
                setIsUpVoted(false);
              }}
            >
              {isDownVoted ? (
                <Icon className="text-cyan-500 w-6 h-6" icon="bxs:downvote" />
              ) : (
                <Icon className="text-cyan-500 w-6 h-6" icon="bx:downvote" />
              )}
            </div>
          </div>
          <div
            tabIndex={0}
            className="btn btn-square btn-ghost text-right flex flex-row w-fit gap-2 px-2"
            onClick={() => setIsInputShown(!isInputShown)}
          >
            {isInputShown ? (
              <Icon
                className="text-cyan-500 w-6 h-6"
                icon="bi:reply-all-fill"
              />
            ) : (
              <Icon className="text-cyan-500 w-6 h-6" icon="bi:reply-all" />
            )}
            <div className="flex justify-evenly items-center">
              <h3 className="text-cyan-500 text-lg font-normal">{`${questionData.repliesCount} replies`}</h3>
            </div>
          </div>

          <div className="w-full flex flex-end items-center md:ml-4">
            <div className="mr-2 w-6 h-6 overflow-hidden shadow rounded-full border-gray-500">
              <div className="w-full h-full bg-gray-200"></div>
            </div>

            <span className="text-md text-gray-400 font-bold">
              {`By ${displayPublicKey(questionData.author)}`}
            </span>
            <span className="hidden md:inline-block ml-10">
              - {`Created on ${displayCreatedDate(questionData.dateCreated)}`}
            </span>
          </div>
        </div>

        {/* <div className="flex flex-col md:flex-row md:items-center mt-5">
          {questionData.replies.map((reply, index) => {
            return <ReplyThread key={index} reply={reply} />;
          })}
        </div> */}
      </div>
    </div>
  );
};
