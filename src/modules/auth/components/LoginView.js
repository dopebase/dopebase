import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import { ClipLoader } from "react-spinners";

import { loginUser } from "../redux/actions";

import styles from "../styles/Auth.module.css";

export const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);

  const login = async (data, setSubmitting) => {
    setFormData(data);
    setIsLoading(true);
    dispatch(loginUser(data, router, dispatch));
    setSubmitting(false);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="sweet-loading card">
        <div className="spinner-container">
          <ClipLoader
            className="spinner"
            sizeUnit={"px"}
            size={50}
            color={"#123abc"}
            loading={isLoading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.LoginCard}>
      <div>
        <h1 className={styles.title}>Sign in to your account</h1>
        <Formik
          initialValues={formData}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            login(values, setSubmitting);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.FormFieldContainer}>
                <label className={styles.FormLabel}>E-mail</label>
                <input
                  className={styles.FormTextField}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <p className={styles.ErrorMessage}>
                  {errors.email && touched.email && errors.email}
                  {auth && auth.errors && auth.errors.email}
                </p>
              </div>

              <div className={styles.FormFieldContainer}>
                <label className={styles.FormLabel}>Password</label>
                <input
                  className={styles.FormTextField}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <p className={styles.ErrorMessage}>
                  {errors.password && touched.password && errors.password}
                  {auth && auth.errors && auth.errors.password}
                </p>
              </div>

              <div>
                <button
                  className={styles.PrimaryButton}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Continue
                </button>
              </div>
            </form>
          )}
        </Formik>
        <div className={styles.SignupInsteadContainer}>
          <p>
            Don't have an account? <a href="/register">Sign up</a>
          </p>
          <p>
            Forgot Password? <a href="/requestResetPassword">Reset Password</a>
          </p>
        </div>
      </div>
    </div>
  );
};
