import Link from "next/link";
import type {NextPage} from "next";
import Head from "next/head";
import getUserStatsPDA from "../transactions/pda/getUserStatsPDA";
import getProgram from "../transactions/api/getProgram";
import getProvider from "../transactions/api/getProvider";
import {useWallet} from "@solana/wallet-adapter-react";
import {Icon} from "@iconify/react";
import {useEffect, useState} from "react";
import incrementLevel from "../transactions/quiz/incrementLevel";
import initializeUserStats from "../transactions/quiz/initializeUserStats";
import {UserQuizStats} from "../models";

const Quests: NextPage = () => {
    const wallet = useWallet();
    const provider = getProvider(wallet)
    const program = getProgram(provider);
    const [level, setLevel] = useState(1);
    const [level_array, setLevelArray] = useState([]);
    const [dis_level, setDisLevel] = useState([]);
    const [fetchLevel, setFetchLevel] = useState(false);

    const fetch_level = async () => {
        const userStatsPDA = await getUserStatsPDA(program, wallet.publicKey)
        // await incrementLevel(provider, wallet.publicKey)
        try {
            // @ts-ignore
            const level_no: UserQuizStats = await program.account.userQuizStats.fetch(userStatsPDA)
            console.log(level_no.level);
            setLevel(level_no.level)
            if(!fetchLevel){
                for (let i = 1; i <= level; i++) {
                    level_array.push(i);
                    setLevelArray(level_array);
                    console.log(level_array);
                }
                for (let j = level + 1; j <= 3; j++) {
                    dis_level.push(j);
                    setDisLevel(dis_level);
                    console.log(dis_level);
                }
                setFetchLevel(true)
            }
        } catch (e) {
            await initializeUserStats(provider, wallet.publicKey)
        }

    }

    useEffect(() => {
        fetch_level().then();
    }, []);

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
                        <br/>
                        <br/>
                        {
                            fetchLevel ? (<div className="flex gap-5 items-start w-full">
                                    {level_array.map((level, index) => (
                                            <div key={index}>
                                                <Link href={`/${level}`}>
                                                    <a className="w-full bg-indigo-600 rounded-lg relative flex justify-center items-center">
                                                        <img
                                                            alt="1"
                                                            src="./texture.png"
                                                            className="h-48 w-full rounded-lg"
                                                            style={{filter: "brightness(50%)"}}
                                                        />
                                                        <p className="absolute flex flex-col items-center justify-evenly">
                                                            <div
                                                                className="text-white text-2xl font-bold ">Level {level}</div>
                                                        </p>
                                                    </a>
                                                </Link>
                                            </div>
                                        )
                                    )}
                                    {dis_level.map((level, index) => (
                                            <div key={index}>
                                                <button
                                                    className="w-full bg-black-600 rounded-lg relative flex justify-center items-center">
                                                    <img
                                                        alt="1"
                                                        src="./texture.png"
                                                        className="h-48 w-full rounded-lg"
                                                        style={{filter: "brightness(20%)"}}
                                                    />
                                                    <p className="absolute flex flex-col items-center justify-evenly">
                                                        <div className="text-white text-2xl font-bold ">Level {level}</div>
                                                    </p>
                                                </button>
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
                                <h4 className="mt-5 text-xl text-white/60 footer-center">
                                    Please wait until your progress loads...
                                </h4>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quests;
