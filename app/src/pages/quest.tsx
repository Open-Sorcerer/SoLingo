import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { BasicsView } from "../views";
// import Card from "../components/Card";
import questionsDat from "./api/questionsDat";
import qBank from "./api/questionsDat";
const Quests: NextPage = (props) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const answersDB = new Map();
  return (
    <div>
      <Head>
        <title>Quest</title>
        <meta name="description" content="Quest Topix" />
      </Head>
      <div className="flex justify-center h-full w-full">
        <div className="flex w-3/4 h-full justify-evenly bg-black bg-opacity-50 backdrop-blur-xl rounded-lg drop-shadow-lg text-white m-5 rounded">
          <div className="flex flex-col justify-center items-center p-3">
            <div className="text-xl font-bold mb-3">Quest</div>
            <div className="w-full flex flex-col justify-center items-start border border-gray-300 rounded-lg">
              <div className="text-xl text-white font-bold m-10">
                {qBank[questionIndex].question}
              </div>
              <div className="text-md flex flex-col mx-10 mb-16 gap-3">
                {qBank[questionIndex].answers.map((answer, index) => {
                  return (
                    <div className="text-lg flex flex-row justify-start items-center gap-3">
                      <input
                        type="radio"
                        key={index}
                        name="answer"
                        className="answerBtn custom-radio"
                        id="outline"
                        value={answer}
                        title={answer}
                        onClick={() => {
                          console.log(answer);
                          answersDB.set(questionIndex, answer);
                          console.log(answersDB.get(questionIndex));
                        }}
                      />
                      <div>{answer}</div>
                    </div>
                  );
                })}
              </div>
              <div className="w-full text-md text-white  flex flex-row justify-evenly">
                <button
                  className="backBtn p-3 text-xl w-1/3 bg-[#e42103a1] hover:bg-[#e42103] rounded-bl-lg"
                  onClick={() => setQuestionIndex(questionIndex - 1)}
                >
                  &lt;&nbsp;&nbsp;&nbsp;&nbsp; Prev
                </button>
                <button
                  className="answerBtn p-3 text-xl w-2/3 bg-[#03a0e4b5] hover:bg-[#04adc4] rounded-br-lg"
                  onClick={() => setQuestionIndex(questionIndex + 1)}
                >
                  {questionIndex < qBank.length - 1 ? "Submit" : "Finish"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quests;
