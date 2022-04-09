import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState, AppThunk} from "../../../app/store";
import {State} from "./interfaces"
import {endpoint} from "../api";

const initialState : State = {
    models: []
}

export const stateSlice = createSlice({
    name: 'state',
    initialState: initialState,
    // The `reducers` field lets us define reducers and generate associated actions (for non async dispatch events)
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload` (can omit action param)
        action: (state, action: PayloadAction<Partial<State>>) => {
            // do something here
            return {...state, ...action}
        }
    },
    // api requests in here
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed (fulfilled, pending, rejected builder options)
        builder.addCase(getState.fulfilled, (state, action) => {
            // Add user to the state array
            state.models = action.payload
        })
    },

});

// export our api actions
export const getState = createAsyncThunk(
    'state/getModels',
    async () => await endpoint.getAll())

// export our actions = map dispatch to props
export const {action} = stateSlice.actions;

// get part/all of our state, think of this as map state to props
export const getEntireState = (state: RootState) => state.state;

// export our reducer
export default stateSlice.reducer;

