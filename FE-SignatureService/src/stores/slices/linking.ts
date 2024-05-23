import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface LinkingState {
  url: string;
}

const initialState: LinkingState = {
  url: '',
};

export const linkingSlice = createSlice({
  name: 'linking',
  initialState,
  reducers: {
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    resetUrl: state => {
      state.url = '';
    },
  },
});

export const {setUrl, resetUrl} = linkingSlice.actions;

export default linkingSlice.reducer;
