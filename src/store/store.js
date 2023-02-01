import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { journalSlice } from './journal'

// Here we determine all your slices in a single place, which is our store 

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal : journalSlice.reducer,
  },
})