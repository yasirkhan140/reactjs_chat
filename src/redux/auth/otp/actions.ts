import { AuthOtpActionTypes } from "./types";

// common success
export const authLoginApiResponseSuccess = (actionType: string, data: any) => ({
  type: AuthOtpActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

// common error
export const authLoginApiResponseError = (
  actionType: string,
  error: string
) => ({
  type: AuthOtpActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const otpVerify = (data: any) => {
  return {
    type: AuthOtpActionTypes.OTP_VERIFY,
    payload: { data },
  };
};

export const otpResend = (data:any) => {
  return {
    type: AuthOtpActionTypes.OTP_RESEND,
    payload:{data}
  };
};