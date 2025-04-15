import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.ts"
// import connectionReducer from "./connectionSlice.ts"

export const store = configureStore({
    reducer:{
        user: userReducer,
        // connection: connectionReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
