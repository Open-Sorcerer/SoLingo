import React, { useState } from "react";
import { Icon } from "@iconify/react";

const ReplyThread = (props: { reply: any }) => {
  const { reply } = props;
  const [isInputShown, setIsInputShown] = useState(false);
  const [isUpVoted, setIsUpVoted] = useState(false);
  const [isDownVoted, setIsDownVoted] = useState(false);
  return (
    <div className="w-full flex flex-col justify-center items-start px-4 py-3 border border-gray-300">
      {reply.msg}
      <div className="w-full flex flex-row justify-start items-start">
        <div
          tabIndex={0}
          className="btn btn-square btn-ghost text-right"
          onClick={() => {
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
        <div
          tabIndex={0}
          className="btn btn-square btn-ghost text-right"
          onClick={() => {
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
        <div
          tabIndex={0}
          className="btn btn-square btn-ghost text-right"
          onClick={() => setIsInputShown(!isInputShown)}
        >
          {isInputShown ? (
            <Icon className="text-cyan-500 w-6 h-6" icon="bi:reply-all-fill" />
          ) : (
            <Icon className="text-cyan-500 w-6 h-6" icon="bi:reply-all" />
          )}
        </div>
      </div>
      <form
        className={"w-full flex flex-col " + (isInputShown ? "flex" : "hidden")}
      >
        <textarea
          placeholder="Enter reply"
          className={
            "w-full flex flex-col justify-center items-start bg-transparent border border-gray-300"
          }
        />
        <div className="w-full flex flex-row justify-between items-center bg-transparent border border-gray-300">
          <input title="upload" type="file" className="w-1/2" />
          <input
            type="submit"
            value="Submit"
            className="w-1/2 rounded bg-black opacity-70 text-white hover:opacity-100 hover:text-cyan-500"
          />
        </div>
      </form>
      {reply.replies ? (
        <div className="w-full flex flex-col justify-center items-start border border-gray-300 pl-24">
          {reply.replies.map((elem: any, i: React.Key) => (
            <ReplyThread key={i} reply={elem} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ReplyThread;
