import {useNavigate, useParams} from "react-router-dom";
import Header from "../component/Header.jsx";
import Button from "../component/Button.jsx";
import Editor from "../component/Editor.jsx";
import {DiaryDispatchContext, DiaryStateContext} from "../App.jsx";
import {useContext, useEffect, useState} from "react";

const Edit = () => {
    const params = useParams()
    const nav = useNavigate()
    const {onDelete, onUpdate} = useContext(DiaryDispatchContext);
    const data = useContext(DiaryStateContext);
    const [curDiaryTime, setCurDiaryTime] = useState();

    useEffect(() => {
        const currentDiaryItem = data.find((item) => String(item.id) === String(params.id));

        if (!currentDiaryItem) {
            window.alert("존재하지 않는 일기입니다.")
            nav('/', {replace: true})
        }

        setCurDiaryTime(currentDiaryItem);
    }, [params.id])

    const onClickDelete = () => {
        if (window.confirm("일기를 정말 삭제할까요?")) {
            onDelete(params.id);
            nav('/', {replace: true})
        }
    }

    const onSubmit = (input) => {
        if (window.confirm("일기를 정말 수정할까요?")) {
            onUpdate(params.id, input.createDate.getTime(), input.emotionId, input.content);
        }
        nav("/", {replace: true})
    }

    return <div>
        <Header title={"일기 수정하기"}
                leftChild={<Button text={"< 뒤로가기"} onClick={() => nav(-1)}/>}
                rightChild={<Button text={"삭제하기"} type={"NEGATIVE"} onClick={onClickDelete}/>}
        />
        <Editor initData={curDiaryTime} onSubmit={onSubmit}/>
    </div>
}

export default Edit