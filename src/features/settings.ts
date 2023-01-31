import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SettingsState = {
  value: number;
  showComments: boolean;
  showConditions: boolean;
  diffMode: DiffMode;
};

const initialState: SettingsState = {
  value: 0,
  showComments: true,
  showConditions: true,
  diffMode: 'Current'
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleComments: (state, action: PayloadAction<boolean>) => {
      state.showComments = action.payload;
    },
    toggleConditions: (state, action: PayloadAction<boolean>) => {
      state.showConditions = action.payload;
    },
    setDiffMode: (state, action: PayloadAction<DiffMode>) => {
      state.diffMode = action.payload;
    }
  }
});

export const { toggleComments, toggleConditions, setDiffMode } = settingsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default settingsSlice.reducer;
