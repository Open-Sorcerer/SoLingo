import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { BasicsView } from "../views";
// import Card from "../components/Card";
import questionsDat from "./api/questionsDat";
import qBank from './api/questionsDat';
const Quests: NextPage = (props) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const answersDB = new Map();
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta name="description" content="Quest Topix" />
      </Head>
      <div className="flex justify-center h-full w-full">
      <div className="flex w-3/4 h-full justify-evenly bg-white backdrop-blur-lg rounded drop-shadow-lg text-black m-5 rounded">
        <div className="flex flex-col justify-center items-center">
          <div className="text-xl font-bold">Quest</div>
          <div className="text-lg text-black">{qBank[questionIndex].question}</div>
          <div className="text-md flex flex-col mx-10">
            {qBank[questionIndex].answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="answerBtn"
                  onClick={() => {
                    console.log(answer);
                    answersDB.set(questionIndex, answer);
                    console.log(answersDB.get(questionIndex));
                  }}
                >
                  {" "}
                  {answer}
                </button>
              );
            })}
          </div>
          <div className="text-md text-black">
            <button className="backBtn" onClick={() => setQuestionIndex(questionIndex-1)}>Prev</button>
            <button className="answerBtn" onClick={()=>setQuestionIndex(questionIndex+1)}>Next</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Quests;