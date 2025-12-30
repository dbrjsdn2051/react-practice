import Header from "../component/Header.jsx";
import Button from "../component/Button.jsx";
import DiaryList from "../component/DiaryList.jsx";
import {useContext, useState} from "react";
import {DiaryStateContext} from "../App.jsx";

const getMonthlyData = (pivotDate, data) => {
    const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime()
    const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime()
    return data.filter((item) => beginTime <= item.createDate && item.createDate <= endTime)
}

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date())

    const monthlyData = getMonthlyData(pivotDate, data);

    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1))
    }
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1))
    }
    return <div>
        <Header title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
            leftChild={<Button text={"<"} onClick={onDecreaseMonth}/>}
            rightChild={<Button text={">"} onClick={onIncreaseMonth}/>}
        />
        <DiaryList data={monthlyData}/>
    </div>

}

export default Home;
