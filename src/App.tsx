import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from "./pages/Login.tsx"
import Register from "./pages/Register.tsx"
import Start from "./pages/Start.tsx"
import Game from "./pages/Game.tsx"
import First from "./pages/First.tsx"
import { PeerConnection } from './myTypes.ts';

function App() {

    const [connection, setConnection] = useState<PeerConnection | undefined>()

    return (
        <BrowserRouter>
          
          <Routes>
            <Route path="/" element={<First/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/start' element={<Start setConnection={setConnection}/>}/>
            <Route path='/game' element={<Game connection={connection}/>}/>
          </Routes>
          
        </BrowserRouter>
      )
}

export default App
