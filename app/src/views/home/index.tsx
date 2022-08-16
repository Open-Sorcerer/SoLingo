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
      {/* <div className="flex flex-col w-3/4 h-full justify-start items-center rounded-lg drop-shadow-lg text-white m-5 p-10 gap-5 rounded">
        <div className="flex w-2/3 justify-evenly items-center">
          <div
            className="flex w-fit w-full h-full justify-center items-center m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/20 rounded-xl bg-black/80 text-lg p-10"
            style={{
              boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
              border: "1px solid #e7eaf3",
              borderRadius: "0.5rem",
            }}
          >
            A multichain Defi Dashboard which allows you to track your assets on
            multiple chains. It also allows users to create their own NFTs on
            Polygon with a very friendly user interface. Any media you hold, a
            video, an image, an audio file can be converted to an NFT. The gas
            fees for minting are minimal thanks to the Polygon Network.
            Currently the minter is on Polygon testnet.
          </div>
        </div>
      </div> */}
    </div>
  );
};
