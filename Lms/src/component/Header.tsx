
import { Link } from "react-router-dom";

function Header(){
    return(
        <div>
           <ul className=" flex justify-evenly">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
         </ul>
        </div>
    )
}

export default Header;