import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null, 
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action) { 
      state.currentUser = action.payload; 
    },
    setPfp(state, action) {
      state.pfp = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    clearUser(state) {
      state.currentUser = null; 
      state.pfp = null;
      state.token = null;
    },
  },
});

export const { setCurrentUser, setPfp, setToken, clearUser } = userSlice.actions;
export default userSlice.reducer;
