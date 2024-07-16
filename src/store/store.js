import { configureStore } from "@reduxjs/toolkit";
import authSlicereducer from "./authSlice";
const store=configureStore({
    reducer:{
    auth: authSlicereducer,
    }
});

export default store;