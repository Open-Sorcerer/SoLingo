import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import forumArray from "./api/forumDat";
import ReplyThread from "../components/ReplyThread";
const Quests: NextPage = (props) => {
  const [page, setPage] = useState(1);
  const [isInputShown, setIsInputShown] = useState(false);
  return (
    <div>
      <Head>
        <title>Forum</title>
        <meta name="description" content="Quest Topix" />
      </Head>
      <div className="flex justify-center h-full w-full">
        <div className="flex w-full h-full justify-evenly bg-black bg-opacity-50 backdrop-blur-xl rounded drop-shadow-lg text-white m-5 rounded">
          <div className="flex flex-col justify-center items-center">
            <div className="text-xl font-bold">Forum</div>
            {forumArray.map((elem, index) => (
              <div className="w-full flex flex-col justify-center items-start border border-gray-300">
                  <ReplyThread key={index} reply={elem} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quests;
