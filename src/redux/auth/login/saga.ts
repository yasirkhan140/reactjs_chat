import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { AuthLoginActionTypes } from "./types";
import {
  authLoginApiResponseSuccess,
  authLoginApiResponseError,
} from "./actions";

//Include Both Helper File with needed methods
import {

  setLoggeedInUser,
} from "../../../helpers/firebase_helper";
import { postLogin, postSocialLogin } from "../../../api/index";
import toastNotify from "../../../utils/toast";



function* loginUser({ payload: { user } }: any) {
  try {
     if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response: Promise<any> = yield call(postLogin, user);
      setLoggeedInUser(response);
      yield put(
        authLoginApiResponseSuccess(AuthLoginActionTypes.LOGIN_USER, response),
      );
      toastNotify("Login Successfully ","success")
    }
  } catch (error: any) {
    yield put(
      authLoginApiResponseError(AuthLoginActionTypes.LOGIN_USER, error),
    );
    toastNotify(error?.message,"error")
  }
}

function* socialLogin({ payload: { data, type } }: any) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      
      const response: Promise<any> = yield call(postSocialLogin, data);
      yield put(
        authLoginApiResponseSuccess(AuthLoginActionTypes.LOGIN_USER, response),
      );
    }
  } catch (error: any) {
    yield put(
      authLoginApiResponseError(AuthLoginActionTypes.LOGIN_USER, error),
    );
  }
}

function* logoutUser() {
  try {
    localStorage.removeItem("authUser");
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      yield put(
        authLoginApiResponseSuccess(AuthLoginActionTypes.LOGOUT_USER, true),
      );
    }
  } catch (error: any) {
    yield put(
      authLoginApiResponseError(AuthLoginActionTypes.LOGOUT_USER, error),
    );
  }
}

function* loginSaga() {
  yield takeEvery(AuthLoginActionTypes.LOGIN_USER, loginUser);
  yield takeEvery(AuthLoginActionTypes.LOGOUT_USER, logoutUser);
  yield takeLatest(AuthLoginActionTypes.SOCIAL_LOGIN, socialLogin);
}

export default loginSaga;
