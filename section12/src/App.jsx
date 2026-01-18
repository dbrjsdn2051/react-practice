import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Diary from "./pages/Diary.jsx";
import New from "./pages/New.jsx";
import Edit from "./pages/Edit.jsx";
import NotFound from "./pages/NotFound.jsx";
import {createContext, useEffect, useReducer, useRef, useState} from "react";

function reducer(state, action) {
    let nextState;


    switch (action.type) {
        case "CREATE": {
            nextState = [action.data, ...state]
            break
        }
        case "UPDATE" : {
            nextState = state.map((item) => String(item.id) === String(action.data.id) ? action.data : item)
            break
        }
        case "DELETE": {
            nextState = state.filter((item) => String(item.id) !== String(action.data.id))
            break
        }
        case "INIT": {
            return action.data;
        }
        default:
            return state;
    }

    localStorage.setItem("diary", JSON.stringify(nextState));
    return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, dispatch] = useReducer(reducer, [])
    const idRef = useRef(0);

    useEffect(() => {
        const storedData = localStorage.getItem("diary");
        if (!storedData) {
            setIsLoading(false);
            return;
        }

        const parsedData = JSON.parse(storedData);

        if (!Array.isArray(parsedData)) {
            setIsLoading(false);
            return;
        }

        let maxId = 0;
        parsedData.forEach((item) => {
            if (Number(item.id) > maxId) {
                maxId = item.id;
            }
        })

        idRef.current = maxId + 1;

        dispatch({
            type: "INIT",
            data: parsedData
        })
        setIsLoading(false);
    }, [])

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

    if(isLoading) {
        return <div>Loading...</div>;
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
