import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RoleType = 'USER' | null;

export interface IAppSlice {
  email: string | null;
  role: RoleType;
  accessToken: string | null;
  isLoggedIn: boolean;
  id: any;
  path: any;
}

const initialState: IAppSlice = {
  email: null,
  role: null,
  accessToken: null,
  isLoggedIn: false,
  id: undefined,
  path: '',
};

const appSlice = createSlice({
  name: 'draft',
  initialState,
  reducers: {
    updateUser(state: IAppSlice, action: PayloadAction<Partial<IAppSlice>>) {
      state.email = action.payload.email ? action.payload.email : state.email;
    },
    login(
      state: IAppSlice,
      payload: PayloadAction<{
        accessToken: string;
        usermail: string;
        role: RoleType;
      }>
    ) {
      state.isLoggedIn = true;
      state.accessToken = payload.payload.accessToken;
      state.email = payload.payload.usermail;
      state.role = payload.payload.role;
    },
    logout(state: IAppSlice) {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.role = null;
      state.email = null;
    },
    forgotPsw(
      state: IAppSlice,
      payload: PayloadAction<{
        email: string;
      }>
    ) {
      state.email = payload.payload.email;
    },
    codingExerciseId(
      state: IAppSlice,
      payload: PayloadAction<{
        id: string | string[] | undefined;
      }>
    ) {
      state.id = payload.payload.id;
    },
    courseId(state: IAppSlice, payload: PayloadAction<string>) {
      state.id = payload.payload;
    },
    pathUrl(state: IAppSlice, payload: PayloadAction<string>) {
      state.path = payload.payload;
    },
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
