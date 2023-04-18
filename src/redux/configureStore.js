import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/mainReducer";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

import thunk from "redux-thunk";

export default function configreStore(initialState) {
  // add support for redux devtool
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
