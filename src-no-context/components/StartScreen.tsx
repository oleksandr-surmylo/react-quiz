import React, { Dispatch } from 'react';
import { ActionType, IAction } from "./actionTypes/actionTypes";

type INumQuestionsProps = {
    numQuestions: number
    dispatch: Dispatch<IAction>
}

const StartScreen = ( { numQuestions, dispatch }: INumQuestionsProps ) => {
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