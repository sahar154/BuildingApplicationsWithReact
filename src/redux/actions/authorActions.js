import * as types from "./actionTypes";
import * as authorApiThunk from "../../api/authorApi";
import { beginApiCall, ApiCallError } from "./apiStatusActions";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors: authors };
}

export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authorApiThunk
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        dispatch(ApiCallError(error));
        throw error;
      });
  };
}
