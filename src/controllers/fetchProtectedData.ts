import axios from "axios"
import { User } from "../myTypes"

async function fetchProtectedData() : Promise<User> {
    try {
        
        const res = await axios.get(
            "https://auth-server-production-90c7.up.railway.app/protected",
            {withCredentials: true})

        if(res?.data?.user){
            return {username: res.data.user.username, id: res.data.user.userId} as User
        }else{
            throw new Error("Server error")
        }

    } catch (error) {
        if(axios.isAxiosError(error)){
            if(error.response && error.response.status >= 400 && error.response.status <=500){
                throw new Error("Session expired or invalid token. Please log in again.")
            }else{
                throw new Error(`An unexpected error occurred: ${error}`)
            }
        }else{
            throw new Error(`An non axios error occurred: ${error}`)
        }
    }
}

export default fetchProtectedData