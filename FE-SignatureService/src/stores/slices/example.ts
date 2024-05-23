import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface ExampleState {
  value: number;
}

const initialState: ExampleState = {
  value: 0,
};

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{value: number}>) => {
      state.value = action.payload.value;
    },
  },
});

export const {setValue} = exampleSlice.actions;
export const selectValue = (state: RootState) => state.example.value;

export default exampleSlice.reducer;
