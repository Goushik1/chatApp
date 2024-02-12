import { combineReducers } from "redux";
import userReducers from "./userReducers";


const myReducer= combineReducers(
    {
        user: userReducers
    }
)

export default myReducer; 