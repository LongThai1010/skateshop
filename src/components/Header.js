import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getUserCart } from "../features/user/userSlice";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";

import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const userCartState = useSelector((state) => state?.user?.getcartproducts);
  const wishlistState = useSelector((state) => state?.user?.wishlist?.wishlist);
  const productState = useSelector((state) => state?.product?.product);

  const cartState = useSelector((state) => state.cart.cartItems);

  // console.log(userState);
  const [productOpt, setProductOpt] = useState([]);
  const [total, setTotal] = useState(null);
  const [paginate, setPaginate] = useState(true);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum =
        sum +
        Number(userCartState[index].quantity) * userCartState[index].price;
      setTotal(sum);
    }
  }, [userCartState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, title: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
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
    dispatch(getUserCart(config2));
  }, []);

  return (
    <>
      {/* <header className="header-top-strip py-1">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">Free shipping over 100$</p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:{" "}
                <a className="text-white" href="tel:+84 0905632492">
                  +84 0905632492
                </a>
              </p>
            </div>
          </div>
        </div>
      </header> */}
      <header className="header home-wrapper-1">
        <div className="container-xxl">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-icon-bar">
              <HiOutlineBars3CenterLeft
                className="icon-header"
                onClick={() => setSidebar(!sidebar)}
              />
            </div>
            <div>
              <Link className="header-logo" to="/">
                <img
                  src="images/logo-gd-fix.png"
                  alt="Logo"
                  width={60}
                  height={60}
                />
                <span>GD HOMIES</span>
              </Link>
            </div>
            <div>
              <div className="input-group ">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log("Results paginated")}
                  onChange={(seleted) => {
                    navigate(`/product/${seleted[0]?.prod}`);
                  }}
                  options={productOpt}
                  paginate={paginate}
                  minLength={5}
                  labelKey={"title"}
                  placeholder="Search for product..."
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div>
              <div className="header-upper-links d-flex gap-15 align-items-center">
                <div className="header-icon-wishlist">
                  <Link to="/wishlist" className="d-flex align-items-center ">
                    <AiOutlineHeart className="icon-header" />
                    <span className="badge text-danger sub-wishlist">
                      {wishlistState?.length ? wishlistState.length : <></>}
                    </span>
                  </Link>
                </div>
                <div>
                  <Link
                    to={userState?.user === null ? "/login" : "/my-profile"}
                    className="d-flex align-items-center  flex-column text-white icon-user"
                  >
                    <AiOutlineUser className="icon-header" />
                    {userState?.user === null ? (
                      <></>
                    ) : (
                      <p className="mb-0 text-dark">
                        {/* welcome, {userState?.user?.firstname} */}
                      </p>
                    )}
                  </Link>
                </div>

                <div className="header-icon">
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <AiOutlineShoppingCart className="icon-header" />

                    <span className="badge text-danger sub-total">
                      {cartState?.length ? cartState.length : <></>}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row ">
            <div className="col-12 d-flex justify-content-center">
              <div className="menu-links">
                <div className="d-flex align-items-center gap-15">
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/product">Store</NavLink>
                  <NavLink to="/contact">Contact</NavLink>
                  <NavLink to="/my-orders">My orders</NavLink>

                  {userState.user ? (
                    <button
                      onClick={handleLogout}
                      to="/logout"
                      type="button"
                      className="border border-0 bg-transparent text-white"
                    >
                      Logout
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={sidebar ? "navbar-ui active" : "navbar-ui"}>
        <nav>
          <ul onClick={() => setSidebar(!sidebar)}>
            <li>
              <Link to="/product">Our Store</Link>
            </li>
            <li>
              <Link to="/wishlist">wishlist</Link>
            </li>

            <li>
              <Link to="/my-orders">Orders</Link>
            </li>

            <li>
              <Link to="/login">Login</Link>
            </li>
            {userState.user ? (
              <button
                onClick={handleLogout}
                to="/logout"
                type="button"
                className="border border-0 bg-transparent text-white"
              >
                <li>
                  <Link to="/">Logout</Link>
                </li>
              </button>
            ) : (
              <></>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Header;
