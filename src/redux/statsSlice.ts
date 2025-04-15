import { createSlice } from "@reduxjs/toolkit";
import { ScoreCategory } from "../components/game/Scoreboard";

type PlayerScores = Record<ScoreCategory, number | null>

interface StatsState {
    currentPlayer: string,
    scores: Record<string, PlayerScores>
    currentTurn: number
    diceValues: number[]
    rollsLeft: number
    gameOver: boolean
}

const initialState : StatsState = {
    currentPlayer: "",
    scores: {},
    currentTurn: 0,
    diceValues: [0,0,0,0,0,0],
    rollsLeft: 3,
    gameOver: false
}

const statsSlice = createSlice({
    name: "stats",
    initialState: initialState,
    reducers: {

    }
})

export default statsSlice.reducer 