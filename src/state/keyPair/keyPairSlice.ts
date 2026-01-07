import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface KeyPairState {
  publicKey: JsonWebKey | null;
  privateKey: JsonWebKey | null;
};

const initialState: KeyPairState = {
  publicKey: null,
  privateKey: null
};

const keyPairSlice = createSlice({
  name: "keypair",
  initialState,
  reducers: {
    setKeyPair: (state, action: PayloadAction<{ publicKey: JsonWebKey; privateKey: JsonWebKey }>) => {
      state.publicKey = action.payload.publicKey;
      state.privateKey = action.payload.privateKey;
    },
    clearKeyPair: (state) => {
      state.publicKey = null;
      state.privateKey = null;
    },
  }
});

export const { setKeyPair, clearKeyPair } = keyPairSlice.actions;

export default keyPairSlice.reducer;