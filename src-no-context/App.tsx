import React from 'react';
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from './components/Timer'
import { useQuiz } from "../src/context/QuizContext";


function App () {

    const {
        status,
        index,
        answer,
        points,
        questions,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch
    } = useQuiz ();


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
