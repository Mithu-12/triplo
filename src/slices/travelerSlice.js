import { createSlice } from '@reduxjs/toolkit';


const initialState ={
    traveler: [],
    selectedTraveler: null
}

const travelerSlice = createSlice({
    name: 'traveler',
    initialState,
    reducers:{
        setTraveler: (state, action)=>{
            state.traveler = action.payload
        },
        setSelectedTraveler: (state, action)=>{
            state.traveler = action
        }
    }
})

export const {setTraveler, setSelectedTraveler} = travelerSlice.actions;

export default travelerSlice.reducer