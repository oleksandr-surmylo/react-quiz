import React, { Dispatch } from 'react';
import { ActionType, IAction } from "./actionTypes/actionTypes";

type IFinishScreenProps = {
    points: number
    maxPossiblePoints: number
    dispatch: Dispatch<IAction>
}

const FinishScreen = ( { points, maxPossiblePoints, dispatch }: IFinishScreenProps ) => {
    const percentage = ( points / maxPossiblePoints ) * 100

    let emoji;
    if ( percentage >= 90 && percentage < 100 ) emoji = '🎉';
    if ( percentage >= 80 && percentage < 90 ) emoji = '👏';
    if ( percentage >= 70 && percentage < 80 ) emoji = '😊';
    if ( percentage >= 60 && percentage < 70 ) emoji = '🙂';
    if ( percentage >= 50 && percentage < 60 ) emoji = '😐';
    if ( percentage >= 30 && percentage < 50 ) emoji = '😕';
    if ( percentage < 30 ) emoji = '😢';

    return (
        <>
            <p className='result'>
                <span>{ emoji }</span> You scored <strong>{ points }</strong> out
                of { maxPossiblePoints } ({ Math.ceil ( percentage ) }%)
            </p>
            <button
                className='btn btn-ui'
                onClick={ () => dispatch ( { type: ActionType.RESTART } ) }
            >
                Restart Quiz</button>
        </>
    );
};

export default FinishScreen;