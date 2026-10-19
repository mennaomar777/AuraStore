import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PasswordResetState {
  email: string | null;
}

const initialState: PasswordResetState = {
  email: null,
};

const passwordResetSlice = createSlice({
  name: "passwordReset",
  initialState,
  reducers: {
    setResetEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    clearResetEmail(state) {
      state.email = null;
    },
  },
});

export const { setResetEmail, clearResetEmail } = passwordResetSlice.actions;

export default passwordResetSlice.reducer;
