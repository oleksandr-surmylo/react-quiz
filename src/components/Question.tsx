import React from 'react';
import Options from "./Options";
import { useQuiz } from "../context/QuizContext";

const Question = ( ) => {
    const { questions, index, answer, points, dispatch } = useQuiz()
    const questionObj = questions.at(index)
    console.log (questionObj)

    return (
        <div>
            <h4>{ questionObj?.question }</h4>
            <Options
                questionObj={ questionObj }
                dispatch={ dispatch }
                answer={ answer }
                points={ points }
            />
        </div>
    );
};

export default Question;