export enum AuthOtpActionTypes {
    API_RESPONSE_SUCCESS = "@@auth/otp/API_RESPONSE_SUCCESS",
    API_RESPONSE_ERROR = "@@auth/otp/API_RESPONSE_ERROR",
  
    OTP_VERIFY = "@@auth/otp/OTP_VERIFY",
    OTP_RESEND = "@@auth/otp/OTP_RESEND",
  }
  export interface AuthOtpState {
    otpverify: boolean;
    otpError: any;
    loading:boolean;
  }
  