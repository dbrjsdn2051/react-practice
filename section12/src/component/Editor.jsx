import './Editor.css'
import EmotionItem from "./EmotionItem.jsx";
import Button from "./Button.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const emotionList = [
    {
        emotionId: 1,
        emotionName: "완전 좋음"
    },
    {
        emotionId: 2,
        emotionName: "좋음"
    },
    {
        emotionId: 3,
        emotionName: "보톤"
    },
    {
        emotionId: 4,
        emotionName: "안좋음"
    },
    {
        emotionId: 5,
        emotionName: "완전 안좋음"
    }
]

const getStringedDate = (targetDate) => {
    let year = targetDate.getFullYear()
    let month = targetDate.getMonth() + 1
    let day = targetDate.getDate()

    if (month < 10) {
        month = "0" + month
    }
    if (day < 10) {
        day = "0" + day
    }

    return year + "-" + month + "-" + day
}

const Editor = ({onSubmit}) => {
    const nav = useNavigate();

    const [input, setInput] = useState({
        createDate: new Date(),
        emotionId: 3,
        content: "",
    });

    const onChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name === "createDate") {
            value = new Date(value);
        }

        setInput({
            ...input,
            [name]: value
        })
    }

    const onClickSubmitButton = (e) => {
        onSubmit(input)
    }

    return <div className="Editor">
        <section className={"date_section"}>
            <h4>오늘의 날짜</h4>
            <input name={"createDate"} onChange={onChangeInput} value={getStringedDate(input.createDate)}
                   type={"date"}/>
        </section>
        <section className={"emotion_section"}>
            <h4>오늘의 감정</h4>
            <div className={"emotion_list_wrapper"}>
                {emotionList.map((item) => (
                    <EmotionItem
                        onClick={() => onChangeInput({
                            target: {
                                name: "emotionId",
                                value: item.emotionId
                            },
                        })}
                        key={item.emotionId} {...item}
                        isSelected={item.emotionId === input.emotionId}/>
                ))}
            </div>
        </section>
        <section className={"content_section"}>
            <h4>오늘의 일기</h4>
            <textarea name="content" value={input.content} onChange={onChangeInput} placeholder={"오늘은 어땠나요?"}/>
        </section>
        <section className={"button_section"}>
            <Button text={"취소하기"} onClick={() => nav(-1)}/>
            <Button onClick={onClickSubmitButton} text={"작성완료"} type={"POSITIVE"}/>
        </section>
    </div>
}

export default Editor