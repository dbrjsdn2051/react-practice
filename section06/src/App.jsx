import './App.css'
import Viewer from "./componenet/Viewer.jsx";
import Controller from "./componenet/Controller.jsx";
import {useState, useEffect, useRef} from "react";
import Even from "./componenet/Even.jsx";

function App() {
    const [count, setCount] = useState(0);
    const [input, setInput] = useState("");


    const isMounted = useRef(false);

    // mount
    useEffect(() => {
        console.log('mount');
    }, [])


    // update
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        console.log('update');
    })



    const onClickButton = (value) => {
        setCount(count + value);
    }

    return (
        <div className="App">
            <h1>Simple Counter</h1>
            <section>
                <input
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                }}
                />
            </section>
            <section>
                <Viewer count={count}/>
                {count % 2 === 0 ? <Even/> : null}
            </section>
            <section>
                <Controller onClickButton={onClickButton}/>
            </section>
        </div>
    )
}

export default App
