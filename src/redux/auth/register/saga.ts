import { takeEvery, fork, put, all, call } from "redux-saga/effects";

//Account Redux states
import { AuthRegisterActionTypes } from "./types";
import {
  authRegisterApiResponseSuccess,
  authRegisterApiResponseError,
} from "./actions";

//Include Both Helper File with needed methods

import { postRegister } from "../../../api/index";
import toastNotify from "../../../utils/toast";

// initialize relavant method of both Auth


// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }: any) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response: Promise<any> = yield call(postRegister, user);
      yield put(
        authRegisterApiResponseSuccess(
          AuthRegisterActionTypes.REGISTER_USER,
          response,
        ),
      );
      toastNotify("register successfully", "success");
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response: Promise<any> = yield call(postRegister, user);
      yield put(
        authRegisterApiResponseSuccess(
          AuthRegisterActionTypes.REGISTER_USER,
          response,
        ),
      );
    }
  } catch (error: any) {
    yield put(
      authRegisterApiResponseError(
        AuthRegisterActionTypes.REGISTER_USER,
        error,
      ),
    );
    toastNotify(error?.message, "error");
  }
}

export function* watchUserRegister() {
  yield takeEvery(AuthRegisterActionTypes.REGISTER_USER, registerUser);
}

function* registerSaga() {
  yield all([fork(watchUserRegister)]);
}

export default registerSaga;
