import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addToWishlist } from "../features/product/productSlice";

function ProductCard(props) {
  const { grid, data } = props;
  let location = useLocation();
  const dispatch = useDispatch();

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              location.pathname === "/product" ? `gr-${grid}` : "col-6 col-xl-3"
            }`}
          >
            <Link
              to={"/product/" + item?._id}
              className="product-card position-relative"
            >
              <div className="product-image">
                <img
                  className=""
                  src={item?.images[0]?.url}
                  alt="product_image"
                />
              </div>
              <div className="wishlist-icon position-absolute">
                <button
                  className="border-0 bg-transparent"
                  onClick={() => addToWish(item?._id)}
                >
                  <img src="images/wish.svg" alt="wish" />
                </button>
              </div>
              <div className="product-detail">
                <div className="product-detail-top">
                  <h6 className="brand">{item?.brand}</h6>
                  <h5 className="product-title">{item?.title}</h5>
                </div>

                <div className="product-detail-bottom">
                  <ReactStars
                    count={5}
                    size={24}
                    value={item?.totalrating.toString()}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className={`desc ${grid === 12 ? "d-block" : "d-none"}`}>
                    {" "}
                    {item?.description}
                  </p>
                  <p className="price">{item?.price}$</p>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}

export default ProductCard;
