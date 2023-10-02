/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSingleProduct } from "../features/product/productSlice";
import { addProdToCart, getUserCart } from "../features/user/userSlice";
import { addToCart } from "../features/cart/cartSlice";

function SingleProduct() {
  // const [color, setColor] = useState(null)
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  const dispath = useDispatch();

  const singleProductState = useSelector(
    (state) => state.product.singleproduct
  );
  const cartState = useSelector((state) => state.user.getcartproducts);

  const handleAddToCart = () => {
    dispath(
      addToCart({
        id: getProductId,
        singleProductState,
        quantity,
        price: singleProductState?.price,
      })
    );
  };

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
    dispath(getSingleProduct(getProductId));
    dispath(getUserCart(config2));
  }, []);
  console.log(cartState);
  // console.log(singleProductState);

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, []);

  const uploadCart = () => {
    dispath(
      addProdToCart({
        productId: singleProductState?._id,
        quantity,
        price: singleProductState?.price,
      })
    );
  };

  return (
    <>
      <Meta title={singleProductState?.title} />
      <BreadCrumb title={singleProductState?.title} />
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 col-xl-6">
              <div className="main-product-image">
                <img
                  src={singleProductState?.images[0]?.url}
                  alt={singleProductState?.title}
                />
              </div>
            </div>

            <div className="col-12 col-xl-6">
              <div className="main-product-detail">
                <h3 className="title">{singleProductState?.title}</h3>
                <p className="price fs-4" name="price">
                  {singleProductState?.price}$
                </p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={singleProductState?.totalRatings}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p>(2 preview)</p>
                </div>
                <div className="border-bottom py-3">
                  <div className="d-flex align-items-center gap-10 py-2">
                    <h3 className="product-heading">Type</h3>
                    <p className="product-data">Skate</p>
                  </div>

                  <div className="d-flex align-items-center gap-10 py-2">
                    <h3 className="product-heading">Category</h3>
                    <p className="product-data">
                      {singleProductState?.category}
                    </p>
                  </div>

                  <div className="d-flex align-items-center gap-10 py-2">
                    <h3 className="product-heading">Brand</h3>
                    <p className="product-data">{singleProductState?.brand}</p>
                  </div>

                  <div className="d-flex align-items-center gap-10 py-2">
                    <h3 className="product-heading">Availiable</h3>
                    <p className="product-data">yes</p>
                  </div>

                  <div className="d-flex flex-column gap-10 py-2">
                    <h3 className="product-heading">Size: </h3>
                    <div className="d-flex flex-wrap gap-15">
                      <span className="badge border border-1 bg-white text-dark border-secondary p-2">
                        M
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary p-2">
                        L
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary p-2">
                        XL
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary p-2">
                        XXL
                      </span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-10 py-2">
                    {alreadyAdded === false && (
                      <>
                        <h3 className="product-heading">Quantity: </h3>
                        <input
                          type="number"
                          className="form-control"
                          min={1}
                          max={10}
                          style={{ width: "50px" }}
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                        />
                      </>
                    )}
                    {/* <button
                      className="button"
                      onClick={() => {
                        alreadyAdded ? navigate("/cart") : uploadCart();
                      }}
                    >
                      {alreadyAdded ? "Go To Cart" : "Add to cart"}
                    </button> */}
                    <button
                      className="button"
                      onClick={() => handleAddToCart()}
                    >
                      Add to cart
                    </button>
                  </div>
                  <>
                    <div className="col-12 desc">
                      <h4 className="">Description</h4>
                      <div className="bg-white">
                        <p>{singleProductState?.description}</p>
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
