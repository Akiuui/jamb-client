import { useState } from "react"
import WebRTCSessionGuest from "../models/WebRTCSessionGuest.ts"
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from "axios"
// import fetchPlayersId from "../routes/fetchPlayersId.js";
import { SessionProps } from "../myTypes.ts";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";

function JoinSessionButton({setShowButton, socketUrl, setConnection}: SessionProps){
    
    const {id: userId} = useSelector((state : RootState) => state.user)
    const [connectionState, setConnectionState] = useState<RTCPeerConnectionState>(); // Track the connection state
    const showButton = "joinSession" 
    const navigate = useNavigate()

    const handleJoinSession = async () => {
        let res : AxiosResponse<{message: string}> | undefined
        let tagetUsername=prompt("Enter the users username you want to connect to!")

        if(!tagetUsername)
            return

        try {
            //Convert into a function
            res = await axios.get(`https://auth-server-production-90c7.up.railway.app/userExist?username=${tagetUsername}`)
            console.log(res)

        } catch (error : unknown) {
            if(axios.isAxiosError(error)){
                if(error.response?.status === 400){
                    alert("Username you entered doesn't exist, try again");
                }else{
                    console.error("API Error:", error.response?.status, error.message);
                }
            }else{
                console.log("Unexprected error: ", error)
            }
        }
        
        if(!res) return
        let targetUserId = res.data.message
        
        setShowButton(showButton)

        if(!userId){
            alert("UserId is undefined")
            return
        }
        
        let guest = new WebRTCSessionGuest(userId, targetUserId, socketUrl)

        guest.peer.addEventListener('connectionstatechange', () => {
            // console.log(guest.peer.connectionState)
            setConnectionState(guest.peer.connectionState); // Update connection state

            if(guest.peer.connectionState == "connected"){
                guest.socket.close()
                setConnection(guest)
                navigate("/game")
            
            }
        });

    }
    

    return (
        <>
        {!connectionState ? 
            (<button className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300" onClick={handleJoinSession}>Join Session</button>)
            :
            (<p>Session joined🟢</p>)
        }
        {connectionState && <p>Connection State: {connectionState}</p>}


        </>
    )

}

export default JoinSessionButton