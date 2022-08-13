import Link from "next/link";
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
          <div className="flex flex-col justify-center items-center p-5">
            <div className="text-xl font-bold mb-10">Quest</div>
            <div className="flex gap-5 items-start w-full">
              <Link href="/1">
                <a className="w-[49%] bg-indigo-600 rounded-lg relative">
                  <img
                    alt="1"
                    src="https://source.unsplash.com/random/?one"
                    className="h-48 w-60 rounded-lg"
                    style={{ filter: "brightness(40%)" }}
                  />
                  <p className="absolute top-1/3 left-1/3 text-2xl font-bold">
                    Level 1
                  </p>
                </a>
              </Link>
              <Link href="/2">
                <a className="w-[49%] bg-indigo-600 rounded-lg relative">
                  <img
                    alt="1"
                    src="https://source.unsplash.com/random/?two"
                    className="h-48 w-60 rounded-lg"
                    style={{ filter: "brightness(40%)" }}
                  />
                  <p className="absolute top-1/3 left-1/3 text-2xl font-bold">
                    Level 2
                  </p>
                </a>
              </Link>
              <Link href="/3">
                <a className="w-[49%] bg-indigo-600 rounded-lg relative">
                  <img
                    alt="1"
                    src="https://source.unsplash.com/random/?three"
                    className="h-48 w-60 rounded-lg"
                    style={{ filter: "brightness(40%)" }}
                  />
                  <p className="absolute top-1/3 left-1/3 text-2xl font-bold">
                    Level 3
                  </p>
                </a>
              </Link>
              <a className="w-[49%] bg-indigo-600 rounded-lg relative">
                <img
                  alt="1"
                  src="https://source.unsplash.com/random/?comingsoon"
                  className="h-48 w-60 rounded-lg"
                  style={{ filter: "brightness(40%)" }}
                />
                <p className="absolute top-1/3 left-1/3 text-2xl font-bold">
                  Coming Soon...
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quests;
