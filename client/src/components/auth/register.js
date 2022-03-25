import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Register = ()=>{
    const navigate = useNavigate();

    const {authUser,register} = useAuth();
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');

    const [password,setPassword] = useState('');
    const [passwordConfirm,setPasswordConfirm] = useState('');


    const regiserUser = ()=>{
        register({
            username,
            email,
            password
        })
    }   

    if(authUser.isAuth)
        navigate('/dashboard')

    const validateData = ()=>{
        return (
        username.length > 0 &&
        email.length > 0 &&
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && 
        password.length > 0 &&
        password === passwordConfirm
        )
    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <form onSubmit={(e) => {
                    e.preventDefault();
                    regiserUser()
                }} 
            className=" flex flex-col justify-center w-2/5">
                <h3 className="registerTitle">Welcome!</h3>
                <h2 className=" font-bold text-xl">Let's create your account</h2>
                <input className="registerUsername  border-solid border border-black shadow-md rounded-md p-2  my-4 h-10 text-lg text" 
                        placeholder="Username" type="text"
                        onChange={(e)=>setUsername(e.target.value)}>
                </input>

                <input className=" registerEmail border-solid border border-black shadow-md rounded-md p-2  my-4 h-10 text-lg text" 
                        placeholder="Email" type="email"
                        onChange={(e)=>setEmail(e.target.value)}>
                </input>
               
                <input className="registerPassword border-solid border border-black shadow-md rounded-md p-2  my-4 h-10 text-lg" 
                        placeholder="Password" type="password"
                        onChange={(e)=>setPassword(e.target.value)}>
                </input>

                <input className="registerConfirmPassword border-solid border border-black shadow-md rounded-md p-2  my-4 h-10 text-lg" 
                        placeholder="Confirm Password" type="Password"
                        onChange={(e)=>setPasswordConfirm(e.target.value)}>
                </input>

                <button className="registerButton my-4 p-2 bg-green-600  shadow-sm hover:shadow-md text-white text-md font-bold rounded-lg " 
                        type="submit"
                        disabled={!validateData()}>Register</button>
                <h2>Already have an account? </h2> <Link to='/login' className=" text-blue-600">Log in here</Link>
            </form>

        </div>
    )
}

export default Register;