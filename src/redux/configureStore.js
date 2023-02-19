import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../../redux1/actions/reducers";
import reduxImmutableStateVariant from "redux-immutable-state-invariant";

export default function configreStore(initilaState) {
  // add support for redux devtool
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    initilaState,
    composeEnhancer(applyMiddleware(reduxImmutableStateVariant()))
  );
}
