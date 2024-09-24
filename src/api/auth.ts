import { APIClient } from "./apiCore";
import * as url from "./urls";

const api = new APIClient();

// postForgetPwd
const postFakeForgetPwd = (data: any) =>
  api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// postForgetPwd
const postJwtForgetPwd = (data: any) =>
  api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

const postLogin = (data: any) => api.create(url.POST_LOGIN, data);
const postOtpVerify = (data: any) => api.create(url.OTP_VERIFY, data);
const getOtpResend = () => api.get(url.OTP_VERIFY);

const postJwtLogin = (data: any) => api.create(url.POST_FAKE_JWT_LOGIN, data);

// Register Method
const postRegister = (data: any) => {
  return api.create(url.POST_REGISTER, data);
};
const getrefreshToken = () => {
  return api.get(url.REFRESH_TOKEN);
};
// Register Method
const postJwtRegister = (data: any) => {
  return api.create(url.JWT_REGISTER, data);
};
const changePassword = (data: object) => {
  return api.update(url.USER_CHANGE_PASSWORD, data);
};

// postSocialLogin
const postSocialLogin = (data: any) => api.create(url.SOCIAL_LOGIN, data);

export {
  postFakeForgetPwd,
  postJwtForgetPwd,
  postLogin,
  postJwtLogin,
  postRegister,
  postJwtRegister,
  changePassword,
  postSocialLogin,
  postOtpVerify,
  getOtpResend,
  getrefreshToken,
};
