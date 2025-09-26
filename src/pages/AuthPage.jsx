import { Formik } from "formik";
import Input from "../components/Input";
import * as Yup from "yup";
import { useStateContext } from "../contexts/ContextProvider";
import { useState } from "react";
import {
  useLogin,
  useSignup,
} from "../hooks/api/auth";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .max(50, "Must be 15 characters or less")
    .required("Please enter employee name"),
  email: Yup.string()
    .email()
    .required("please select designation"),
  password: Yup.string()
    .min(6, "Must be more than 5 characters")
    .required(),
});

const AuthPage = () => {
  const [authMode, setAuthMode] =
    useState("login");
  const { currentColor } = useStateContext();
  const signUp = useSignup();
  const login = useLogin();

  const toggleAuthMode = () => {
    authMode === "login"
      ? setAuthMode("signup")
      : setAuthMode("login");
  };

  const handleSubmit = (values) => {
    console.log("submitting...");
    authMode === "login"
      ? login.mutate(values)
      : signUp.mutate(values);
  };

  return (
    <div className="w-full ">
      <section className="flex flex-col items-center my-5">
        <p className="text-lg font-semibold">
          {authMode === "login"
            ? "Login"
            : "Sign Up"}
        </p>
        <div className="w-full max-w-[400px] flex flex-col justify-center items-center">
          <Formik
            initialValues={{
              fullName: "JJK",
              email: "jskfjf@gmail.com",
              password: "akjgakgj",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
              setFieldValue,

              /* and other goodies */
            }) => {
              return (
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-5"
                >
                  {authMode === "signup" && (
                    <div>
                      <Input
                        name="fullName"
                        placeholder={"Full Name"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fullName}
                      />
                      {touched.fullName &&
                      errors.fullName ? (
                        <div className="text-xs text-red-400">
                          {errors.fullName}
                        </div>
                      ) : null}
                    </div>
                  )}

                  <div>
                    <Input
                      name="email"
                      placeholder={"Email"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {touched.email &&
                    errors.email ? (
                      <div className="text-xs text-red-400">
                        {errors.email}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <Input
                      name="password"
                      placeholder={"Password"}
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {touched.password &&
                    errors.password ? (
                      <div className="text-xs text-red-400">
                        {errors.password}
                      </div>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    disabled={
                      !isValid || isSubmitting
                      // postMutation.isLoading
                    }
                    className=" disabled:opacity-30 disabled:cursor-not-allowed text-white py-2 px-2 rounded-sm data-[disabled]:opacity-30"
                    style={{
                      background: currentColor,
                    }}
                  >
                    {authMode === "login"
                      ? "Login"
                      : "Sign Up"}
                  </button>
                </form>
              );
            }}
          </Formik>
          <div className="flex justify-end items-end w-full mt-5">
            <button
              onClick={toggleAuthMode}
              className="text-sky-600 text-sm font-semibold"
            >
              {authMode === "login"
                ? "Create new account"
                : "Login to your account"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthPage;
