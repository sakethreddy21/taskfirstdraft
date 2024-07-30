import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RoleType = 'USER' | null;

export interface IAppSlice {
  usermail: string | null;
  username: string | null;
  role: RoleType;
  accessToken: string | null;
  isLoggedIn: boolean;
  id: any;
  path: any;
}

const initialState: IAppSlice = {
  usermail: null,
  username: null,
  role: null,
  accessToken: null,
  isLoggedIn: false,
  id: undefined,
  path: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateUser(state: IAppSlice, action: PayloadAction<Partial<IAppSlice>>) {
      state.usermail = action.payload.usermail ? action.payload.usermail : state.usermail;
      state.username = action.payload.username ? action.payload.username : state.username;
    },
    login(
      state: IAppSlice,
      payload: PayloadAction<{
        accessToken: string;
        usermail: string;
        username: string;
        role: RoleType;
        id: any;
        
      }>
    ) {
      state.isLoggedIn = true;
      state.accessToken = payload.payload.accessToken;
      state.usermail = payload.payload.usermail;
      state.username = payload.payload.username;
      state.role = payload.payload.role;
      state.id = payload.payload.id;
    },
    logout(state: IAppSlice) {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.role = null;
      state.usermail = null;
      state.username = null;
      state.id = null;
    },
    forgotPsw(
      state: IAppSlice,
      payload: PayloadAction<{
        usermail: string;
        username: string;
      }>
    ) {
      state.usermail = payload.payload.usermail;
      state.username = payload.payload.username;
    },
    pathUrl(state: IAppSlice, payload: PayloadAction<string>) {
      state.path = payload.payload;
    },
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
