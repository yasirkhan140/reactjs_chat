import { AuthOtpActionTypes, AuthOtpState } from "./types";
import { otpVerify } from './actions';

export const INIT_STATE: AuthOtpState = {
  otpverify: false,
  loading: false,
  otpError:""
};

const Login = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case AuthOtpActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case AuthOtpActionTypes.OTP_VERIFY:
          return {
            ...state,
            user: action.payload.data,
            loading: false,
            otpverify: true,
            isUserLogin: true,
            isUserLogout: false,
          };
        case AuthOtpActionTypes.OTP_RESEND:
          return {
            ...state,
            loading: false,
            isUserLogout: false,
            otpverify: false,
            isUserLogin: false,
          };
        default:
          return { ...state };
      }

    case AuthOtpActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case AuthOtpActionTypes.OTP_VERIFY:
          return {
            ...state,
            error: action.payload.error,
            isUserLogin: false,
            otpverify: false,
            loading: false,
          };
        case AuthOtpActionTypes.OTP_RESEND:
          return {
            ...state,
            loading: false,
            otpverify: false,
            isUserLogin: false,
            isUserLogout: false,
          };
        default:
          return { ...state };
      }

    case AuthOtpActionTypes.OTP_VERIFY: {
      return {
        ...state,
        loading: true,
        isUserLogin: false,
        otpVerify:false,
      };
    }

    case AuthOtpActionTypes.OTP_RESEND:
      return {
        ...state,
        loading: true,
        isUserLogout: false,
        otpVerify:false
      };
    default:
      return { ...state };
  }
};

export default Login;
