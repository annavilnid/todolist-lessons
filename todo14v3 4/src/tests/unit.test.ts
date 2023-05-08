import {removeTodolistAC, setTodolistsAC, todolistsReducer} from "../state/todolists-reducer";

let startState = [
    {id: '1', title: 'What to learn', addedDate: '', order: 0},
    {id: '2', title: 'What to buy', addedDate: '', order: 0}
]
//
test('test', () => {
    const a = 1
    const b = 2
    const c = 3

    expect(a).toBe(1);
    expect(b).toBe(2);
    //wrong toBe
    expect(c).toBe(2);
})

test('todolists will be get', () => {
    const action = setTodolistsAC(startState)
    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe('all');
})