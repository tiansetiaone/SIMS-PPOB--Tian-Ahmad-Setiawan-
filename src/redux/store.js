import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'; // Contoh slice (pastikan file ini sudah ada)

const store = configureStore({
  reducer: {
    user: userReducer,
    // Tambahkan reducer lain jika ada
  },
});

export default store;
