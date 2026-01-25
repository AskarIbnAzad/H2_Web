import {
    applyMiddleware,
    combineReducers,
    compose,
    configureStore,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import user_auth_slice from "./slice/user_auth_slice";

let reducers = combineReducers({
    userAuth: user_auth_slice,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = configureStore(
    { reducer: reducers },
    composeEnhancers(applyMiddleware(thunk))
);
export default store;
