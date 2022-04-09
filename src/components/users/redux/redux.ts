import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState, AppThunk} from "../../../app/store";
import {State} from "./interfaces"
import {endpoint} from "../api";

const initialState : State = {
    users: []
}

export const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    // The `reducers` field lets us define reducers and generate associated actions (for non async dispatch events)
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload` (can omit action param)
        setUserInput: (state, action: PayloadAction<Partial<State>>) => {
            // do something here
            return {...state, ...action.payload}
        }
    },
    // api requests in here
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed (fulfilled, pending, rejected builder options)
        builder.addCase(getState.fulfilled, (state, action) => {
            // Add user to the state array
            state.users = action.payload
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            // Add user to the state array
            state.user = action.payload
        })
    },

});

// export our api actions
export const getState = createAsyncThunk(
    'users/getUsers',
    async () => await endpoint.getAll())

export const getUser = createAsyncThunk(
    'users/getUser',
    async (id: number) => await endpoint.getOne(id.toString())
)

// export our actions = map dispatch to props
export const {setUserInput} = usersSlice.actions;

// get part/all of our state, think of this as map state to props
export const getEntireState = (state: RootState) => state.users;

// export our reducer
export default usersSlice.reducer;

