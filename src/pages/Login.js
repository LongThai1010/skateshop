import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../components/CustomInput";
import { loginUser } from "../features/user/userSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect } from "react";
import Loading from "react-loading";

let loginSchema = yup.object({
  password: yup.string().required("password is required"),
  email: yup.string().required("email is required").email("Email not valid"),
});
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
      // navigate('/')
    },
  });

  useEffect(() => {
    if (authState.user !== null && authState.isError === false) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  return (
    // const { isLoading } = this.props;

    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3>Login</h3>
              <form onSubmit={formik.handleSubmit}>
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  classname="mb-3"
                />
                <div className="error ">
                  {formik.touched.email && formik.errors.email}
                </div>
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>

                <div>
                  <Link to="/forgot-password">Forgot password!</Link>

                  <div className="d-flex justify-content-center align-items-center gap-15">
                    <button className="button border-0" type="submit">
                      Login
                    </button>
                    <Link to="/signup" className="btn">
                      Sign Up
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
