const Button = ({children, text, color = "black"}) => {
    const onClickButton = () => {
        console.log(text)
    }

    return (
        <button onClick={() => onClickButton()} onMouseEnter={onClickButton} style={{color: color}}>
            {text} - {color.toUpperCase()} {children}
        </button>
    );
}

export default Button