import API from "./api";

const authService = {
    loginUser: async (credentials)=>{
      await API.post(`users/login`,credentials,{
        withCredentials: true
      });
    },
    registerUser: async(user)=>{
      await API.post(`users/register`,user,{
        withCredentials: true
      });
    },
    checkAuth: async()=>{
      return API.get(`users/checkauth`,{
        withCredentials: true
      });
    },
    logoutUser: async()=>{
      return API.post(`users/logout`,{},{
        withCredentials: true
      });
    }
}

export default authService;
