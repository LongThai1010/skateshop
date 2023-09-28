import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { base_url, config } from "../utils/axiosConfig";
import {
  createAnOrder,
  deleteUserCart,
  getUserCart,
  resetState,
} from "../features/user/userSlice";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";

let checkoutSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("last name is required"),
  address: yup.string().required("address detail is required"),
  other: yup.string().required("orther detail is required"),
  country: yup.string().required("country is required"),
  city: yup.string().required("city is required"),
  state: yup.string().required("state is required"),
  pincode: yup.string().required("pincode is required"),
});

function CheckOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [cartProductState, setCartProductState] = useState([]);

  const cartState = useSelector((state) => state.user.getcartproducts);
  const userState = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      country: "",
      state: "",
      other: "",
      pincode: "",
      city: "",
    },
    validationSchema: checkoutSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
      localStorage.setItem("address", JSON.stringify(values));
      setTimeout(() => {
        checkoutHandler();
      }, 300);
    },
  });

  console.log(shippingInfo);

  // console.log(cartState);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotalAmount(sum);
    }
  }, [cartState]);

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

  useEffect(() => {
    dispatch(getUserCart(config2));
  }, []);

  useEffect(() => {
    if (
      userState?.orderProduct?.order !== null &&
      userState?.orderProduct?.success === true
    ) {
      navigate("/my-orders");
    }
  }, [userState]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index].productId._id,
        quantity: cartState[index].quantity,
        price: cartState[index].price,
      });
    }
    setCartProductState(items);
  }, []);

  const checkoutHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to Load");
      return;
    }
    const result = await axios.post(
      `${base_url}user/order/checkout`,
      { amount: totalAmount },
      config
    );
    if (!result) {
      alert("Something went wrong");
      return;
    }

    const { amount, id: order_id, currency } = result.data.order;

    const options = {
      key: "rzp_test_y9Eb2E2YaDEt19", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "Lt developer",
      description: "Test Transaction",
      // image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          `${base_url}user/order/paymentVerification`,
          data,
          config
        );

        dispatch(
          createAnOrder({
            totalPrice: totalAmount,
            totalPriceAfterDiscount: totalAmount,
            orderItems: cartProductState,
            paymentInfo: result?.data,
            shippingInfo: JSON.parse(localStorage.getItem("address")),
          })
        );

        dispatch(deleteUserCart(config2));
        localStorage.removeItem("address");
        dispatch(resetState());
      },
      prefill: {
        name: "tos dev",
        email: "tosskate@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: "Chung cu vincoland at Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <Meta title={"checkout "} />
      <BreadCrumb title={"checkout "} />

      <div className="checkout-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row checkout">
            <div className="col-12 col-xl-7">
              <div className="checkout-left-data">
                <h3 className="website-name text-danger">GD Skateshop</h3>

                <h5 className="title">Contact infomation:</h5>
                <p className="user-details">Lt (lt@gmail.com)</p>
                <br />
                <form
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-wrap gap-15 justify-content-between"
                >
                  <h4 className="title">Shipping infomation</h4>
                  {/* <div className="w-100">
                                        <select className="form-control form-select "></select>
                                    </div> */}

                  <div className="w-100">
                    <select
                      className="form-control form-select"
                      name="country"
                      value={formik.values.country}
                      onChange={formik.handleChange("country")}
                    >
                      <option value="" selected disabled>
                        Select Contry
                      </option>
                      <option value="VietNam">Viet Nam</option>
                    </select>
                    <div className="error ms-2">
                      {formik.touched.country && formik.errors.country}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange("firstName")}
                    />
                    <div className="error ms-2">
                      {formik.touched.firstName && formik.errors.firstName}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange("lastName")}
                    />
                    <div className="error ms-2">
                      {formik.touched.lastName && formik.errors.lastName}
                    </div>
                  </div>

                  <div className="w-100">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange("address")}
                    />
                    <div className="error ms-2">
                      {formik.touched.address && formik.errors.address}
                    </div>
                  </div>

                  <div className="w-100">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="atc..."
                      name="other"
                      value={formik.values.other}
                      onChange={formik.handleChange("other")}
                    />
                    <div className="error ms-2">
                      {formik.touched.other && formik.errors.other}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange("city")}
                    />
                    <div className="error ms-2">
                      {formik.touched.city && formik.errors.city}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <select
                      className="form-control form-select"
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange("state")}
                    >
                      <option value="" selected disabled>
                        Select state
                      </option>

                      <option value="Pending">Pending</option>
                      <option value="Pending">Pending</option>
                    </select>
                    <div className="error ms-2">
                      {formik.touched.state && formik.errors.state}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Zip code"
                      name="pincode"
                      value={formik.values.pincode}
                      onChange={formik.handleChange("pincode")}
                    />
                    <div className="error ms-2">
                      {formik.touched.pincode && formik.errors.pincode}
                    </div>
                  </div>

                  <div className="w-100">
                    <div className="d-flex align-items-center justify-content-between payment">
                      <Link to="/cart" className="text-dark">
                        <BiArrowBack className="me-2" />
                        Return to cart
                      </Link>
                      <Link to="/cart" className="button continus">
                        Continue To Shopping
                      </Link>

                      <button type="submit" className="button">
                        Payment
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-12 col-xl-5">
              <div className="border-bottom py-4">
                {cartState &&
                  cartState.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex gap-10 align-items-center justify-content-between "
                      >
                        <div className="w-75 d-flex align-items-center gap-20">
                          <div className="">
                            <img
                              src={item?.productId?.images[0].url}
                              alt="itemProduct"
                              width={60}
                            />
                          </div>

                          <div className="align-center">
                            {item?.productId.title}
                          </div>

                          <div className="name">({item?.quantity})</div>
                        </div>

                        <div className="flex-grow-1">
                          {item?.quantity * item?.price}$
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="d-flex flex-wrap gap-15 justify-content-between pt-3">
                <p>Subtotal</p>
                <p>= {totalAmount ? totalAmount : "0"}</p>
              </div>
              <br />+
              <div className="d-flex flex-wrap gap-15 justify-content-between border-bottom py-4 ">
                <p>Shipping </p>

                <p>Free</p>
              </div>
              <div className="d-flex flex-wrap gap-15 justify-content-between py-4 ">
                <h5>Total</h5>
                <h6 className="text-danger">
                  = {totalAmount ? totalAmount : "0"}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOut;
