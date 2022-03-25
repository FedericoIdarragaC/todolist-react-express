import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = ()=>{
    const {authUser,login} = useAuth();
    const navigate = useNavigate();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const loginUser = ()=>{
        login({
            username:username,
            password:password
        });
    }

    if(authUser.isAuth)
        navigate('/dashboard')

    const validateData = ()=>{
        return username.length > 0 && password.length > 0
    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-full" >
            <form onSubmit={(e) => {
                    e.preventDefault();
                    loginUser()
                }} 
            className=" flex flex-col justify-center w-2/5">
                <h3 className="loginTitle" >Welcome back!</h3>
                <h2 className=" font-bold text-xl">Login to your account</h2>
                <input className="loginUsername border-solid border border-black shadow-md rounded-md p-2 my-4 h-10 text-lg text" 
                        placeholder="Username" type="text"
                        onChange={(e)=>setUsername(e.target.value)}>
                </input>
               
                <input className="loginPassword border-solid border border-black shadow-md rounded-md p-2 my-4 h-10 text-lg" 
                        placeholder="Password" type="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        >
                </input>

                <button className="loginButton my-4 p-2 bg-green-600 shadow-sm hover:shadow-md text-white text-md font-bold rounded-lg " 
                        type="submit"
                        disabled={!validateData()}
                        >Login</button>
            <h2>Dont have an account? </h2> <Link to='/register' className=" text-blue-600">Join us here</Link>
            </form>
        </div>
    )
}

export default Login;