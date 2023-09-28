import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import CustomInput from "../components/CustomInput";
import Meta from "../components/Meta";
import { useFormik } from "formik";
import * as yup from "yup";
import { registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

let registerSchema = yup.object({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("last name is required"),
  mobile: yup.number().required("Mobile is required"),
  password: yup.string().required("password is required"),
  email: yup.string().required("email is required").email("Email not valid"),
});

function Signup() {
  const authState = useSelector((state) => state.user);
  console.log(authState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      mobile: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
      navigate("/login");
    },
  });

  return (
    <>
      <Meta title={"Sign up"} />
      <BreadCrumb title="Sign up" />

      <div className="signup-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3>Sign up</h3>
              <form onSubmit={formik.handleSubmit}>
                <CustomInput
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>

                <CustomInput
                  type="text"
                  name="lastname"
                  placeholder="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>

                <CustomInput
                  type="email"
                  name="email"
                  placeholder="email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>

                <CustomInput
                  type="number"
                  name="mobile"
                  placeholder="mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
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
                  <div className="d-flex justify-content-center align-items-center mt-4 gap-15">
                    <button type="submit" className="button border-0">
                      Sign up
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

export default Signup;
