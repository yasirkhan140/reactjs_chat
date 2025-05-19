// src/store/reducers/authRefreshReducer.ts

import {
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_ERROR,
} from "./types";
export interface AuthRefreshState {
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

export const REFRESH_INIT_STATE: AuthRefreshState = {
  accessToken: null,
  loading: false,
  error: null,
};
const RefreshTokenReducer = (state = REFRESH_INIT_STATE, action: any): AuthRefreshState => {
  switch (action.type) {
    case REFRESH_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        accessToken: action.payload,
        error: null,
      };
    case REFRESH_TOKEN_ERROR:
      return {
        ...state,
        loading: false,
        accessToken: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default RefreshTokenReducer;
