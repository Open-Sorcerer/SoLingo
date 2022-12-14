import { useEffect, useRef, useState } from "react";
import { Question } from "../../components/Question";
import postQuestion from "../../transactions/question/postQuestion";
import getProvider from "../../transactions/api/getProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import { QuestionModel } from "../../models";
import { notify } from "../../utils/notifications";
import getQuestions from "../../transactions/question/getQuestions";
import getProgram from "../../transactions/api/getProgram";
import { getProgramInfoPDA } from "../../transactions";
import { Icon } from "@iconify/react";
import Tags from "components/Tags";

export const ForumView = ({}) => {
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const programInfo = useRef<any>();
  const currentGrantIndex = useRef(0);
  const totalQuestionsFetched = useRef(0);
  const [loadingView, setLoadingView] = useState<-1 | 0 | 1>(1); // 1 -> show loading spinner, 0 -> show load more button, -1 -> show none

  const wallet = useWallet();
  const provider = getProvider(wallet);
  const [isInputShown, setIsInputShown] = useState(false);
  const fetchQuestions = async () => {
    try {
      setLoadingView(1);

      if (!programInfo.current) {
        const program = getProgram(provider);
        const programInfoPDA = await getProgramInfoPDA(program);
        const programInfoFetched =
          await program.account.questionProgramInfo.fetch(programInfoPDA);

        if (!programInfoFetched) {
          setLoadingView(0);
          return notify({
            type: "error",
            message: "error",
            description: "Something went wrong! please try again later",
          });
        }
        programInfo.current = programInfoFetched;
      }

      const numQuestionsToFetchAtATime = 8;
      let questionsData = [];

      while (
        programInfo.current.questionsCount > totalQuestionsFetched.current &&
        questionsData.length < numQuestionsToFetchAtATime
      ) {
        const startIndex = currentGrantIndex.current;
        let endIndex: number =
          startIndex + numQuestionsToFetchAtATime - questionsData.length - 1;
        if (endIndex > programInfo.current.questionsCount - 1) {
          endIndex = programInfo.current.questionsCount - 1;
        }

        console.log(
          programInfo.current.questionsCount,
          totalQuestionsFetched.current
        );

        const questions = await getQuestions(provider, startIndex, endIndex);
        if (questions.err) {
          setLoadingView(0);
          return notify({
            type: "error",
            message: "error",
            description: "Something went wrong! please try again later",
          });
        }

        questionsData = questions.data;
        totalQuestionsFetched.current += questions.data.length;

        currentGrantIndex.current += questionsData.length;
        console.log(questions);
        setQuestions(questions.data);
      }

      if (
        programInfo.current.questionsCount === totalQuestionsFetched.current
      ) {
        setLoadingView(-1);
      } else {
        setLoadingView(0);
      }
    } catch (error) {
      console.log(error);
      setLoadingView(0);
      return notify({
        type: "error",
        message: "error",
        description: "Something went wrong! please try again later",
      });
    }
  };

  useEffect(() => {
    fetchQuestions().then();
  }, []);

  const sampleQuestion = {
    title: "What is the best way to get started with Solana?",
    description:
      "I am new to Solana and I would like to get started with it. What is the best way to get started with Solana?",
    tags: "solana,anchor,newbie",
  };

  return (
    <div className="flex justify-center h-full w-full">
      <div className="flex flex-col w-3/4 h-full justify-start items-center bg-black bg-opacity-50 backdrop-blur-xl rounded-lg drop-shadow-lg text-white m-5 p-10 gap-5 rounded">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Forum
        </h1>
        <div className="w-full flex flex-col justify-center items-start">
          <div
            className="w-full flex flex-row items-center"
            onClick={() => {
              setIsInputShown(!isInputShown);
            }}
          >
            <div
              tabIndex={0}
              className="btn btn-ghost text-right flex flex-row gap-2"
            >
              {isInputShown ? (
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
                {isInputShown ? "Close" : "Ask a new question"}
              </p>
            </div>
          </div>
          <form
            className={
              "flex flex-col gap-1 items-center w-full py-4 p-10 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/20 rounded-xl bg-black/40 " +
              (isInputShown ? "flex" : "hidden")
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
              rows={6}
            />
            <Tags />
            <div className="w-full flex flex-row justify-between items-center bg-transparent">
              <button
                type="submit"
                className="w-full bg-indigo-700 text-white hover:bg-indigo-800 font-normal text-md rounded-lg py-1 ml-5"
                onClick={async () => {
                  sampleQuestion.title = (
                    document.getElementById("title") as HTMLInputElement
                  ).value;
                  sampleQuestion.description = (
                    document.getElementById("description") as HTMLInputElement
                  ).value;
                  await postQuestion(provider, sampleQuestion);
                }}
              >
                Post Question
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/20 rounded-xl bg-black/40">
          {questions.length > 0 ? (
            questions.map((item, index) => (
              <div className="w-full" key={index}>
                <Question
                  // @ts-ignore
                  provider={provider}
                  questionData={item}
                />
              </div>
            ))
          ) : (
            <div className="animate-pulse">
              <div className="h-40 w-full">
                <h1 className="text-lg">Loading...</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
