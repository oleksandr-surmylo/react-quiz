import React, { useEffect } from 'react';
import { ActionType } from "./actionTypes/actionTypes";
import { useQuiz } from "../context/QuizContext";

const Timer = () => {

    const { secondsRemaining, dispatch } = useQuiz ()

    let min = 0;
    let seconds = 0;

    if ( secondsRemaining !== null ) {
        min = Math.floor ( secondsRemaining / 60 );
        seconds = secondsRemaining % 60;
    }

    useEffect ( () => {
        const interval = setInterval ( () => {
            dispatch ( { type: ActionType.TICK } )
        }, 1000 )
        return () => clearInterval ( interval )
    }, [ dispatch ] )
    return (
        <div className='timer'
             style={ { color: ( min < 1 || seconds < 1 ) ? seconds % 2 === 0 ? 'tomato' : 'black' : "black" } }>
            { min < 10 && '0' }{ min }:
            { seconds < 10 && '0' }{ seconds }
        </div>
    );
};

export default Timer;