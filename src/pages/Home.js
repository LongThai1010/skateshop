import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { serverices } from "../utils/Data";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../features/product/productSlice";
import { useEffect, useState } from "react";
import { dataBrand } from "../utils/DataBrands";
import Loading from "react-loading";
import { Slideshow } from "../components/Slideshow";
import Slider from "../components/Slider";

function Home() {
  const productState = useSelector((state) => state.product.product);
  const loadingProduct = useSelector((state) => state.product.isLoading);
  const dispatch = useDispatch();

  const getProducts = () => {
    dispatch(getAllProduct());
  };

  console.log(loadingProduct);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {/* <Slider /> */}
      {/* <Slideshow></Slideshow> */}
      <div className="banner">
        <div className="row-1">
          <div className="col-12 col-xl-6">
            <div className="main-banner-1 position-relative ">
              <img
                className="img-banner"
                alt="small-banner"
                src="Banner/banner2.jpg"
              />
              <div className="main-banner-content-1 position-absolute">
                <h4>GD HOMIES</h4>

                <Link to={`/contact`} className="button">
                  Follow Me
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-xl-6">
            <div className="main-banner position-relative ">
              <img
                className="img-banner"
                alt="small-banner"
                src="Banner/banner3.jpg"
              />
              <div className="main-banner-content position-absolute">
                <h4>GO SKATEBOARDING WITH HOMIES</h4>
                <h5>DA NANG</h5>
                <Link to={`/product`} className="button">
                  Shoping Now
                </Link>
              </div>
            </div>
          </div>
          {/* <div className="col-12 col-xl-6">
            <div className="banner-small">
              <div className="small-banner position-relative">
                <img
                  className="img-fluid rounded-3"
                  alt="small-banner"
                  src="Banner/banner2.jpg"
                />
                <div className="small-banner-content position-absolute"></div>
              </div>

              <div className="small-banner position-relative">
                <img
                  className="img-fluid rounded-3"
                  alt="small-banner"
                  src="Banner/banner4.jpg"
                />
                <div className="small-banner-content position-absolute"></div>
              </div>

              <div className="small-banner position-relative">
                <img
                  className="img-fluid rounded-3"
                  alt="small-banner"
                  src="Banner/banner1.jpg"
                />
              </div>

              <div className="small-banner position-relative">
                <img
                  className="img-fluid rounded-3"
                  alt="small-banner"
                  src="Banner/banner5.jpg"
                />
                <div className="small-banner-content position-absolute"></div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <Container class1="home-wrapper-2 py-5 mt-5">
        <div className="row">
          <div className="col-12 col-xl-12">
            <div className="service">
              {serverices?.map((item, index) => {
                return (
                  <div className="service-item" key={index}>
                    <img src={item.image} alt="" />
                    <div>
                      <h6>{item.title}</h6>
                      <p>{item.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      <Container class1="featured-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          {loadingProduct ? <Loading color="black" type="cubes" /> : ""}
          <ProductCard data={productState} />
        </div>
      </Container>

      <Container class1="marque-wrapper py-5 my-3 home-wrapper-1">
        {/* <h5 className="col-12 text-center">Sponsor Brands </h5> */}
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper ">
              <Marquee className="d-flex">
                {dataBrand?.map((item, index) => {
                  return (
                    <>
                      <div key={index} className="mx-4 w-50">
                        <img src={item?.image} alt="brand" />
                      </div>
                    </>
                  );
                })}
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

      {/* <Container class1="special-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Product</h3>
          </div>
          <div className="row">
            <SpecialProduct />
            <SpecialProduct />
            <SpecialProduct />
          </div>
        </div>
      </Container> */}

      <Container class1="polular-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Polular our Product</h3>
          </div>
          {loadingProduct ? <Loading color="black" type="cubes" /> : ""}
          <ProductCard data={productState} />
        </div>
        <div className="row"></div>
      </Container>

      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Lasted Blog</h3>
          </div>
          <BlogCard />
        </div>
      </Container>
    </>
  );
}

export default Home;
