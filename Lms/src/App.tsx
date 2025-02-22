import "./App.css"
import Header from "./component/Header"
import Login from "./component/Login";
import Registration from "./component/Registration";
import { Outlet } from "react-router-dom";

function App() {
    return(
        <div>
            <Header/>
            <Outlet/>
            {/* <Login/>
            <Registration/> */}
        </div>
    )
}

export default App;