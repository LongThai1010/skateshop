import { Link } from "react-router-dom";

import React from "react";
import Slider from "react-slick";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    // infinite: true,
    // speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
  };
  return (
    <Slider {...settings}>
      <div className="banner">
        <div className="row-1">
          <div className="col-12 col-xl-6">
            <div className="main-banner-1 position-relative ">
              <img
                className="img-banner"
                alt="small-banner"
                src="Banner/banner2.jpg"
              />
              <div className="main-banner-content-1 position-absolute"></div>
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
        </div>
      </div>
      <div className="banner">
        <div className="row-1">
          <div className="col-12 col-xl-6">
            <div className="main-banner-1 position-relative ">
              <img
                className="img-banner"
                alt="small-banner"
                src="Banner/banner6.png"
              />
              <div className="main-banner-content-1 position-absolute"></div>
            </div>
          </div>
          <div className="col-12 col-xl-6">
            <div className="main-banner position-relative ">
              <img
                className="img-banner"
                alt="small-banner"
                src="Banner/banner4.jpg"
              />
              <div className="main-banner-content position-absolute"></div>
            </div>
          </div>
        </div>
      </div>
    </Slider>
  );
}
