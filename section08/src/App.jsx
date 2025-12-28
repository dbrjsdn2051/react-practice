import './App.css'
import Header from "./component/Header.jsx";
import Editor from "./component/Editor.jsx";
import List from "./component/List.jsx";
import {useReducer, useRef, useCallback, createContext, useMemo} from "react";

const mockData = [
    {
        id: 0,
        isDone: false,
        content: "React Study",
        date: new Date().getTime(),
    },
    {
        id: 1,
        isDone: false,
        content: "Cleaning",
        date: new Date().getTime(),
    },
    {
        id: 2,
        isDone: false,
        content: "Singing",
        date: new Date().getTime(),
    },
]

const reducer = (state, action) => {

    switch (action.type) {
        case "CREATE":
            return [action.data, ...state]
        case "UPDATE":
            return state.map((todo) => todo.id === action.targetId ? {...todo, isDone: !todo.isDone} : todo)
        case "DELETE":
            return state.filter(item => item.id !== action.targetId)
        default:
            return state;
    }
}

export const TodoStateContext = createContext()
export const TodoDispatchContext = createContext()

function App() {

    const [todos, dispatch] = useReducer(reducer, mockData);
    const idRef = useRef(3);

    const onCreate = useCallback((content) => {
        dispatch({
            type: "CREATE",
            data: {
                id: idRef.current++,
                isDone: false,
                content: content,
                date: new Date().getTime(),
            }
        })
    }, []);

    const onUpdate = useCallback((targetId) => {
        dispatch({
            type: "UPDATE",
            targetId: targetId
        })
    }, []);

    const onDelete = useCallback((targetId) => {
        dispatch({
            type: "DELETE",
            targetId: targetId
        })
    }, []);

    const memoizedDispatch = useMemo(() => {
        return {onCreate, onUpdate, onDelete};
    }, [])

    return (
        <div className="App">
            <Header/>
            <TodoStateContext.Provider value={todos}>
                <TodoDispatchContext.Provider value={memoizedDispatch}>
                    <Editor/>
                    <List/>
                </TodoDispatchContext.Provider>
            </TodoStateContext.Provider>
        </div>
    )
}

export default App
