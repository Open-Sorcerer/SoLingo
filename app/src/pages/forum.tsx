import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import forumArray from "./api/forumDat";
import NewThread from '../components/NewThread';
const Quests: NextPage = (props) => {
  const [page, setPage] = useState(1);
  const [isInputShown, setIsInputShown] = useState(false);
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta name="description" content="Quest Topix" />
      </Head>
      <div className="flex justify-center h-full w-full">
        <div className="flex w-full h-full justify-evenly bg-black bg-opacity-50 backdrop-blur-xl rounded drop-shadow-lg text-white m-5 rounded">
          <div className="flex flex-col justify-center items-center">
            <div className="text-xl font-bold">Forum</div>
            {forumArray.map((elem, index) => (
              <div
                key={index}
                className="w-full flex flex-col justify-center items-start px-4 py-3 border border-gray-300 text-xl"
              >
                {elem.question}
                <div className="w-full flex flex-col justify-center items-start border border-gray-300 pl-24">
                  {elem.replies.map((reply, i) => (
                    <NewThread key={i} reply={reply} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quests;
