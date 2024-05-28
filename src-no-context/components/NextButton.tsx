import React, { Dispatch } from 'react';
import { ActionType, IAction } from "./actionTypes/actionTypes";
import { IStatus } from "../App";

type INextButtonProps = {
    dispatch: Dispatch<IAction>
    answer: number | null
    index: number
    numQuestions: number
    status: IStatus
}

const NextButton = ( { dispatch, answer, index, numQuestions, status }: INextButtonProps ) => {
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