/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRouteError } from "react-router-dom";

function Error(){
    const err:any =useRouteError();
    console.log(err)
    return (
        <div>
            <h1>{err.data}</h1>
            <h2>{err.status}-{err.statusText}</h2>
        </div>
    )
}

export default Error;