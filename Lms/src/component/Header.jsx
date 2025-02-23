import { Link } from "react-router-dom";
import userContext from "../utils/userContext";
import { useContext } from "react";


function Header(){
    const {Username}=useContext(userContext)
    

    return(
        <div>
           <ul className=" flex justify-evenly">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
            
                <span>{Username}</span>
         </ul>
        </div>
    )
}

export default Header;