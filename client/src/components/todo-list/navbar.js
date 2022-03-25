import useAuth from '../../hooks/useAuth'
import { useNavigate } from "react-router-dom";

const Navbar = ()=> {
    const {authUser,logout} = useAuth()
    const navigate = useNavigate();

    const logoutUser = ()=>{
        navigate('/login');
        logout();
    }

    return (
        <div className="flex items-center justify-around shadow-md bg-slate-700 h-16 w-full ">
            <div>
                <h3 className='sayhi text-white font-semibold text-xl'>
                    Hi, {authUser.username}
                </h3>
            </div>
            <div>
                <button onClick={logoutUser}>
                    <h4 className='logout text-lg text-gray-100'>
                        Logout
                    </h4>
                </button>
            </div>
        </div>
    )
}

export default Navbar