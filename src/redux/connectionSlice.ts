import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PeerConnection } from "../myTypes";

interface ConnectionState {
    connection: PeerConnection | null
}

const initialState : ConnectionState = {
    connection: null,
}

const connectionSlice = createSlice({
    name: "connection",
    initialState: initialState,
    reducers: {
        setConnection: (state, action: PayloadAction<PeerConnection>) => {
            state.connection = action.payload
        },
        clearConnection: (state) => {
            state.connection = null
        }
    }
})

export const {setConnection, clearConnection} = connectionSlice.actions
export default connectionSlice.reducer