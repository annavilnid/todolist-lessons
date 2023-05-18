import {setErrorAC, SetErrorACType, setRequestStatusAC, SetRequestStatusType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, error: string) => {
    dispatch(setRequestStatusAC('failed'))
    dispatch(setErrorAC(error))
}

export const handleServerAppError = <T>(dispatch: Dispatch<ErrorUtilsDispatchType>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Error'))
    }
    dispatch(setRequestStatusAC('idle'))
}

type ErrorUtilsDispatchType = SetRequestStatusType | SetErrorACType

//
// type User = {
//     name: string
//     age: number
// }
//
// const user = {
//     name: 'Den',
//     age: 20
// }
//
// const testFunc = (param: string | number | Array<string> | Array<number> | User | Array<User>): string | number | Array<string> | Array<number> | User | Array<User> => {
//     return param
// }
//
// const result = testFunc([1])
// const result2 = testFunc(user)
//
// function identity<T>(arg: T): T {
//     return arg;
// }
//
// const resulrt3 = identity(user)
// const resulrt4 = identity<User[]>([user])
// const resulrt5 = identity<string[]>(['segerwg'])


