import React, { useEffect } from "react";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/user/userSlice";

const Orders = () => {
  const dispath = useDispatch();
  const orderState = useSelector((state) => state.user.getOrders?.orders);

  console.log(orderState);
  useEffect(() => {
    dispath(getOrders());
  }, []);
  return (
    <Container class1="home-wrapper-1 py-5">
      <div className="row">
        <h1 className="col-12 text-center">My Orders</h1>
        <table class="table table-striped table-inverse ">
          <thead class="thead-inverse">
            <tr>
              <th>STT</th>
              <th>Name Product</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderState &&
              orderState.map((item, index) => {
                return (
                  <tr key={index}>
                    <td> {index + 1} </td>
                    <td>
                      {item?.orderItems.map((i, index) => {
                        return (
                          <div className="" key={index}>
                            - {i?.product?.title} ({i?.quantity})
                          </div>
                        );
                      })}
                    </td>
                    <td>{item?.totalPrice}</td>
                    <td>{item?.orderStatus}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default Orders;
