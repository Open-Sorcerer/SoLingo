import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import quizJson from "./api/quiz.json";
import { Icon } from "@iconify/react";
const Quests: NextPage = (props) => {
  //Takes query from router and uses it call specific question json.
  const router = useRouter();
  let { quiz } = router.query;
  if (Array.isArray(quiz)) {
    quiz = quiz.join("");
  }

  const no = parseInt(quiz) - 1;
  console.log(no)
  let questions = quizJson[no][1]

  //These are used to maintain question and score state.
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };

  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
  };

  const handleAnswerOption = (answer: string) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
  };

  const handleSubmitButton = () => {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      questions[i].answerOptions.map(
        (answer) =>
          answer.isCorrect &&
          answer.answer === selectedOptions[i]?.answerByUser &&
          (newScore += 1)
      );
    }
    setScore(newScore);
    setShowScore(true);
  };

  return (
    <div>
      <Head>
        <title> Level {quiz} </title>
        <meta name="description" content="Quest Topix" />
      </Head>
      <div className="flex justify-center h-full w-full">
        <div className="flex w-3/4 h-full justify-evenly bg-black bg-opacity-50 backdrop-blur-xl rounded-lg drop-shadow-lg text-white m-5 rounded">
          <div className="flex flex-col justify-center items-center p-3">
            <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
              Quiz Level {quiz}
            </h1>
            {/* If showScore is true then we will display result or else we will display questions */}
            {showScore ? (
              <div className="flex flex-col justify-center items-center gap-10 p-10">
                <h1 className="text-3xl font-semibold text-center text-white">
                  You scored {score}.0 / {questions.length}.0
                </h1>
                <div className="flex flex-row justify-center items-center gap-10">
                  <Link href="/quests">
                    <a className="w-full bg-indigo-600 rounded-lg relative flex justify-center items-center">
                      <img
                        alt="retry"
                        src="./texture.png"
                        className="h-48 w-full rounded-lg"
                        style={{ filter: "brightness(40%)" }}
                      />
                      <p className="absolute">
                        <div className="text-white text-2xl font-bold ">
                          Retry
                        </div>
                        <Icon
                          className="text-cyan-500 w-16 h-16"
                          icon="bx:reset"
                        />
                      </p>
                    </a>
                  </Link>
                  {/* If the score is less then 8 then you can't upload the result */}
                  {score < 4 ? (
                    <></>
                  ) : (
                    <button
                      onClick={handlePrevious}
                      className="w-full bg-indigo-600 rounded-lg relative flex justify-center items-center"
                    >
                      <img
                        alt="upload"
                        src="./texture.png"
                        className="h-48 w-full rounded-lg"
                        style={{ filter: "brightness(40%)" }}
                      />
                      <p className="absolute">
                        <div className="text-white text-2xl font-bold ">
                          Upload
                        </div>
                        <Icon
                          className="text-cyan-500 w-16 h-16"
                          icon="akar-icons:cloud-upload"
                        />
                      </p>
                    </button>
                  )}
                </div>
                {score < 4 ? (
                  <>
                    <h1 className="text-3xl font-semibold text-center text-white">
                      You failed to clear this round. Better luck next time!
                    </h1>
                  </>
                ) : (
                  <>
                    <h1 className="text-3xl font-semibold text-center text-white">
                      You cleared this round successfully !
                    </h1>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="flex flex-col items-start w-full">
                  <h4 className="mt-10 text-xl text-white/60">
                    Question {currentQuestion + 1} of {questions.length}
                  </h4>
                  <div className="mt-4 text-2xl text-white">
                    {questions[currentQuestion].question}
                  </div>
                  <div className="flex flex-col w-full">
                    {questions[currentQuestion].answerOptions.map(
                      (answer, index) => (
                        <div
                          key={index}
                          className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5"
                          onClick={(e) => handleAnswerOption(answer.answer)}
                        >
                          <input
                            title="Answer"
                            type="radio"
                            name={answer.answer}
                            value={answer.answer}
                            onChange={(e) => handleAnswerOption(answer.answer)}
                            checked={
                              answer.answer ===
                              selectedOptions[currentQuestion]?.answerByUser
                            }
                            className="w-6 h-6 bg-black"
                          />
                          <p className="ml-6 text-white">{answer.answer}</p>
                        </div>
                      )
                    )}
                  </div>
                  <div className="flex justify-between w-full mt-4 text-white">
                    <button
                      onClick={handlePrevious}
                      className="w-[49%] py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                    >
                      Previous
                    </button>
                    <button
                      onClick={
                        currentQuestion + 1 === questions.length
                          ? handleSubmitButton
                          : handleNext
                      }
                      className="w-[49%] py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                    >
                      {currentQuestion + 1 === questions.length
                        ? "Submit"
                        : "Next"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quests;
