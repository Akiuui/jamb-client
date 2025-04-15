import { useState } from "react"
import WebRTCSessionHost from "../models/WebRTCSessionHost.ts"
import { useNavigate } from 'react-router-dom';
import { SessionProps } from "../myTypes.ts";



function StartSessionButton({userId, setShowButton, socketUrl, setConnection} : SessionProps){

    const [connectionState, setConnectionState] = useState<RTCPeerConnectionState>(); // Track the connection state
    const navigate = useNavigate()
    const showButton = "startSession" 

    const handleStartSession = () => {
        setShowButton(showButton)
        
        let host = new WebRTCSessionHost(userId, socketUrl)

        host.peer.addEventListener('connectionstatechange', () => {
            setConnectionState(host.peer.connectionState); // Update connection state

            if(host.peer.connectionState == "connected"){
                host.socket.close()
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
