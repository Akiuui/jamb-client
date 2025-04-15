import WebRTCSessionGuest from "./models/WebRTCSessionGuest"
import WebRTCSessionHost from "./models/WebRTCSessionHost"

export type PeerConnection = WebRTCSessionGuest | WebRTCSessionHost

export interface SessionProps{
    userId: string
    setShowButton: React.Dispatch<React.SetStateAction<string>>
    socketUrl: string
    setConnection: React.Dispatch<React.SetStateAction<PeerConnection | undefined>>
}

export interface JoinMessage { 
    type: string
    id: string
}
export interface OfferMessage {
    type: string
    target: string
    from: string
    data: RTCSessionDescriptionInit
}
export interface AnswerMessage {
    type: string
    target: string
    data: RTCSessionDescriptionInit
}
export interface CandidateMessage {
    type: string
    target: string
    candidate: RTCIceCandidate
}
