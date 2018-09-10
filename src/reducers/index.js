import {
    combineReducers
} from "redux";
import productReducer from "./ProductReducer";

const rootReducer = combineReducers({
    productState: productReducer,
})

export default rootReducer;