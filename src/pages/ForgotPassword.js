import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { forgotUserPassword } from "../features/user/userSlice";

let loginSchema = yup.object({
  email: yup.string().required("email is required").email("Email not valid"),
});
function ForgotPassword() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(forgotUserPassword(values));
    },
  });

  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />

      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3>Reset Forgot Password</h3>
              <p className="text-center mt-2 mb-3">
                We will send you an email to reset your password
              </p>
              <form onSubmit={formik.handleSubmit}>
                <div class="form-group">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    class="form-control"
                    placeholder="Email"
                    aria-describedby="helpId"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-center align-items-center flex-column gap-15 mt-3">
                    <button className="button border-0" type="submit">
                      Submit
                    </button>
                    <Link to="/login">Cancel & Back Login</Link>
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

export default ForgotPassword;
