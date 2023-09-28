import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateProfile } from "../features/user/userSlice";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";

let profileSchema = yup.object({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("last name is required"),
  email: yup.string().required("email is required").email("Email not valid"),
  mobile: yup.number().required("mobile detail is required"),
  address: yup.string().required("address detail is required"),
});

function Profile() {
  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };

  const dispath = useDispatch();
  const userState = useSelector((state) => state?.user.user);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname,
      lastname: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
      address: userState?.address,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispath(updateProfile({ data: values, config2: config2 }));
      setEdit(true);
    },
  });

  const [edit, setEdit] = useState(true);

  console.log(userState);

  return (
    <>
      <Meta title="My Profile" />
      <BreadCrumb title="Profile" />

      <div class="container rounded bg-white  mb-5">
        <div class="row">
          <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center">
              <img
                alt="user"
                class="rounded-circle"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              />
              <span class="font-weight-bold">
                {userState?.firstname + " " + userState?.lastname}
              </span>
              <span class="text-black-50">{userState?.email}</span>
              <span> </span>
            </div>
          </div>
          <div class="col-md-5 border-right">
            <form onSubmit={formik.handleSubmit}>
              <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h4 class="text-right">Profile Settings</h4>
                  <FiEdit
                    onClick={() => {
                      setEdit(false);
                    }}
                  />
                </div>
                <div class="row mt-2">
                  <div class="col-md-6">
                    <label class="labels">First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="first name"
                      value={formik.values.firstname}
                      onChange={formik.handleChange("firstname")}
                      disabled={edit}
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="labels">Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="last name"
                      value={formik.values.lastname}
                      onChange={formik.handleChange("lastname")}
                      disabled={edit}
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-12 mb-3">
                    <label class="labels">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      disabled={edit}
                    />
                  </div>
                  <div class="col-md-12 ">
                    <label class="labels">Mobile</label>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="enter phone number"
                      value={formik.values.mobile}
                      onChange={formik.handleChange("mobile")}
                      disabled={edit}
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-12">
                    <label class="labels">Address</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="address"
                      value={formik.values.address}
                      onChange={formik.handleChange("address")}
                      disabled={edit}
                    />
                  </div>
                </div>
                <div class="mt-5 text-center">
                  {edit === false && (
                    <button
                      class="btn btn-primary profile-button"
                      type="submit"
                    >
                      Save Profile
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
