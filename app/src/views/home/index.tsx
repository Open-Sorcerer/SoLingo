// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

// Components
import { RequestAirdrop } from "../../components/RequestAirdrop";
import pkg from "../../../package.json";

// Store
import useUserSOLBalanceStore from "../../stores/useUserSOLBalanceStore";

export const HomeView: FC = ({}) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58());
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  return (
    <div className="flex justify-center h-fit w-full">
      <div
        className="flex flex-row w-1/2 h-full justify-evenly items-center rounded-lg drop-shadow-lg text-white m-5 p-10 gap-5 rounded border-white/20 rounded-xl bg-black/80 text-lg p-10 divide-x"
        style={{
          boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
          border: "1px solid #e7eaf3",
          borderRadius: "0.5rem",
        }}
      >
        <div className="flex flex-col w-1/3 justify-evenly items-center">
          <img src="./wizzie.png" alt="opensorcerer" />
        </div>
        <div className="flex flex-col w-2/3 justify-evenly items-center">
          <h1 className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
            SOLINGO
          </h1>
          <div className="flex flex-col w-full h-full justify-center items-center text-lg py-10 pl-10">
            <p className="font-semibold">
            Learn to Earn platform on Chain!
            </p>
            Educational platforms should be awesome and cool looking like US. Enjoy the platform plus get some cool NFTs to showcase your new-found knowledge.... Go show it off!
          </div>
        </div>
      </div>
    </div>
  );
};
