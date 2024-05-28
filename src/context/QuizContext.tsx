import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from "react";
import { ActionType, ActionTypes, IData } from "../components/actionTypes/actionTypes";

const SECS_PER_QUESTION = 10

export type IStatus = 'loading' | 'ready' | 'error' | 'active' | 'finished' | 'restart'

export type InitialStateType = {
    questions: IData[]
    status: IStatus
    index: number
    answer: number | null
    points: number,
    highscore: number,
    numQuestions: number,
    maxPossiblePoints: number,
    secondsRemaining: number | null
}

export const initialState: InitialStateType = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    numQuestions: 0,
    maxPossiblePoints: 0,
    secondsRemaining: null
}


type Children = {
    children: ReactNode
}

export const QuizContext = createContext<{
    questions: IData[];
    status: IStatus;
    index: number;
    answer: number | null;
    points: number;
    highscore: number;
    secondsRemaining: number | null;
    numQuestions: number;
    maxPossiblePoints: number;
    dispatch: Dispatch<ActionTypes>
}> ( {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    numQuestions: 0,
    maxPossiblePoints: 0,
    secondsRemaining: null,
    dispatch: () => null
} )

function reducer ( state: InitialStateType, action: ActionTypes ): InitialStateType {
    switch ( action.type ) {
        case ActionType.GET_DATA: {
            return {
                ...state,
                questions: action.payload,
                status: 'ready'
            }
        }
        case ActionType.DATA_FAILED: {
            return {
                ...state,
                status: 'error'
            }
        }
        case ActionType.START: {
            return {
                ...state,
                status: 'active',
                secondsRemaining: state.questions.length * SECS_PER_QUESTION
            }
        }
        case ActionType.NEW_ANSWER: {
            const question = state.questions[ state.index ]
            return {
                ...state,
                answer: action.payload,
                points: action.payload === question?.correctOption ? state.points + question.points : state.points
            }
        }
        case ActionType.NEXT_QUESTION: {
            return {
                ...state,
                index: state.index + 1,
                answer: null
            }
        }
        case ActionType.FINISH: {
            return {
                ...state,
                status: 'finished'
            }
        }
        case ActionType.RESTART: {
            return {
                ...initialState,
                questions: state.questions,
                status: 'ready'
            }
        }
        case ActionType.TICK: {
            return ( state.secondsRemaining !== null ) ? {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? 'finished' : state.status
            } : state
        }
        default: {
            return state
        }
    }
}

function QuizProvider ( { children }: Children ) {
    const [ {
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining
    }, dispatch ] = useReducer ( reducer, initialState )

    const numQuestions: number = questions.length;
    const maxPossiblePoints: number = questions.reduce (
        ( prev, cur ) => prev + cur.points,
        0
    );

    useEffect ( () => {
        ( async () => {
            try {
                console.log ( 'useEffect' )
                const res = await fetch ( 'https://665389601c6af63f4674f61a.mockapi.io/questions' )
                const data = await res.json ()
                dispatch ( { type: ActionType.GET_DATA, payload: data } )
            } catch ( err ) {
                dispatch ( { type: ActionType.DATA_FAILED } )
            }

        } ) ()
    }, [] )


    return (
        <QuizContext.Provider
            value={ {
                questions,
                status,
                index,
                answer,
                points,
                highscore,
                secondsRemaining,
                numQuestions,
                maxPossiblePoints,
                dispatch,
            } }
        >
            { children }
        </QuizContext.Provider>
    );
}

function useQuiz () {
    const context = useContext ( QuizContext );
    if ( context === null )
        throw new Error ( "QuizContext was used outside of the QuizProvider" );
    return context;
}

export { QuizProvider, useQuiz };