import { useNavigate } from "react-router-dom"
import axios from "axios"

const Logout = () => {

    const navigate = useNavigate()

    const handleLogout = async () => {

        await axios.get("https://auth-server-production-90c7.up.railway.app/logout",
            {withCredentials: true}

        )

        navigate("/login")
    }
    
    return (
        <button className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300" onClick={handleLogout}>Logout</button>
    )

}

export default Logout