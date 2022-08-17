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
import {QuestionModel, UserQuizStats} from "../models";
import {Provider} from "@project-serum/anchor";

type LevelsProps = {
    level: number
    status: boolean
};

export const Levels = ({ level, status }: LevelsProps)  => {

    // @ts-ignore
    return (
        <div>
        {
            (status) ? (
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
            ) : (
                <button className="w-full bg-indigo-600 rounded-lg relative flex justify-center items-center">
                    <img
                        alt="1"
                        src="./texture.png"
                        className="h-48 w-full rounded-lg"
                        style={{filter: "brightness(20%)"}}
                    />
                    <p className="absolute flex flex-col items-center justify-evenly">
                        <div
                            className="text-white text-2xl font-bold ">Level {level}</div>
                    </p>
                </button>
            )
        }
        </div>

    );
};

