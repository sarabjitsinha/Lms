import { Link } from "react-router-dom";
import { Mycontext } from "../utils/Mycontext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Header(){
    const {value,setvalue}=useContext(Mycontext)
    const navigate=useNavigate();

    function handleclick(){
        setvalue('');
        navigate('/')
    }

    return(
        <div>
           <ul className=" flex justify-evenly">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
            {value &&
                <span>Welcome-{value}</span> }

               {value && <button type="submit" className=" bg-teal-600 rounded-4xl hover:cursor-pointer" 
               onClick={handleclick}>Logout</button> }
         </ul>
        </div>
    )
}

export default Header;