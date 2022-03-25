import API from "./api";

const statusesService = {
    getStatuses(){
        return API.get(`statuses`,{
            withCredentials:true
        });
    }
}

export default statusesService;