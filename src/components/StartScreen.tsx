import React  from 'react';
import { ActionType } from "./actionTypes/actionTypes";
import { useQuiz } from "../context/QuizContext";

const StartScreen = () => {
    const { numQuestions, dispatch } = useQuiz ()

    return (
        <div className='start'>
            <h2>Welcome to the React Quiz</h2>
            <h3>{ numQuestions } questions to test your React mastery</h3>
            <button
                className='btn btn-ui'
                onClick={ () => dispatch ( { type: ActionType.START } ) }
            >Let's start
            </button>
        </div>
    );
};

export default StartScreen;