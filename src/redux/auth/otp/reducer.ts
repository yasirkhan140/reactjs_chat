import { AuthOtpActionTypes, AuthOtpState } from "./types";

export const INIT_STATE: AuthOtpState = {
  otpverify: false,
  loading: false,
  otpError: "",
};

const Otp = (state = INIT_STATE, action: any) => {
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
            otpSuccessMessgae: "otp verifed successfully",
          };

        case AuthOtpActionTypes.OTP_RESEND:
          return {
            ...state,
            loading: false,
            isUserLogout: false,
            otpverify: false,
            isUserLogin: false,
            otpSuccessMessgae: "otp resend successfully",
          };
        default:
          return { ...state };
      }

    case AuthOtpActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case AuthOtpActionTypes.OTP_VERIFY:
          return {
            ...state,
            otpError: action.payload.error,
            isUserLogin: false,
            otpverify: false,
            loading: false,
          };
        case AuthOtpActionTypes.OTP_RESEND:
          return {
            ...state,
            loading: false,
            otpError: action.payload.error,
            otpverify: false,
            isUserLogin: false,
            isUserLogout: false,
            otpSuccessMessgae: "",
          };
        default:
          return { ...state };
      }

    case AuthOtpActionTypes.OTP_VERIFY: {
      return {
        ...state,
        loading: true,
        isUserLogin: false,
        otpVerify: false,
        otpSuccessMessgae: "",
      };
    }

    case AuthOtpActionTypes.OTP_RESEND:
      return {
        ...state,
        loading: true,
        isUserLogout: false,
        otpVerify: false,
        otpSuccessMessgae: "",
      };
    default:
      return { ...state };
  }
};

export default Otp;
