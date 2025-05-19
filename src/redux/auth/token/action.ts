import { REFRESH_TOKEN_ERROR, REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS } from "./types";

export const refreshTokenRequest = (payload: {
  onSuccess?: (token: string) => void;
  onFailure?: (err: any) => void;
}) => ({
  type: REFRESH_TOKEN_REQUEST,
  payload,
});

export const refreshTokenSuccess = (token: string) => ({
  type: REFRESH_TOKEN_SUCCESS,
  payload: token,
});

export const refreshTokenError = (error: any) => ({
  type: REFRESH_TOKEN_ERROR,
  payload: error,
});