import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice"
import attendanceReducer from './attendanceSlice'

export const  store =  configureStore({
    reducer:{
        employee: employeeReducer,
        attendance: attendanceReducer
    },
})

export default store;
