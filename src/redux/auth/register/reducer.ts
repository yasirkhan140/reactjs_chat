import { AuthRegisterActionTypes, AuthRegisterState } from "./types";

export const INIT_STATE: AuthRegisterState = {
  registrationError: null,
  message: "",
  loading: false,
  user: null,
  userOtp:false
};

const Register = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case AuthRegisterActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case AuthRegisterActionTypes.REGISTER_USER:
          return {
            ...state,
            loading: false,
            user: action.payload.data,
            registrationError: null,
            isUserRegistered: true,
            userOtp:true
          };
        default:
          return { ...state };
      }

    case AuthRegisterActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case AuthRegisterActionTypes.REGISTER_USER:
          return {
            ...state,
            loading: false,
            registrationError: action.payload.error,
            isUserRegistered: false,
            userOtp:false
          };
        default:
          return { ...state };
      }

    case AuthRegisterActionTypes.REGISTER_USER: {
      return {
        ...state,
        loading: true,
        isUserRegistered: false,
        userOtp:false
      };
    }
    default:
      return { ...state };
  }
};

export default Register;
