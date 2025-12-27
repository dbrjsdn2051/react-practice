const Controller = (props) => {

    return <div>
        <button
            onClick={() =>{
            props.onClickButton(1)
        }}>
            +1
        </button>
        <button
            onClick={() =>{
                props.onClickButton(10)
            }}
        >
            +10
        </button>
        <button
            onClick={() =>{
                props.onClickButton(100)
            }}
        >
            +100
        </button>
        <button
            onClick={() =>{
                props.onClickButton(-1)
            }}
        >
            -1
        </button>
        <button
            onClick={() =>{
                props.onClickButton(-10)
            }}
        >
            -10
        </button>
        <button
            onClick={() =>{
                props.onClickButton(-100)
            }}
        >
            -100
        </button>
    </div>
}

export default Controller;