import {useNavigate, useParams} from "react-router-dom";
import Header from "../component/Header.jsx";
import Button from "../component/Button.jsx";
import Viewer from "../component/Viewer.jsx";
import useDiary from "../hooks/useDiary.jsx";
import {getStringedDate} from "../util/get-Stringed-date.js";

const Diary = () => {
    const params = useParams();
    const nav = useNavigate();
    const curDiaryItem = useDiary(params.id);

    if (!curDiaryItem) {
        return <div>데이터 로딩중 ... !</div>
    }

    const {createDate, emotionId, content} = curDiaryItem;
    const title = getStringedDate(new Date(createDate));

    return <div>
        <Header title={`${title} 기록`}
                leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"}/>}
                rightChild={<Button onClick={() => nav(`/edit/${params.id}`)} text={"수정하기"}/>}
        />
        <Viewer emotionId={emotionId} content={content}/>
    </div>
}

export default Diary;