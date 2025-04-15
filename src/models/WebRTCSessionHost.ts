//WebRTCSessionHost.js
import { AnswerMessage, CandidateMessage, JoinMessage, OfferMessage } from "../myTypes"

class WebRTCSessionHost{
    userId: string
    targetId: string
    socket: WebSocket
    peer: RTCPeerConnection
    dataChannel: RTCDataChannel | null = null

    constructor(userId: string, socketUrl: string){
        this.userId = userId
        this.targetId = ""
        this.socket = new WebSocket(socketUrl)

        this.peer = new RTCPeerConnection({
            iceServers: [
              { urls: "stun:stun.l.google.com:19302" } // free public STUN server
            ]
          })

        this.peer.onicecandidate = this.sendCandidates;

        this.peer.ondatachannel = (event) => {
            this.dataChannel = event.channel;
            this.setupDataChannel();
        };

        this.joinWebSocket()

        this.listenOnWebSocket()

    }
    //Done
    sendCandidates = (event : RTCPeerConnectionIceEvent) => {

        if (event.candidate && this.targetId) {

            const candidateMessage : CandidateMessage = {
                type: "candidate",
                target: this.targetId,
                candidate: event.candidate
            };

            console.log("3. Sent ICE candidate");
            this.socket.send(JSON.stringify(candidateMessage));
        }
    }

    setupDataChannel() {
        const channel = this.dataChannel

        if(!channel){
            throw new Error("dataChannel is null")
        }

        channel.onopen = () => {
            console.log("📡 Data channel open");
            const data = {
                type: "ids",
                id: this.userId
            }
            const firstToPlay = {
                type: "firstToPlay",
                id: this.userId
            }
                        
            setTimeout(() => {
                channel.send(JSON.stringify(data))
                setTimeout(() => {
                    channel.send(JSON.stringify(firstToPlay))
                }, 100)
            }, 100)
        };
    }
    //DONE
    joinWebSocket(){
        this.socket.onopen = () => {
            console.log("0. Connected to socket")

            const joinMessage : JoinMessage = {
                type: "join",
                id: this.userId
            } 

            this.socket.send(JSON.stringify(joinMessage));
        };
    }
    //DONE
    listenOnWebSocket(){

        this.socket.onmessage = async (message : MessageEvent) => {

            const rawData = message.data instanceof Blob
                ? await message.data.text()
                : message.data

            const data : OfferMessage | CandidateMessage = JSON.parse(rawData)

            try {

                switch(data["type"]){
                    case "offer":
                        console.log("1.3. Received an offer")

                        await this.handleOffer(data as OfferMessage)
                        await this.sendAnswer()

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
    //Done
    async handleOffer(offer : OfferMessage){
        this.targetId = offer.from

        try {

            const remoteDesc : RTCSessionDescription = new RTCSessionDescription({
                type: offer.data.type,
                sdp: offer.data.sdp    
            })
        
            await this.peer.setRemoteDescription(remoteDesc)

        } catch (error) {
            console.log(error)
        }

    }
    //Done
    async sendAnswer(){
        try {
            let answer : RTCSessionDescriptionInit  = await this.peer.createAnswer();
        
            console.log("2.1 Created an answer")
        
            await this.peer.setLocalDescription(answer);
        
            let data : AnswerMessage = { 
                type: "answer",
                data: answer,
                target: this.targetId
            }
        
            console.log("2.2 Sent an answer")

            this.socket.send(JSON.stringify(data))
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
export default WebRTCSessionHost