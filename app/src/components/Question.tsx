import React, { useEffect, useRef, useState } from "react";
import { QuestionModel } from "../models";
import { displaySlicedString } from "../utils/displaySlicedString";
import { displayPublicKey } from "../utils/getAuthorDisplay";
import { displayCreatedDate } from "../utils/displayCreatedDate";
import upvoteQuestion from "../transactions/question/upvoteQuestion";
import { Provider } from "@project-serum/anchor";
import downvoteQuestion from "../transactions/question/downvoteQuestion";
import { Icon } from "@iconify/react";
import ReplyThread from "./ReplyThread";
import getProgram from "../transactions/api/getProgram";
import { getProgramInfoPDA } from "../transactions";
import { notify } from "../utils/notifications";
import getReplies from "../transactions/reply/getReplies";
import { ReplyModel } from "../models/ReplyModel";
import postReply from "../transactions/reply/postReply";
import Tags from "./Tags";

type QuestionProps = {
  provider: Provider;
  questionData: QuestionModel;
};

export const Question = ({ provider, questionData }: QuestionProps) => {
  const [replies, setReplies] = useState<ReplyModel[]>([]);
  const programInfo = useRef<any>();
  const currentGrantIndex = useRef(0);
  const totalRepliesFetched = useRef(0);
  const [loadingView, setLoadingView] = useState<-1 | 0 | 1>(1); // 1 -> show loading spinner, 0 -> show load more button, -1 -> show none

  const fetchReplies = async () => {
    try {
      setLoadingView(1);

      const replies = await getReplies(
        provider,
        questionData.questionNum,
        0,
        questionData.repliesCount - 1
      );

      if (replies.err) {
        setLoadingView(0);
        return notify({
          type: "error",
          message: "error",
          description: "Something went wrong! please try again later",
        });
      }

      totalRepliesFetched.current += replies.data.length;

      currentGrantIndex.current += replies.data.length;
      setReplies(replies.data);
    } catch (error) {
      console.log(error);

      return notify({
        type: "error",
        message: "error",
        description: "Something went wrong! please try again later",
      });
    }
  };

  useEffect(() => {
    fetchReplies().then();
  }, [fetchReplies]);

  const [isUpVoted, setIsUpVoted] = useState(false);
  const [isDownVoted, setIsDownVoted] = useState(false);
  const [isInputShown, setIsInputShown] = useState(false);
  const [isReplyInputShown, setIsReplyInputShown] = useState(false);
  return (
    <div>
      <div className="w-full px-5">
        <div className="flex items-start">
          <p className="text-xl font-semibold">
            {questionData.title}
          </p>
        </div>

        <div className="flex items-start">
          <p className="text-white text-lg">
            {displaySlicedString(questionData.description, 200)}
          </p>
        </div>

        <div className="flex items-start">
          <p className="text-white flex flex-row text-md gap-5">
            {questionData.tags.split(",").map((tag, idx) => {
              return (
                <div key={idx} className="text-cyan-500">
                  #{tag}
                </div>
              );
            })}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:flex md:items-center mt-5">
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
              <h3
                className="text-cyan-500 text-lg font-normal"
                onClick={async () => {}}
              >{`${questionData.repliesCount} replies`}</h3>
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

        {isInputShown && (
          <div className="flex flex-col justify-evenly items-start w-full py-4 p-5 border-2 cursor-pointer border-white/20 rounded-xl">
            <div
              className="w-full flex flex-row items-center"
              onClick={() => {
                setIsReplyInputShown(!isReplyInputShown);
              }}
            >
              <div
                tabIndex={0}
                className="btn btn-ghost text-right flex flex-row gap-2"
              >
                {isReplyInputShown ? (
                  <Icon
                    className="text-cyan-500 w-6 h-6"
                    icon="fluent:comment-add-20-filled"
                  />
                ) : (
                  <Icon
                    className="text-cyan-500 w-6 h-6"
                    icon="fluent:comment-add-20-regular"
                  />
                )}
                <p className="text-cyan-500 text-md">
                  {isReplyInputShown ? "Close" : "Add a new Reply"}
                </p>
              </div>
            </div>
            {isReplyInputShown && (
              <>
                <form
                  className={
                    "flex flex-col gap-1 items-center w-full py-4 p-10 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/20 rounded-xl bg-black/40 " +
                    (isReplyInputShown ? "flex" : "hidden")
                  }
                >
                  <input
                    id="title"
                    placeholder="Title"
                    className={
                      "w-full flex flex-col justify-center items-start bg-transparent py-2 px-5 text-xl font-semibold"
                    }
                  />
                  <textarea
                    id="description"
                    placeholder="Description"
                    className={
                      "w-full flex flex-col justify-center items-start bg-transparent py-2 px-4 text-lg"
                    }
                    rows={4}
                  />
                  <Tags />
                  <div className="w-full flex flex-row justify-between items-center bg-transparent">
                    <button
                      type="submit"
                      className="w-full bg-indigo-700 text-white hover:bg-indigo-800 font-normal text-md rounded-lg py-1 ml-5"
                      onClick={async () => {
                        await postReply(provider, questionData.questionNum, {
                          description: "Lorem Ipsum Dolor Sit Amet",
                        });
                      }}
                    >
                      Post Reply
                    </button>
                  </div>
                </form>
              </>
            )}
            {replies.length > 0 &&
              replies.map((reply, index) => (
                <div key={index}>
                  <ReplyThread reply={reply} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
