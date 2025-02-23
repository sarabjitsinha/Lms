import "./App.css"
import Header from "./component/Header"
// import Login from "./component/Login";
// import Registration from "./component/Registration";
import { Outlet } from "react-router-dom";
import userContext from "./utils/userContext";
import { useState } from "react";

function App() {

    const [usrname,setUserName]=useState("");

    return(
        <div>
            <userContext.Provider value={{Username:usrname, setUserName}}>
            <Header/>
            </userContext.Provider>
            <Outlet/>
            {/* <Login/>
            <Registration/> */}
        
        </div>
    )
}

export default App;