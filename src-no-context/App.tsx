import React, { useEffect, useReducer } from 'react';
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import { ActionType, IAction, IData } from "./components/actionTypes/actionTypes";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from './components/Timer'

const SECS_PER_QUESTION = 10

const test = 5

export type IStatus = 'loading' | 'ready' | 'error' | 'active' | 'finished' | 'restart'

type IInitialState = {
    questions: IData[]
    status: IStatus
    index: number
    answer: number | null
    points: number
    secondsRemaining: number | null
}

const initialState: IInitialState = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    secondsRemaining: null
}

function reducer ( state: IInitialState, action: IAction ): IInitialState {
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

function App () {
    const [ {
        questions,
        status,
        index,
        answer,
        points,
        secondsRemaining
    }, dispatch ] = useReducer ( reducer, initialState )

    const numQuestions = questions.length
    const maxPossiblePoints = questions.reduce ( ( prev, cur ) => prev + cur.points, 0 )

    useEffect ( () => {
        ( async () => {
            try {
                const res = await fetch ( 'http://localhost:8000/questions' )
                const data = await res.json ()
                dispatch ( { type: ActionType.GET_DATA, payload: data } )
            } catch ( err ) {
                dispatch ( { type: ActionType.DATA_FAILED } )
            }
        } ) ()
    }, [] )

    return (
        <div className="app">
            <Header/>
            <Main>
                { status === 'loading' && <Loader/> }
                { status === 'error' && <Error/> }
                { status === 'ready' &&
                    <StartScreen
                        numQuestions={ numQuestions }
                        dispatch={ dispatch }/>
                }
                { status === 'active' &&
                    <>
                        <Progress
                            index={ index }
                            numQuestions={ numQuestions }
                            points={ points }
                            maxPossiblePoints={ maxPossiblePoints }
                            answer={ answer }/>
                        <Question
                            questionObj={ questions[ index ] }
                            dispatch={ dispatch }
                            answer={ answer }
                            points={ points }/>
                        <Footer>
                            <Timer dispatch={ dispatch } secondsRemaining={ secondsRemaining }/>
                            <NextButton dispatch={ dispatch }
                                        answer={ answer }
                                        index={ index }
                                        numQuestions={ numQuestions }
                                        status={ status }/>
                        </Footer>
                    </>
                }
                { status === 'finished' &&
                    <FinishScreen
                        points={ points }
                        maxPossiblePoints={ maxPossiblePoints }
                        dispatch={ dispatch }/>
                }
            </Main>
        </div>
    );
}

export default App;
