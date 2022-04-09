import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from "../features/users/redux/redux";
import stateReducer from "../features/generic/redux/redux"

export const store = configureStore({
  reducer: {
    state: stateReducer,
    users: usersReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
