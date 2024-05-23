import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Card} from '../../components/main/Cards';

interface ExampleState {
  cards: Card[];
}

const initialState: ExampleState = {
  cards: [],
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
    },
  },
});

export const {setCards} = cardSlice.actions;

export default cardSlice.reducer;
