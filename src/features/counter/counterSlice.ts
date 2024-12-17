import { createSlice, PayloadAction } from '@reduxjs/toolkit';
 
interface TokenState {
  token: string;
  username: string;
  id: string;
  email:string;
}
 
const initialState: TokenState = {
  token: '',
  username: '',
  id: '',
  email:''
};
 
export const tokenSlice = createSlice({
  name: 'tokenLoader',
  initialState,
  reducers: {
    setSavedToken: (state, action: PayloadAction<{ token: string, username: string, id: string ,email: string}>) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.id = action.payload.id;
      state.email=action.payload.email;
    },
    clearToken: (state) => {
      state.token = '';
      state.username = '';
      state.id = '';
      state.email='';
    },
  },
});
 
export const { setSavedToken, clearToken } = tokenSlice.actions;
 
export default tokenSlice.reducer;
