import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux";

export const store = configureStore({
    reducer: {
        user: userReducer, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(),
});

