import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { getUserProductWishlist } from "../features/user/userSlice";
import { useEffect } from "react";
import { addToWishlist } from "../features/product/productSlice";
import { Link } from "react-router-dom";

function WishList() {
  const dispatch = useDispatch();
  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist());
  };

  useEffect(() => {
    getWishlistFromDb();
  }, []);
  const wishlistState = useSelector((state) => state.user?.wishlist?.wishlist);
  console.log(wishlistState);
  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300);
  };
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <div className="wishlist-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            {wishlistState?.length === 0 && (
              <div className="text-center fs-3">No wishList product!</div>
            )}
            {wishlistState?.map((item, index) => {
              return (
                <div className="col-3" key={index}>
                  <Link to={`/product/${item?._id}`}>
                    <div className="wishlist-card position-relative">
                      <img
                        className="position-absolute cross img-fluid"
                        src="images/cross.svg"
                        alt="cross"
                        onClick={() => {
                          removeFromWishlist(item?._id);
                        }}
                      />
                      <div className="wishlist-card-image bg-white">
                        <img
                          className=" d-block mx-auto"
                          src={item?.images[0]?.url}
                          alt="watch"
                        />
                      </div>
                      <div className="bg-white p-3">
                        <h5 className="wishlist-tilte">{item?.title}</h5>
                        <h6 className="wishlist-price">{item?.price}$</h6>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default WishList;
