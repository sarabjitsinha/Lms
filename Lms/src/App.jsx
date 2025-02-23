import "./App.css"
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import { Mycontext } from "./utils/Mycontext";
import { useState } from "react";

function App() {
    const [value,setvalue]=useState('')
    
   return(
        <div>
            <Mycontext.Provider value={{value:value,setvalue:setvalue}}>
                <Header/>
                <Outlet/> 
            </Mycontext.Provider>
                    
        </div>
    )
}

export default App;