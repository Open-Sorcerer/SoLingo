import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { ReplyModel } from "../models/ReplyModel";

const ReplyThread = (props: { reply: ReplyModel }) => {
  const { reply } = props;
  const [isInputShown, setIsInputShown] = useState(false);
  const [isUpVoted, setIsUpVoted] = useState(false);
  const [isDownVoted, setIsDownVoted] = useState(false);
  return (
    <div className="w-full flex flex-col justify-center items-start px-4 py-3">
      {reply.description}
      <div className="w-full flex flex-row justify-start items-start">
        <div
          tabIndex={0}
          className="btn btn-square btn-ghost text-right"
          onClick={() => {
            // upvoteQuestion(provider, questionData.questionNum)
            //   .then
            //   //TODO reloadQuestion()
            //   ();
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
          {/* <h3 className="text-cyan-500 text-lg font-bold">{`${questionData.upVotes}`}</h3> */}
        </div>
        <div
          tabIndex={0}
          className="btn btn-square btn-ghost text-right"
          onClick={async () => {
            // await downvoteQuestion(provider, questionData.questionNum);
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
    </div>
  );
};

export default ReplyThread;
