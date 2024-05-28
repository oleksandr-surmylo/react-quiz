import React, { Dispatch, useEffect } from 'react';
import { ActionType, IAction } from "./actionTypes/actionTypes";

type ITimeProps = {
    dispatch: Dispatch<IAction>
    secondsRemaining: number | null
}

const Timer = ( { dispatch, secondsRemaining }: ITimeProps ) => {

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