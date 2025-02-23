import axios from "axios";
import React, { useState } from "react";

function Registration(){

    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassord]=useState("")
        
        function handlesubmit(e){
            e.preventDefault();
            axios.post('http://localhost:2700/register',{name,email,password})
            .then(resp=>console.log(resp))
            .catch(err=>console.log(err))
            
        }

    return(
        <div>
            <div className=" flex w-52 flex-col justify-self-center">
            <p>Register</p>
            <form action="" onSubmit={(e)=>handlesubmit(e)}>
                <label htmlFor="">Name</label>
                <input type="text" name="" id="name" onChange={(e)=>setname(e.target.value)} />
                <label htmlFor="">Email</label>
                <input type="email" name="" id="email" onChange={(e)=>setemail(e.target.value)}/>
                <label htmlFor="">Password</label>
                <input type="password" name="" id="passwordreg" onChange={(e)=>setpassord(e.target.value)}/>
            
            <button type="submit" className="bg-amber-600 hover:scale-110">Submit</button>
            </form>
            </div>
        </div>
    )
}
export default Registration;