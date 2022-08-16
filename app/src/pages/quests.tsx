import Link from "next/link";
import type { NextPage } from "next";
import Head from "next/head";
import getUserStatsPDA from "../transactions/pda/getUserStatsPDA";
import getProgram from "../transactions/api/getProgram";
import getProvider from "../transactions/api/getProvider";
import {useAnchorWallet} from "@solana/wallet-adapter-react";
import { Icon } from "@iconify/react";

const Quests: NextPage = () => {
  const wallet = useAnchorWallet();
  const provider = getProvider(wallet)
  const program = getProgram(provider)

  // const userStatsPDA = await getUserStatsPDA(program, wallet.publicKey)
  //
  // const level_no = program.account.quiz.fetch(userStatsPDA)

  return (
    <div>
      <Head>
        <title>Quests</title>
        <meta name="description" content="Quest Topics" />
      </Head>
      <div className="flex justify-center h-full w-full">
        <div className="flex w-3/4 h-full justify-evenly bg-black bg-opacity-50 backdrop-blur-xl rounded-lg drop-shadow-lg text-white m-5 rounded">
          <div className="flex flex-col justify-center items-center p-5">
            <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195] pb-10">
              Quests
            </h1>
            <h4 className="mt-10 text-xl text-white/60 footer-center">
              The quiz are based on <a href="https://solanacookbook.com/#contributing">Solana Cookbook</a>. <br/>You have to score 4 and above to pass the levels.
            </h4>
            <div className="flex gap-5 items-start w-full">
              <Link href="/1">
              <a className="w-full bg-indigo-600 rounded-lg relative flex justify-center items-center">
                  <img
                    alt="1"
                    src="./texture.png"
                    className="h-48 w-full rounded-lg"
                    style={{ filter: "brightness(40%)" }}
                  />
                  <p className="absolute flex flex-col items-center justify-evenly">
                    <div className="text-white text-2xl font-bold ">Level</div>
                    <Icon className="text-cyan-500 w-16 h-16" icon="bi:1-circle-fill" />
                  </p>
                </a>
              </Link>
              <Link href="/2">
              <a className="w-full bg-indigo-600 rounded-lg relative flex justify-center items-center">
                  <img
                    alt="2"
                    src="./texture.png"
                    className="h-48 w-full rounded-lg"
                    style={{ filter: "brightness(40%)" }}
                  />
                  <p className="absolute flex flex-col items-center justify-evenly">
                    <div className="text-white text-2xl font-bold ">Level</div>
                    <Icon className="text-cyan-500 w-16 h-16" icon="bi:2-circle-fill" />
                  </p>
                </a>
              </Link>
              <Link href="/3">
                <a className="w-full bg-indigo-600 rounded-lg relative flex justify-center items-center">
                  <img
                    alt="3"
                    src="./texture.png"
                    className="h-48 w-full rounded-lg"
                    style={{ filter: "brightness(40%)" }}
                  />
                  <p className="absolute flex flex-col items-center justify-evenly">
                    <div className="text-white text-2xl font-bold ">Level</div>
                    <Icon className="text-cyan-500 w-16 h-16" icon="bi:3-circle-fill" />
                  </p>
                </a>
              </Link>
              <a className="w-full bg-indigo-600 rounded-lg relative flex justify-center items-center">
                  <img
                    alt="retry"
                    src="./texture.png"
                    className="h-48 w-full rounded-lg"
                    style={{ filter: "brightness(40%)" }}
                  />
                  <p className="absolute flex flex-col items-center justify-evenly">
                    <div className="text-white text-2xl font-bold ">Coming Soon</div>
                    <Icon className="text-cyan-500 w-16 h-16" icon="eos-icons:three-dots-loading" />
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
