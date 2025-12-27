import './App.css'
import Header from "./component/Header.jsx";
import Editor from "./component/Editor.jsx";
import List from "./component/List.jsx";
import {useRef, useState} from "react";

function App() {
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
    const [todos, setTodos] = useState(mockData);
    const idRef = useRef(3);
    const onCreate = (content) => {
        const newTodos = {
            id: idRef.current++,
            isDone: false,
            content: content,
            date: new Date().getTime(),
        };

        setTodos([newTodos, ...todos]);
    }

    const onUpdate = (targetId) => {
        setTodos(todos.map((todo) => todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo))
    }

    const onDelete = (targetId) => {
        setTodos(todos.filter((todo) => todo.id !== targetId))
    }

    return (
        <div className="App">
            <Header/>
            <Editor onCreate={onCreate}/>
            <List todos={todos} onUpdate={onUpdate} onDelete={onDelete}/>
        </div>
    )
}

export default App
