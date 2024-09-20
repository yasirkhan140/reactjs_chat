import React from "react";
import { Alert, Row, Col, Form, Button, UncontrolledTooltip } from "reactstrap";

// hooks
import { useRedux } from "../../hooks/index";

// router
import { Link, Navigate } from "react-router-dom";

// validations
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

// hooks
import { useProfile } from "../../hooks";
import { createSelector } from "reselect";
//actions
import { registerUser } from "../../redux/actions";

// components
import NonAuthLayoutWrapper from "../../components/NonAutnLayoutWrapper";
import AuthHeader from "../../components/AuthHeader";
import FormInput from "../../components/FormInput";
import Loader from "../../components/Loader";

interface RegisterProps {}
const Register = (props: RegisterProps) => {
  // global store
  const { dispatch, useAppSelector } = useRedux();

  // const { user, registrationError, regLoading } = useAppSelector(state => ({
  //   user: state.Register.user,
  //   registrationError: state.Register.registrationError,
  //   regLoading: state.Register.loading,
  //   isUserRegistered: state.Register.isUserRegistered,
  // }));

  const errorData = createSelector(
    (state: any) => state.Register,
    state => ({
      user: state.user,
      registrationError: state.registrationError,
      regLoading: state.loading,
      isUserRegistered: state.isUserRegistered,
    }),
  );
  // Inside your component
  const { user, registrationError, regLoading } = useAppSelector(errorData);

  const resolver = yupResolver(
    yup.object().shape({
      email: yup
        .string()
        .email("This value should be a valid email.")
        .required("Please Enter E-mail."),
      firstName: yup.string().required("Please Enter First Name"),
      lastName: yup.string(),
      password: yup
        .string()
        .required("Please Enter Password.")
        .min(8)
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol"),
    }),
  );

  const defaultValues: any = {};

  const methods = useForm({ defaultValues, resolver });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  const onSubmitForm = async (values: object) => {
    dispatch(registerUser(values));
  };

  const { registerData } = useProfile();
  if (registerData && !registerData.loading && registerData.userOtp) {
    return <Navigate to={{ pathname: "/auth-otp" }} />;
  }

  return (
    <NonAuthLayoutWrapper>
      <Row className=" justify-content-center my-auto">
        <Col sm={8} lg={6} xl={5} className="col-xxl-4">
          <div className="py-md-5 py-4">
            <AuthHeader
              title="Register Account"
              subtitle="Get your free Doot account now."
            />

            {user && user ? (
              <Alert color="success">Register User Successfully</Alert>
            ) : null}

            {registrationError && registrationError.message ? (
              <Alert color="danger">{registrationError.message}</Alert>
            ) : null}

            <Form
              onSubmit={handleSubmit(onSubmitForm)}
              className="position-relative"
            >
              {regLoading && <Loader />}
              <div className="mb-3">
                <FormInput
                  label="Email"
                  type="text"
                  name="email"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  placeholder="Enter Email"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <FormInput
                  label="First Name"
                  type="text"
                  name="firstName"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  placeholder="Enter firstName"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <FormInput
                  label="Last Name"
                  type="text"
                  name="lastName"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  placeholder="Enter last name"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  className="form-control pe-5"
                  placeholder="Enter Password"
                  withoutLabel={true}
                />
              </div>

              <div className="mb-4">
                <p className="mb-0">
                  By registering you agree to the Doot{" "}
                  <Link to="#" className="text-primary">
                    Terms of Use
                  </Link>
                </p>
              </div>

              <div className="text-center mb-3">
                <Button
                  color="primary"
                  className="w-100  waves-effect waves-light"
                  type="submit"
                >
                  Register
                </Button>
              </div>
              <div className="mt-4 text-center">
                <div className="signin-other-title">
                  <h5 className="font-size-14 mb-4 title">Sign up using</h5>
                </div>
                <Row className="">
                  <div className="col-4">
                    <div>
                      <button
                        type="button"
                        className="btn btn-light w-100"
                        id="facebook"
                      >
                        <i className="mdi mdi-facebook text-indigo"></i>
                      </button>
                    </div>
                    <UncontrolledTooltip placement="top" target="facebook">
                      Facebook
                    </UncontrolledTooltip>
                  </div>
                  <div className="col-4">
                    <div>
                      <button
                        type="button"
                        className="btn btn-light w-100"
                        id="twitter"
                      >
                        <i className="mdi mdi-twitter text-info"></i>
                      </button>
                    </div>
                    <UncontrolledTooltip placement="top" target="twitter">
                      Twitter
                    </UncontrolledTooltip>
                  </div>
                  <div className="col-4">
                    <div>
                      <button
                        type="button"
                        className="btn btn-light w-100"
                        id="google"
                      >
                        <i className="mdi mdi-google text-danger"></i>
                      </button>
                    </div>
                    <UncontrolledTooltip placement="top" target="google">
                      Google
                    </UncontrolledTooltip>
                  </div>
                </Row>
              </div>
            </Form>

            <div className="mt-5 text-center text-muted">
              <p>
                Already have an account ?{" "}
                <Link
                  to="/auth-login"
                  className="fw-medium text-decoration-underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </NonAuthLayoutWrapper>
  );
};

export default Register;
