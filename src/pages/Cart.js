import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  updateCartProduct,
  deleteCartProduct,
  getUserCart,
} from "../features/user/userSlice";
import { config } from "../utils/axiosConfig";

function Cart() {
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
  const dispatch = useDispatch();
  const userCartState = useSelector((state) => state.user.getcartproducts);
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  console.log(userCartState);

  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getUserCart(config2));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productUpdateDetail]);

  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct({ id: id, config2: config2 }));
    setTimeout(() => {
      dispatch(getUserCart(config2));
    }, 200);
  };

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum =
        sum +
        Number(userCartState[index].quantity) * userCartState[index].price;
      setTotalAmount(sum);
    }
  }, [userCartState]);

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />

      <div className="cart-wrapper py-3">
        <div className="container-xxl">
          <div className="row">
            <h3 className="col-12">Cart of your</h3>
            <div className=" col-xl-12">
              <div className="cart-header d-flex justify-content-between align-items-center">
                <h4 className="cart-col-1">Image && Product </h4>
                <h4 className="cart-col-2">Price</h4>
                <h4 className="cart-col-2">Quantity</h4>
                <h4 className="cart-col-2">Total</h4>
              </div>
              {userCartState?.map((item, index) => {
                return (
                  <div
                    className="cart-data py-3 d-flex justify-content-between align-items-center"
                    key={index}
                  >
                    <h4 className="cart-col-1  d-flex align-items-center justify-content-center">
                      <div className="cart-image">
                        <img
                          alt={item?.productId?.title}
                          src={item?.productId?.images[0]?.url}
                        />
                      </div>
                      <div className="w-50 cart-title">
                        <h5>{item?.productId?.title}</h5>
                      </div>
                    </h4>
                    <h4 className="cart-col-2 cart-price">
                      <div className="price">{item?.productId?.price}$</div>
                    </h4>
                    <h4 className="cart-col-2 cart-total">
                      <div className="d-flex gap-30 align-items-center">
                        <div>
                          <input
                            type="number"
                            className="form-control cart-quantity"
                            name={"quantity" + item?._id}
                            id={"cart" + item?._id}
                            min={1}
                            max={10}
                            value={item?.quantity}
                            onChange={(e) =>
                              setProductUpdateDetail({
                                cartItemId: item?._id,
                                quantity: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <AiFillDelete
                            className="text-danger icon-delete-cart"
                            onClick={() => {
                              deleteACartProduct(item?._id);
                            }}
                          />
                        </div>
                      </div>
                    </h4>
                    <h4 className="cart-col-2">
                      <div className="total">
                        {+item?.price * +item?.quantity}$
                      </div>
                    </h4>
                  </div>
                );
              })}

              <div className="col-12 py-2 mt-4">
                <div className="d-flex justify-content-between align-items-baseline">
                  <Link to="/product" className="button button-cart">
                    Continue To Shopping
                  </Link>
                  {totalAmount !== null && totalAmount !== 0 && (
                    <div className="d-flex flex-column align-items-end gap-10">
                      <h4 className="text-danger cart-sub-total">
                        Sub Total: {totalAmount}
                      </h4>
                      <p className="mb-2 cart-tax">Tax and fee is a payment.</p>
                      <Link to="/checkout" className="button">
                        Check out
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
