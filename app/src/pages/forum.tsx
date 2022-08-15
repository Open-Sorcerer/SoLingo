import type {NextPage} from "next";
import Head from "next/head";
import {useState} from "react";
import {ForumView} from "../views/forum";

const Quests: NextPage = (props) => {
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
    );
};

export default Quests;
