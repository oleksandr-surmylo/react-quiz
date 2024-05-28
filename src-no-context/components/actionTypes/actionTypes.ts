export enum ActionType {
    GET_DATA = 'GET_DATA',
    DATA_FAILED = 'DATA_FAILED',
    NEW_ANSWER = 'NEW_ANSWER',
    START = 'START',
    NEXT_QUESTION = 'NEXT_QUESTION',
    FINISH = 'FINISH',
    RESTART = 'RESTART',
    TICK = 'TICK'
}

export type IData = {
    question: string,
    options: string[],
    correctOption: number,
    points: number,
    id: string
}

type IGetData = {
    type: ActionType.GET_DATA
    payload: IData[]
}

type IDataFailed = {
    type: ActionType.DATA_FAILED
}

type INewAnswer = {
    type: ActionType.NEW_ANSWER
    payload: number
}

type IStart = {
    type: ActionType.START
}

type INextQuestion = {
    type: ActionType.NEXT_QUESTION
}

type IFinish = {
    type: ActionType.FINISH
}

type IRestart = {
    type: ActionType.RESTART
}

type ITimer = {
    type: ActionType.TICK
}

export type IAction = IGetData | IDataFailed | IStart | INewAnswer | INextQuestion | IFinish | IRestart | ITimer