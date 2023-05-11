export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsAppType): InitialStateType => {
  switch (action.type) {
    case 'REQUEST-STATUS':
      return {...state, status: action.status}
    case 'REQUEST-ERROR':
      return {...state, error: action.error}
    default:
      return state
  }
}

export const setRequestStatus = (status: RequestStatusType ) => ({type: 'REQUEST-STATUS', status} as const)
export const setRequestError = (error: null | string ) => ({type: 'REQUEST-ERROR', error} as const)


export type SetRequestStatusError = ReturnType<typeof setRequestError>
export type SetRequestStatusType = ReturnType<typeof setRequestStatus>
export type ActionsAppType = SetRequestStatusType | SetRequestStatusError