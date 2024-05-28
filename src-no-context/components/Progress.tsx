import React from 'react';

type IProgressProps = {
    index: number,
    numQuestions: number
    points: number
    maxPossiblePoints: number
    answer: number | null
}

const Progress = ( { index, numQuestions, points, maxPossiblePoints, answer }: IProgressProps ) => {
    return (
        <header className='progress'>
            <progress max={ numQuestions } value={ index + Number ( answer !== null ) }/>
            <p>Question <strong>{ index + 1 }</strong> / { numQuestions }</p>
            <p><strong>{ points }</strong> / { maxPossiblePoints }</p>
        </header>
    );
};

export default Progress;