import { createSlice } from '@reduxjs/toolkit';

interface PlayerProps {
  address?: string;
  avatar: string;
  country: string;
  bettedBalance: number;
  isUpPool: boolean;
  className?: string;
}

const globalState = createSlice({
  name: 'globalState',
  initialState: {
    player: {
      address: '',
      avatar: '',
      country: '',
      bettedBalance: 0,
      isUpPool: false,
      className: '',
    },
    isUpdate: false
  },
  reducers: {
    setPlayer: (state, data) => {
      state.player = data.payload;
    },
    setAvatar: (state, data) => {
      state.player.avatar = data.payload;
    },
    setCountry: (state, data) => {
      state.player.country = data.payload;
    },
    setIsUpdate: (state) => {
      state.isUpdate = !state.isUpdate;
    }
  },
});
export const { setPlayer, setAvatar, setCountry, setIsUpdate } = globalState.actions;
export default globalState.reducer;