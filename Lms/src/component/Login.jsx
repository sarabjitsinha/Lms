import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mycontext } from "../utils/Mycontext";
import { useContext } from "react";

function Login(){
    
    const {setvalue}=useContext(Mycontext)
    const [name, setuname]=useState("")
    const [password,setpswd]=useState('')
    const navigate=useNavigate();

    function handlesubmit(e){
         e.preventDefault();
         axios.post('http://localhost:2700/login',{name,password})
        .then(resp=>{
            if(resp.data=="success"){
                setvalue(name);
               navigate('/userhome')
            }
        })
        .catch(err=>console.log(err))
    }

    return (
        <div>
            <div className=" flex w-52 flex-col justify-self-center">
            <p className=" text-center">Login</p>
            <form action="" onSubmit={(e)=>handlesubmit(e)}>
                {/* <div className=" w-60"> */}
                <label htmlFor="username">Username</label>
                <input type="text" name="" id="username"  onChange={(e)=>{setuname(e.target.value);}}/>
                {/* </div> */}
                {/* <div className=" w-60"> */}
                <label htmlFor="password">Password</label>
                <input type="password" name="" id="password" onChange={(e)=>setpswd(e.target.value)}/>
                {/* </div> */}
            
            <button type="submit" className=" bg-fuchsia-600 w-48">Submit</button>
            </form>
            </div>
        </div>
    )
}

export default Login;