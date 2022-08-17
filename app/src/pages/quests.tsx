import type {NextPage} from "next";
import {useCookies} from "react-cookie"
import Head from "next/head";
import getUserStatsPDA from "../transactions/pda/getUserStatsPDA";
import getProgram from "../transactions/api/getProgram";
import getProvider from "../transactions/api/getProvider";
import {useWallet} from "@solana/wallet-adapter-react";
import {Icon} from "@iconify/react";
import {useEffect, useState} from "react";
import initializeUserStats from "../transactions/quiz/initializeUserStats";
import {UserQuizStats} from "../models";
import {Levels} from "../components/Levels"

const Quests: NextPage = () => {
    const wallet = useWallet();
    const provider = getProvider(wallet)
    const program = getProgram(provider);
    const level_array: number[] = [1, 2, 3];
    let [max_level, setMaxLevel] = useCookies(["user"]);
    let [fetchLevel, setFetchLevel] = useState(false);

    const fetch_level = async () => {
        const userStatsPDA = await getUserStatsPDA(program, wallet.publicKey)
        try {
            // @ts-ignore
            const level_no: UserQuizStats = await program.account.userQuizStats.fetch(userStatsPDA)
            let level_main = level_no.level
            if(level_main == 0){
                level_main = 1
            }
            setMaxLevel("user", {
                user: wallet.publicKey,
                level: level_main,
                sameSite: true,
            })
            console.log(max_level);
            if (!fetchLevel) {
                setFetchLevel(true)
            }
        } catch (e) {
            await initializeUserStats(provider, wallet.publicKey)
        }
    }

    // @ts-ignore
    return (
        <div>
            <Head>
                <title>Quests</title>
                <meta name="description" content="Quest Topics"/>
            </Head>
            <div className="flex justify-center h-full w-full">
                <div
                    className="flex w-3/4 h-full justify-evenly bg-black bg-opacity-50 backdrop-blur-xl rounded-lg drop-shadow-lg text-white m-5 rounded">
                    <div className="flex flex-col justify-center items-center p-5">
                        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195] ">
                            Quests
                        </h1>
                        <h4 className="mt-5 text-xl text-white/60 footer-center">
                            The quiz are based on <a href="https://solanacookbook.com/#contributing">Solana
                            Cookbook</a>. <br/>You have to score 4 and above to pass the levels.
                        </h4>
                        {
                            (fetchLevel) ? (
                                <div className="flex gap-5 items-start w-full">
                                    {level_array.map((level, index) => (
                                            <div key={index}>
                                                <Levels
                                                    level={level}
                                                    status = {level <= max_level.user.level}
                                                    />
                                            </div>
                                        )
                                    )}
                                    <div>
                                        <button
                                            className="w-full bg-indigo-600 rounded-lg relative flex justify-center items-center">
                                            <img
                                                alt="retry"
                                                src="./texture.png"
                                                className="h-48 w-full rounded-lg"
                                                style={{filter: "brightness(20%)"}}
                                            />
                                            <p className="absolute flex flex-col items-center justify-evenly">
                                                <div className="text-white text-2xl font-bold ">Coming Soon</div>
                                                <Icon className="text-cyan-500 w-16 h-16"
                                                      icon="eos-icons:three-dots-loading"/>
                                            </p>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <h3 className="mt-5 text-xl text-white/60 footer-center">
                                        If this is your first time using the platform, then you will have to initialize
                                        your
                                        account first!
                                    </h3>
                                    <br/>
                                    <button
                                        className="w-1/2 bg-indigo-600 rounded-lg relative flex justify-center items-center"
                                        onClick={fetch_level}>
                                        <img
                                            alt="retry"
                                            src="./texture.png"
                                            className="h-48 w-full rounded-lg"
                                            style={{filter: "brightness(20%)"}}
                                        />
                                        <p className="absolute flex flex-col items-center justify-evenly">
                                            <div className="text-white text-2xl font-bold ">Load Progress...</div>
                                        </p>
                                    </button>
                                </div>


                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quests;
