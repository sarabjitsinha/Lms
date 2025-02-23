import {useState } from "react";
import { Mycontext } from "./Mycontext";



// eslint-disable-next-line react/prop-types
export const Myprovider=({Children})=>{

    const [value,setvalue]=useState('sarabjit');
    return(
        <Mycontext.Provider value={{value,setvalue}} >
            {Children}
        </Mycontext.Provider>
    );
};

