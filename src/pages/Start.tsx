import React, { useState, useEffect } from "react"
import LogoutButton from "../components/LogoutButton.tsx"
import StartSessionButton from "../components/StartSessionButton.tsx"
import JoinSessionButton from "../components/JoinSessionButton.tsx"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { PeerConnection } from "../myTypes.ts"

interface User {
    username: string
    userId: string
}

interface StartProps {
    setConnection: React.Dispatch<React.SetStateAction<PeerConnection | undefined>>
}

function Start({setConnection} : StartProps){

    const navigate = useNavigate()

    const [user, setUser] = useState<User>({
        username: "",
        userId: ""
    })

    const [showButton, setShowButton] = useState("both")
    let socketUrl = "ws://signaling-server-production-5768.up.railway.app"

    useEffect(() => {
            axios.get("https://auth-server-production-90c7.up.railway.app/protected", {withCredentials:true})
            // .then((res) => console.log(res.data.user))
            .then((res) => setUser(res.data.user))
            .catch((error) => {
                if (axios.isAxiosError(error)) {

                    console.error("❌ Axios error:", error.message);
                    if (error.response && error.response.status >= 400 && error.response.status <=500) {
                        alert("Session expired, please log in again");
                        navigate("/login")
                    }
                
                }
            })

    }, [])

    return(
        <>
        <div className="h-screen flex flex-col bg-gray-100 relative">
            {/* Header section: Start, Username, and UserId in the top inline */}
            <div className="flex justify-between items-center p-4 bg-white shadow-md">
                <h1 className="text-3xl font-bold">Start</h1>
                <div>
                    {
                        user ?
                        <>
                            <p className="text-lg">Username: {user.username}</p>
                            <p className="text-lg">UserId: {user.userId}</p>
                        </>
                        :
                        <></>
                    }

                </div>
            </div>

            <div className="flex flex-col justify-center items-center flex-grow mt-8">
                {showButton === "both" || showButton === "startSession" ? (
                    <StartSessionButton setConnection={setConnection} setShowButton={setShowButton} userId={user.userId} socketUrl={socketUrl} />
                ) : null}

                {showButton === "both" || showButton === "joinSession" ? (
                    <JoinSessionButton setConnection={setConnection} setShowButton={setShowButton} userId={user.userId} socketUrl={socketUrl} />
                ) : null}
            </div>

            <div className="absolute bottom-5 right-5">
                <LogoutButton />
            </div>
        </div>
        </>
    )

}

export default Start;
