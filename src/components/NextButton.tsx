import React from 'react';
import { ActionType } from "./actionTypes/actionTypes";
import { useQuiz } from "../context/QuizContext";

const NextButton = () => {
    const { answer, index, numQuestions, status, dispatch } = useQuiz ()

    if ( answer === null ) return null

    if ( index < numQuestions - 1 ) {
        return (
            <button
                className='btn btn-ui'
                onClick={ () => dispatch ( { type: ActionType.NEXT_QUESTION } ) }
            >
                Next</button>
        );
    }

    if ( index === numQuestions - 1 ) {
        return (
            <button
                className='btn btn-ui'
                onClick={ () => dispatch ( { type: ActionType.FINISH } ) }
            >
                Finish</button>
        );
    }

    if ( status === 'finished' ) {
        return (
            <button
                className='btn btn-ui'
                onClick={ () => dispatch ( { type: ActionType.RESTART } ) }
            >
                Restart Quiz</button>
        );
    }
    return null
};

export default NextButton;