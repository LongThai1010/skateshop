import { useLocation } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/user/userSlice";

let passwordSchema = yup.object({
  password: yup.string().required("password is required"),
});
function ResetPassword() {
  const location = useLocation();
  const getToken = location.pathname?.split("/")[2];
  console.log(getToken);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      dispatch(resetPassword({ token: getToken, password: values.password }));
    },
  });
  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />

      <div className="reset-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3>Reset Password</h3>
              <p className="text-center mt-2 mb-3">
                We will reset your password
              </p>
              <form action="" onSubmit={formik.handleSubmit}>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    name="password"
                    id="password"
                    class="form-control"
                    placeholder="password"
                    aria-describedby="helpId"
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                  />
                  <div className="error">
                    {formik.touched.password && formik.errors.password}
                  </div>
                </div>

                <div>
                  <div className="d-flex justify-content-center align-items-center flex-column gap-15 mt-3">
                    <button className="button border-0" type="submit">
                      OK
                    </button>
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

export default ResetPassword;
