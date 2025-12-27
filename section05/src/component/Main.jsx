import "/src/Main.css"


const Main = () =>{
    const user = {
        name: "Administrator",
        isLogin: false,
    }

    if(user.isLogin){
        return <div>로그인</div>
    }

    return <div className="logout">로그아웃</div>
}

export default Main