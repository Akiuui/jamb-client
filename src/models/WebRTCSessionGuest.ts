    //WebRTCSessionGuest.ts
import { OfferMessage, AnswerMessage, CandidateMessage, JoinMessage } from "../myTypes"

class WebRTCSessionGuest{
    userId: string
    targetId: string
    socket: WebSocket
    peer: RTCPeerConnection
    dataChannel: RTCDataChannel

    constructor(userId: string, targetId: string, socketUrl: string){
        this.userId = userId
        this.targetId = targetId
        this.socket = new WebSocket(socketUrl)

        this.peer = new RTCPeerConnection({
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" } // free public STUN server
            ]
        })

        this.peer.onicecandidate = this.sendCandidates;

        this.dataChannel = this.peer.createDataChannel("chat");
        this.setupDataChannel();

        this.joinWebSocket()

        this.listenOnWebSocket()    
    }
    //DONE
    sendCandidates = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {

            const candidateMessage : CandidateMessage= {
                type: "candidate",
                target: this.targetId,
                candidate: event.candidate
            };

            console.log("3. Sent ICE candidate");

            this.socket.send(JSON.stringify(candidateMessage));
        }
    }

    setupDataChannel = () => {
        this.dataChannel.onopen = () => {
            console.log("📡 Data channel open");

            const data = {
                type: "ids",
                id: this.userId
            }

            const firstToPlay = {
                type: "firstToPlay",
                id: this.targetId
            }
                    
            setTimeout(() => {
                this.dataChannel.send(JSON.stringify(data))
                setTimeout(() => {
                    this.dataChannel.send(JSON.stringify(firstToPlay))
                }, 100)
            }, 100)

        };
    }
    //DONE
    joinWebSocket(){
        this.socket.onopen = async () => {
            console.log("0. Connected to socket")

            const joinMessage : JoinMessage = {
                type: "join",
                id: this.userId
            }

            this.socket.send(JSON.stringify(joinMessage));

            await this.sendOffer()
        };
    }

    //Done
    async sendOffer(){
        let offer : RTCSessionDescriptionInit
        let offerMessage : OfferMessage = {
            type: "offer",
            target: "",
            from: "",
            data: {} as RTCSessionDescriptionInit
        }

        try {
            offer = await this.peer.createOffer()
            console.log("1. Created an offer")

            await this.peer.setLocalDescription(offer)
            
            offerMessage = {
                type: "offer",
                target: this.targetId,
                from: this.userId,  
                data: offer
            }
                
        } catch (error) {
            console.log(error)
        }

        console.log("1.1 Sent a offer")
        this.socket.send(JSON.stringify(offerMessage));
    }
    //Done
    listenOnWebSocket(){

        this.socket.onmessage = async (message : MessageEvent) => {

            const rawData = message.data instanceof Blob
                ? await message.data.text()
                : message.data
            
            const data : AnswerMessage | CandidateMessage = JSON.parse(rawData)
            
            try {
                switch(data["type"]){
                    case "answer":
                        console.log("2.1 Received a answer")
                        await this.handleAnswer(data as AnswerMessage)
                        console.log("2.2 Saved the answear")
                        break
                    case "candidate":
                        console.log("3.1 Received ice Candidates")
                        this.handleReceivedCandidate(data as CandidateMessage)
                        break
                }
                
            } catch (error) {
                console.log(error)
            }
        
        }
    }
    //DONE
    async handleAnswer(answer : AnswerMessage){
        try {
            const remoteDesc : RTCSessionDescription = new RTCSessionDescription({
                type: answer.data.type,
                sdp: answer.data.sdp
            });
        
            await this.peer.setRemoteDescription(remoteDesc);
        } catch (error) {
            console.log(error)
        }

    }
    //DONE
    handleReceivedCandidate(data : CandidateMessage){

        if (!data.candidate) {
            console.warn("No ICE candidate found in message.");
            return;
        }
        
        try {
            const candidate : RTCIceCandidate = new RTCIceCandidate(data.candidate);

            this.peer.addIceCandidate(candidate)
                .then(() => {
                    console.log("✅ ICE candidate added successfully");
                })
                .catch(err => {
                    console.error("❌ Error adding ICE candidate:", err);
                });

        } catch (err) {
            console.error("❌ Failed to create ICE candidate:", err);
        }
    }

    
}

export default WebRTCSessionGuest