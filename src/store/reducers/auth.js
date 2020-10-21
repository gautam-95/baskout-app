import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  user: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: false,
        loading: false,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.message,
        loading: false,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
