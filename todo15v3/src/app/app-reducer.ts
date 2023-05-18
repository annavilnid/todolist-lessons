export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setRequestStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export const setErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const);


export type SetRequestStatusType = ReturnType<typeof setRequestStatusAC>
export type SetErrorACType = ReturnType<typeof setErrorAC>
export type AppActionsType = SetRequestStatusType | SetErrorACType