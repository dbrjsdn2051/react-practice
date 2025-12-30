import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Diary from "./pages/Diary.jsx";
import New from "./pages/New.jsx";
import Edit from "./pages/Edit.jsx";
import NotFound from "./pages/NotFound.jsx";
import {createContext, useReducer, useRef} from "react";

const mockData = [
    {
        id: 1,
        createDate: new Date("2025-12-30").getTime(),
        emotionId: 1,
        content: "1번 일기 내용"
    },

    {
        id: 2,
        createDate: new Date("2025-12-29").getTime(),
        emotionId: 2,
        content: "2번 일기 내용"
    },
    {
        id: 3,
        createDate: new Date("2026-01-01").getTime(),
        emotionId: 3,
        content: "3번 일기 내용"
    },
]

function reducer(state, action) {
    switch (action.type) {
        case "CREATE":
            return [action.data, ...state]
        case "UPDATE" :
            return [state.map((item) => String(item.id) === String(action.data.id) ? action.data : item)]
        case "DELETE":
            return [state.filter((item) => String(item.id) !== String(action.data.id))]
        default:
            return state;
    }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
    const [data, dispatch] = useReducer(reducer, mockData)
    const idRef = useRef(3);

    const onCreate = (createDate, emotionId, content) => {
        dispatch({
            type: "CREATE",
            data: {
                id: idRef.current++,
                createDate,
                emotionId,
                content,
            }
        })
    }

    const onUpdate = (id, createDate, emotionId, content) => {
        dispatch({
            type: "UPDATE",
            data: {
                id, createDate, emotionId, content
            }
        })
    }

    const onDelete = (id) => {
        dispatch({
            type: "DELETE",
            data: {
                id: id
            }
        })
    }


    return (
        <>
            <DiaryStateContext.Provider value={data}>
                <DiaryDispatchContext value={{
                    onCreate,
                    onUpdate,
                    onDelete
                }}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/new" element={<New/>}/>
                        <Route path="/diary/:id" element={<Diary/>}/>
                        <Route path={"*"} element={<NotFound/>}/>
                        <Route path={"/edit/:id"} element={<Edit/>}/>
                    </Routes>
                </DiaryDispatchContext>
            </DiaryStateContext.Provider>
        </>
    )
}

export default App
