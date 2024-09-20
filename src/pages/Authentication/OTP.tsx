import React from "react";
import { Alert, Row, Col, Form, Button } from "reactstrap";

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

//actions
import { userForgetPassword } from "../../redux/actions";

// components
import NonAuthLayoutWrapper from "../../components/NonAutnLayoutWrapper";
import AuthHeader from "../../components/AuthHeader";
import FormInput from "../../components/FormInput";
import Loader from "../../components/Loader";
import { createSelector } from "reselect";
interface RecoverPasswordProps {}
const OTP = (props: RecoverPasswordProps) => {
  // global store
  const { dispatch, useAppSelector } = useRedux();

  // const { forgetError, forgetSuccessMsg, forgetPassLoading } = useAppSelector(
  //   state => ({
  //     forgetError: state.ForgetPassword.forgetError,
  //     forgetSuccessMsg: state.ForgetPassword.forgetSuccessMsg,
  //     forgetPassLoading: state.ForgetPassword.loading,
  //   })
  // );


  const errorData = createSelector(
    (state : any) => state.ForgetPassword,
    (state) => ({
      forgetError: state.forgetError,
      forgetSuccessMsg: state.forgetSuccessMsg,
      forgetPassLoading: state.loading,

    })
  );
  // Inside your component
  const { forgetError,forgetSuccessMsg ,forgetPassLoading} = useAppSelector(errorData);

  const resolver = yupResolver(
    yup.object().shape({
      otp: yup
        .number().max(999999)
        .required("Please Enter a valid  otp").min(100000,"Please Enter a valid otp"),
    })
  );

  const defaultValues: any = {
    otp:""
  };

  const methods = useForm({ defaultValues, resolver });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  const onSubmitForm = (values: object) => {
    dispatch(userForgetPassword(values));
  };

  const { userProfile, loading } = useProfile();
  if (userProfile && !loading) {
    return <Navigate to={{ pathname: "/dashboard" }} />;
  }

  return (
    <NonAuthLayoutWrapper>
      <Row className=" justify-content-center my-auto">
        <Col sm={8} lg={6} xl={5} className="col-xxl-4">
          <div className="py-md-5 py-4">
            <AuthHeader
              title="OTP "
              subtitle="Verify Your OTP"
            />

            {forgetError && forgetError.message ? (
              <Alert color="danger">{forgetError?.message}</Alert>
            ) : null}
            {forgetSuccessMsg ? (
              <Alert color="success">{forgetSuccessMsg}</Alert>
            ) : null}
            {!forgetError && !forgetSuccessMsg && (
              <Alert color="info" className="text-center my-4">
                Enter your Otp that sent to you on mail!
              </Alert>
            )}

            <Form
              onSubmit={handleSubmit(onSubmitForm)}
              className="position-relative"
            >
              {forgetPassLoading && <Loader />}
              <div className="mb-3">
                <FormInput
                  label="OTP"
                  type="number"
                  name="otp"
                  maxLength={6}
                  onInput={(e)=>{const input =e.target as HTMLInputElement; input.value=input.value.slice(0,input.maxLength)}}
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  placeholder="Enter Otp"
                  className="form-control"
                />
              </div>
              <div className="text-center mt-4">
                <Button color="primary" className="w-100" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
            
          </div>
        </Col>
      </Row>
    </NonAuthLayoutWrapper>
  );
};

export default OTP;
