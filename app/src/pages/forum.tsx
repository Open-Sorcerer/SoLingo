import type {NextPage} from "next";
import Head from "next/head";
import {useState} from "react";
import {ForumView} from "../views/forum";

const Forum: NextPage = (props) => {
    const [page, setPage] = useState(1);
    const [isInputShown, setIsInputShown] = useState(false);
    return (
        <div>
            <Head>
                <title>Forum</title>
                <meta name="description" content="Quest Topic"/>
            </Head>
            < ForumView/>
        </div>
        // <div>
        //     <Head>
        //         <title>Forum</title>
        //         <meta name="description" content="Quest Topix" />
        //     </Head>
        //     <div className="flex justify-center h-full w-full">
        //         <div className="flex w-full h-full justify-evenly bg-black bg-opacity-50 backdrop-blur-xl rounded drop-shadow-lg text-white m-5 rounded">
        //             <div className="flex flex-col justify-center items-center">
        //                 <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195] p-5">
        //                     Forum
        //                 </h1>
        //                 {forumArray.map((elem, index) => (
        //                     <div className="w-full flex flex-col justify-center items-start border border-gray-300">
        //                         <ReplyThread key={index} reply={elem} />
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>
    );
};

export default Forum;
