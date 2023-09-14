import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { ClipLoader } from "react-spinners";
import { registerUser } from "../redux/actions";
import styles from "../styles/Auth.module.css";

export const SignUpView = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const router = useRouter();

  const create = async (data, setSubmitting) => {
    setFormData(data);
    setIsLoading(true);
    const registerData = router.query ? { ...data, query: router.query } : data;
    dispatch(registerUser(registerData, router, dispatch));
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
        <h1 className={styles.title}>Create New Account</h1>
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
            if (!values.confirmPassword) {
              errors.confirmPassword = "Required";
            } else if (values.confirmPassword != values.password) {
              errors.confirmPassword = "Passwords didn't match!";
            }
            if (!values.firstName) {
              errors.firstName = "Required";
            }
            if (!values.lastName) {
              errors.lastName = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            create(values, setSubmitting);
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
                <label className={styles.FormLabel}>First Name</label>
                <input
                  className={styles.FormTextField}
                  type="firstName"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
                <p className={styles.ErrorMessage}>
                  {errors.firstName && touched.firstName && errors.firstName}
                  {auth && auth.errors && auth.errors.firstName}
                </p>
              </div>

              <div className={styles.FormFieldContainer}>
                <label className={styles.FormLabel}>Last Name</label>
                <input
                  className={styles.FormTextField}
                  type="lastName"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
                <p className={styles.ErrorMessage}>
                  {errors.lastName && touched.lastName && errors.lastName}
                  {auth && auth.errors && auth.errors.lastName}
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

              <div className={styles.FormFieldContainer}>
                <label className={styles.FormLabel}>Confirm Password</label>
                <input
                  className={styles.FormTextField}
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                <p className={styles.ErrorMessage}>
                  {errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword}
                  {auth && auth.errors && auth.errors.confirmPassword}
                </p>
              </div>

              <div>
                <button
                  className={styles.PrimaryButton}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Create account
                </button>
              </div>
            </form>
          )}
        </Formik>
        <div className={styles.SignupInsteadContainer}>
          Already have an account? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
};
