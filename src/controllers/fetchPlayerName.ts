import axios from "axios"
async function fetchPlayerName(id : string) {
    try {
        let res = await axios.get(`https://auth-server-production-90c7.up.railway.app/getUserName?id=${id}`)

        if(res?.data?.message){
            return res.data.message
        }else{
            throw new Error("Response format is not correct")
        }

    } catch (error) {
        console.log(error)
        
    }

}

export default fetchPlayerName