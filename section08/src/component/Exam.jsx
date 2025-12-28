import {useReducer, useState} from "react";

function reducer(state, action) {
    if(action.type === "INCREMENT") {
        return state + action.data;
    }

    if(action.type === "DECREMENT") {
        return state + action.data;
    }
}

const Exam = () => {
    const [state, dispatch] = useReducer(reducer, 0);

    const onClickPlus = () => {
        dispatch({
            type: "INCREMENT",
            data: 1
        })
    }

    const onClickMinus = () => {
        dispatch({
            type: "DECREMENT",
            data: -1
        })
    }



    return <div>
        <h1>{state}</h1>
        <button onClick={onClickPlus}>+</button>
        <button onClick={onClickMinus}>-</button>
    </div>
}

export default Exam;