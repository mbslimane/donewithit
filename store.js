import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './feautres/basketSlice'
import restaurantReducer from './feautres/restaurantSlice'

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer
  },
});