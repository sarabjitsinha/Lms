
function Login(){

    return (
        <div>
            <div className=" flex w-52 flex-col justify-self-center">
            <p className=" text-center">Login</p>
            <form action="">
                <div className=" w-60">
                <label htmlFor="username">Username</label>
                <input type="text" name="" id="username" />
                </div>
                <div className=" w-60">
                <label htmlFor="password">Password</label>
                <input type="password" name="" id="password" />
                </div>
            </form>
            <button type="submit" className=" bg-fuchsia-600 w-48">Submit</button>
            </div>
        </div>
    )
}

export default Login;