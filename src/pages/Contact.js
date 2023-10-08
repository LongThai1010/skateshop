import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

function Contact() {
  return (
    <>
      <div className="row">
        <div className="image-main">
          <img alt="GD HOMIES" src="Banner/gd-main.jpg" />
          <div className="info-overview">
            <p>Start: 05/2020 - present</p>
            <p>Is where I go when I get home from school </p>
            <p>
              Skateboarding has changed my way of life, Make more friends,
              learned many cool things.
            </p>
          </div>
        </div>
      </div>

      <div className="hooh my-5">
        <h1 className="text-center">GD Hooh</h1>
        <div className="hood-image">
          <div>
            <img alt="" src="Banner/hooh-235khuchao.jpg" />
            <p>Hood Bumblebee (past)</p>
          </div>

          <div>
            <img alt="" src="Banner/hooh-chungcuvincoland.jpg" />
            <p>Hood Chung cu vincoland, Van Don, Nai Hien Dong (present)</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
