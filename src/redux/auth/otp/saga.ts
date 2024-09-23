import { call, put, takeEvery } from "redux-saga/effects";
import { authOtpApiResponseError, authOtpApiResponseSuccess } from "./actions";
import toastNotify from "../../../utils/toast";
import { setLoggeedInUser } from "../../../helpers/firebase_helper";
import { AuthOtpActionTypes } from "./types";
import { getOtpResend, postOtpVerify } from "../../../api";

function* otpVerify({ payload: { data } }: any) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response: Promise<any> = yield call(postOtpVerify, data);
      setLoggeedInUser(response);
      yield put(
        authOtpApiResponseSuccess(AuthOtpActionTypes.OTP_VERIFY, response),
      );
      toastNotify("Login Successfully ", "success");
    }
  } catch (error: any) {
    yield put(authOtpApiResponseError(AuthOtpActionTypes.OTP_VERIFY, error));
    toastNotify(error?.message, "error");
  }
}

function* otpResend() {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response: Promise<any> = yield call(getOtpResend);
      yield put(
        authOtpApiResponseSuccess(AuthOtpActionTypes.OTP_RESEND, response),
      );
      toastNotify("otp Resend successfully", "success");
    }
  } catch (error: any) {
    yield put(authOtpApiResponseError(AuthOtpActionTypes.OTP_RESEND, error));
    toastNotify(error?.message, "error");
  }
}

function* otpSaga() {
  yield takeEvery(AuthOtpActionTypes.OTP_VERIFY, otpVerify);
  yield takeEvery(AuthOtpActionTypes.OTP_RESEND, otpResend);
}

export default otpSaga;
