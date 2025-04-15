import React, { useState, useEffect } from "react"
import { PeerConnection } from "../myTypes.ts"
import { useNavigate } from "react-router-dom"
//components
import LogoutButton from "../components/LogoutButton.tsx"
import StartSessionButton from "../components/StartSessionButton.tsx"
import JoinSessionButton from "../components/JoinSessionButton.tsx"
//controllers
import fetchProtectedData from "../controllers/fetchProtectedData.ts"
//redux
import { useDispatch, useSelector } from "react-redux"
import { login } from "../redux/userSlice.ts"
import { RootState } from "../redux/store.ts"


interface StartProps {
    setConnection: React.Dispatch<React.SetStateAction<PeerConnection | undefined>>
}

function Start({setConnection} : StartProps){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)

    const [showButton, setShowButton] = useState("both")
    let socketUrl = "ws://signaling-server-production-5768.up.railway.app"

    useEffect(() => {

        fetchProtectedData()
            .then(userData => dispatch(login(userData)))
            .catch(error => {
                if (error.message.includes("Session expired")) {
                    alert("Session expired, please log in again");
                    navigate("/login");
                }else{
                    console.log(error)
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
                            <p className="text-lg">UserId: {user.id}</p>     
                        </>
                        :
                        <></>
                    }

                </div>
            </div>

            <div className="flex flex-col justify-center items-center flex-grow mt-8">
                {showButton === "both" || showButton === "startSession" ? (
                    <StartSessionButton setConnection={setConnection} setShowButton={setShowButton} socketUrl={socketUrl} />
                ) : null}

                {showButton === "both" || showButton === "joinSession" ? (
                    <JoinSessionButton setConnection={setConnection} setShowButton={setShowButton} socketUrl={socketUrl} />
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
