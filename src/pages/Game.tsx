import { useState, useEffect } from 'react'
import DiceRoller from "../components/game/DiceRoller.tsx"
import fetchPlayerName from '../controllers/fetchPlayerName.ts'
import Scoreboard from "..//components/game/Scoreboard.tsx"

interface GameProps {
  connection : any
}

interface UsersPair{
  [key : string] : string  
}

function Game({connection} : GameProps) {
  const [users, setUsers] = useState<UsersPair>({})
  const [displayUsername, setDisplayUsername] = useState<string>()

  useEffect(() => {
    let id1 : string = connection.userId
    let id2 : string = ""
    let usersObj : UsersPair = {}

    fetchPlayerName(id1)
      .then(res => usersObj[id1] = res)
    
    try {
      connection.dataChannel.onmessage = (event : MessageEvent) => {
        console.log("Received a message")
        const data = JSON.parse(event.data)

        if(data.type == "ids"){
          id2 = data.id

          fetchPlayerName(id2)
            .then(res => { usersObj[id2] =  res})
            .then(() => setUsers(usersObj))

        }
        if(data.type == "firstToPlay"){
          console.log("Recieved first to play")
          console.log(usersObj[data.id])
          setDisplayUsername(usersObj[data.id])
        }
      }      
    } catch (error) {
      console.log(error)
    }

  }, [connection])
  
   
  
    return (
      <>
        <Scoreboard/>
        <DiceRoller username={displayUsername}/>
      </>
      
    )
}

export default Game