import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface UserState {
  isLogin: boolean;
  isPermiss: boolean;
}

const initialState: UserState = {
  isLogin: false,
  isPermiss: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setPermiss: (state, action: PayloadAction<boolean>) => {
      state.isPermiss = action.payload;
    },
  },
});

export const {setPermiss, setLogin} = userSlice.actions;

export default userSlice.reducer;
