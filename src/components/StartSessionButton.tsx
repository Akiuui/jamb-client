import { useState } from "react"
import WebRTCSessionHost from "../models/WebRTCSessionHost.ts"
import { useNavigate } from 'react-router-dom';
import { SessionProps } from "../myTypes.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
// import { setConnection } from "../redux/connectionSlice.ts";

function StartSessionButton({/*userId,*/ setShowButton, socketUrl, setConnection} : SessionProps){

    const [connectionState, setConnectionState] = useState<RTCPeerConnectionState>(); // Track the connection state
    const {id: userId} = useSelector((state: RootState) => state.user)

    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const showButton = "startSession" 

    const handleStartSession = () => {

        setShowButton(showButton)
        
        if(!userId){
            console.warn("UserId is null")
            return
        }

        let host = new WebRTCSessionHost(userId, socketUrl)

        host.peer.addEventListener('connectionstatechange', () => {
            setConnectionState(host.peer.connectionState); // Update connection state

            if(host.peer.connectionState == "connected"){
                host.socket.close()

                // dispatch(setConnection(host))
                setConnection(host)
                navigate("/game")
            }
        });
    }

    return (
        <>
        {!connectionState ? 
            (<button className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300" onClick={handleStartSession}>Start Session</button>)
            :
            (<p>Session started🟢</p>)
        }
         {connectionState && <p>Connection State: {connectionState}</p>}

        </>
    )
}

export default StartSessionButton;
