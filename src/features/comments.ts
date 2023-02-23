import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// TODO: this is only in redux for fast development.
// This should eventually all become scoped context so we can
// run multiple Ripple instances together, be faster, etc etc.

type CommentsState = {
  /**
   * Currently focused thread
   */
  focused?: Thread;

  /**
   * All threads
   */
  threads: Thread[];
};

const initialState: CommentsState = {
  threads: []
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setFocusedThread: (state, action: PayloadAction<Thread | undefined>) => {
      state.focused = action.payload;
    },
    setThreads: (state, action: PayloadAction<Thread[]>) => {
      state.threads = action.payload;
    }
  }
});

export const { setFocusedThread, setThreads } = commentsSlice.actions;

export default commentsSlice.reducer;
