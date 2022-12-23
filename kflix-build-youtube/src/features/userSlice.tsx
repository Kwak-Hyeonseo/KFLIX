import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const reducers = {
  login: (state: any, action: any) => {
    state.user = action.payload;    
  },
  logout: (state: any) => {
    state.user = null;
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: any) => state.user.user;

export default userSlice.reducer;
