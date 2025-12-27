import {useState, useRef} from "react";

const Register = () => {
    const [input, setInput] = useState({
        name: "",
        birth: "",
        country: "",
        bio: ""
    });

    const countRef = useRef(0);
    const inputRef = useRef(null);
    console.log(countRef);

    const onChange = (e) => {
        countRef.current = countRef.current + 1;
        console.log(countRef.current);
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        if(input.name === "") {
            inputRef.current.focus();
        }
    }

    return <div>
        <div>

            <input
                ref={inputRef}
                name="name"
                value={input.name}
                onChange={(e) => {
                    onChange(e);
                }}
                placeholder={"name"}/>
        </div>
        <div>
            <input
                name="birth"
                type="date"
                onChange={(e => onChange(e))}
                value={input.birth}
            />
        </div>

        <div>
            <select name="country" value={input.country} onChange={(e) => onChange(e)}>
                <option value=""></option>
                <option value="kr">한국</option>
                <option value="us">미국</option>
                <option value="uk">영국</option>
            </select>
            <h1>{input.country}</h1>
        </div>

        <div>
            <textarea
                name="bio"
                value={input.bio}
                onChange={(e) => onChange(e)}/><br/>
            {input.bio}
        </div>

        <button onClick={onSubmit}>제출</button>
    </div>
}

export default Register;