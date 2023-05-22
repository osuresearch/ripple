import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DiffMode, LayoutMode, InteractionMode, PageName } from '../types';

type SettingsState = {
  value: number;
  showComments: boolean;
  showConditions: boolean;
  showNavigation: boolean;
  showDebugger: boolean;
  diffMode: DiffMode;
  layoutMode: LayoutMode;

  currentPage?: PageName;
};

const initialState: SettingsState = {
  value: 0,
  showComments: true,
  showConditions: false,
  showNavigation: true,
  showDebugger: false,
  diffMode: 'Current',
  layoutMode: 'Paged',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleComments: (state, action: PayloadAction<boolean>) => {
      state.showComments = action.payload;
    },
    toggleNavigation: (state, action: PayloadAction<boolean>) => {
      state.showNavigation = action.payload;
    },
    toggleDebugger: (state, action: PayloadAction<boolean>) => {
      state.showDebugger = action.payload;
    },
    toggleConditions: (state, action: PayloadAction<boolean>) => {
      state.showConditions = action.payload;
    },
    setDiffMode: (state, action: PayloadAction<DiffMode>) => {
      state.diffMode = action.payload;
    },
    setLayoutMode: (state, action: PayloadAction<LayoutMode>) => {
      state.layoutMode = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<PageName>) => {
      state.currentPage = action.payload;
    }
  }
});

export const {
  toggleComments,
  toggleNavigation,
  toggleConditions,
  toggleDebugger,
  setDiffMode,
  setLayoutMode,
  setCurrentPage
} = settingsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default settingsSlice.reducer;
