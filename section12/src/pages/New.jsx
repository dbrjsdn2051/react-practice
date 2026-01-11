import Header from "../component/Header.jsx";
import Button from "../component/Button.jsx";
import Editor from "../component/Editor.jsx";

const New = () => {
    return <div>
        <Header title={"새 일기 쓰기"} leftChild={<Button text={"< 뒤로가기"} /> }/>
        <Editor />
    </div>
}

export default New;