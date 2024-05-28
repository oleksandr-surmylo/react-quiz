import React, { Dispatch } from 'react';
import { IAction, IData } from "./actionTypes/actionTypes";
import Options from "./Options";

type IQuestionsProps = {
    questionObj: IData
    dispatch: Dispatch<IAction>
    answer: number | null
    points: number
}

const Question = ( { questionObj, dispatch, answer, points }: IQuestionsProps ) => {
    return (
        <div>
            <h4>{ questionObj.question }</h4>
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