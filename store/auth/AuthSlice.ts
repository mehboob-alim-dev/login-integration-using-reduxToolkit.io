import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Signin } from "./AuthAction";

const initialState: {
  loading: boolean;
  user: {} | null;
  userToken: string | null;
  error: string | null;
  success: boolean;
  userData: {} | null;
} = {
  loading: false,
  user: null,
  userToken: null,
  error: null,
  success: false,
  userData: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state: any, action) => {
      console.log(action.payload);
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    ////////////////////////// login the user////////////////////////////////////

    builder.addCase(Signin.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    }),
      builder.addCase(Signin.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = null;
        localStorage.setItem("token", JSON.stringify({ ...action.payload }));
        state.user = action.payload;
        state.success = true;
      }),
      builder.addCase(Signin.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message ?? null);
        console.log("rejected>>>", state, action);
        state.success = false;
      });
  },
});
export const { setUserInfo } = AuthSlice.actions;
export default AuthSlice.reducer;
