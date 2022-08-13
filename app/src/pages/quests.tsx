import Link from 'next/link'
import type { NextPage } from "next";
import Head from "next/head";

const Quests: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Quests</title>
        <meta name="description" content="Quest Topics" />
      </Head>
      <div className="flex justify-center h-full w-full">
        <div className="flex w-3/4 h-full justify-evenly bg-black bg-opacity-50 backdrop-blur-xl rounded-lg drop-shadow-lg text-white m-5 rounded">
          <div className="flex flex-col justify-center items-center p-3">
            <div className="text-xl font-bold mb-3">Quest</div>
              <div className="flex flex-col items-start w-full">
                <Link href="/1">
                  <a className="w-[49%] py-3 bg-indigo-600 rounded-lg">Level 1</a>
                </Link>
                <Link href="/2">
                  <a className="w-[49%] py-3 bg-indigo-600 rounded-lg">Level 2</a>
                </Link>
                <Link href="/3">
                  <a className="w-[49%] py-3 bg-indigo-600 rounded-lg">Level 3</a>
                </Link>
                <a className="w-[49%] py-3 bg-indigo-600 rounded-lg">Coming Soon...</a>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quests;
