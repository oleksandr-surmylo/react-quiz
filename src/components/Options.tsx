import React, { Dispatch } from 'react';
import { ActionType, ActionTypes, IData } from "./actionTypes/actionTypes";

type IOptionsProps = {
    questionObj: IData | undefined
    dispatch: Dispatch<ActionTypes>
    answer: number | null
    points: number
}

const Options = ( { questionObj, dispatch, answer, points }: IOptionsProps ) => {

    const hasAnswer = answer !== null

    return (
        <div className='options'>
            { questionObj?.options.map ( ( option, index ) =>
                <button
                    className={ `btn btn-option 
                    ${ index === answer ? 'answer' : '' } 
                    ${ hasAnswer ? index === questionObj.correctOption ? 'correct' : 'wrong' : "" }` }
                    key={ option }
                    onClick={ () => dispatch ( { type: ActionType.NEW_ANSWER, payload: index } ) }
                    disabled={ hasAnswer }
                >{ option }
                </button> ) }
        </div>
    );
};

export default Options;