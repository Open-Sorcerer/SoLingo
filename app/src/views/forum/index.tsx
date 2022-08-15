import {useEffect, useRef, useState} from "react";
import {Question} from "../../components/Question";
import postQuestion from "../../transactions/question/postQuestion";
import getProvider from "../../transactions/api/getProvider";
import {useWallet} from "@solana/wallet-adapter-react";
import {QuestionModel} from "../../models";
import {notify} from "../../utils/notifications";
import getQuestions from "../../transactions/question/getQuestions";
import getProgram from "../../transactions/api/getProgram";
import {getProgramInfoPDA} from "../../transactions";


export const ForumView = ({}) => {

    const [questions, setQuestions] = useState<QuestionModel[]>([]);
    const programInfo = useRef<any>();
    const currentGrantIndex = useRef(0);
    const totalQuestionsFetched = useRef(0);
    const [loadingView, setLoadingView] = useState<-1 | 0 | 1>(1); // 1 -> show loading spinner, 0 -> show load more button, -1 -> show none

    const wallet = useWallet()
    const provider = getProvider(wallet);

    const fetchQuestions = async () => {
        try {
            setLoadingView(1);

            if (!programInfo.current) {
                const program = getProgram(provider);
                const programInfoPDA = await getProgramInfoPDA(program);
                const programInfoFetched = await program.account.questionProgramInfo.fetch(programInfoPDA);

                if (!programInfoFetched) {
                    setLoadingView(0);
                    return notify({
                        type: 'error',
                        message: 'error',
                        description: 'Something went wrong! please try again later'
                    });
                }
                programInfo.current = programInfoFetched;
            }

            const numQuestionsToFetchAtATime = 8;
            let questionsData = [];

            while (programInfo.current.questionsCount > totalQuestionsFetched.current && questionsData.length < numQuestionsToFetchAtATime) {
                const startIndex = currentGrantIndex.current;
                let endIndex: number = startIndex + numQuestionsToFetchAtATime - questionsData.length - 1;
                if (endIndex > programInfo.current.questionsCount - 1) {
                    endIndex = programInfo.current.questionsCount - 1;
                }

                console.log(programInfo.current.questionsCount, totalQuestionsFetched.current);

                const questions = await getQuestions(provider, startIndex, endIndex);
                if (questions.err) {
                    setLoadingView(0);
                    return notify({
                        type: 'error',
                        message: 'error',
                        description: 'Something went wrong! please try again later'
                    });
                }

                questionsData = questions.data;
                totalQuestionsFetched.current += questions.data.length;

                currentGrantIndex.current += questionsData.length;
                console.log(questions);
                setQuestions(questions.data);
            }

            if (programInfo.current.questionsCount === totalQuestionsFetched.current) {
                setLoadingView(-1);
            } else {
                setLoadingView(0);
            }
        } catch (error) {
            console.log(error);
            setLoadingView(0);
            return notify({
                type: 'error',
                message: 'error',
                description: 'Something went wrong! please try again later'
            });
        }
    }

    useEffect(() => {
        fetchQuestions().then()
    }, [])

    const sampleQuestion = {
        title: 'What is the best way to get started with Solana?',
        description: 'I am new to Solana and I would like to get started with it. What is the best way to get started with Solana?',
        tags: "solana,anchor,newbie",
    }

    return (
        <div
            className={`mx-40 my-40 w-auto p-5 bg-white rounded-lg shadow text-black grid space-y-8`}>
            {
                questions.length > 0 &&
                    (questions.map((item, index) =>
                        <div key={index}>
                            <Question
                                // @ts-ignore
                                provider={provider}
                                questionData={item}
                            />
                        </div>
                    ))
            }
            <button onClick={async () => {
                await postQuestion(provider, sampleQuestion)
            }}>post new question
            </button>
        </div>
    );
};
