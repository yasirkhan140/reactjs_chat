import { call, put, takeLatest } from "redux-saga/effects";
import {
  refreshTokenRequest,
  refreshTokenSuccess,
  refreshTokenError,
} from "./action";
import { getrefreshToken } from "../../../api/auth";

function* handleRefreshToken(action: any): any {
  const { onSuccess, onFailure } = action.payload;
  try {
    const response = yield call(getrefreshToken);
    const newAccessToken = response.accessToken;

    yield put(refreshTokenSuccess(newAccessToken));
    if (onSuccess) onSuccess(newAccessToken);
  } catch (error) {
    yield put(refreshTokenError(error));
    if (onFailure) onFailure(error);
  }
}

export default function* authSaga() {
  yield takeLatest(refreshTokenRequest, handleRefreshToken);
}
