import { FC } from "react";

const Card = (props) => {
  return (
    <>
      <div className="flex w-3/4 h-full justify-evenly bg-white backdrop-blur-lg rounded drop-shadow-lg text-black m-5 rounded">
        <div className="flex flex-col justify-center items-center">
          <div className="text-xl font-bold">Quest</div>
          <div className="text-lg text-black">{props.question}</div>
          <div className="text-md flex flex-col mx-10">
            {props.answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="answerBtn"
                  onClick={() => {
                    console.log(answer);
                  }}
                >
                  {" "}
                  {answer}
                </button>
              );
            })}
          </div>
          <div className="text-md text-black">
            <button className="answerBtn">Next</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Card;
