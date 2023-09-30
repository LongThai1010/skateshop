import { BsFacebook, BsGithub, BsLinkedin, BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="footer py-3 home-wrapper-1">
        <div className="container-xxl">
          <div className="row d-flex align-items-center justify-content-between">
            <div className="col-12 col-xl-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="../images/newsletter.png" alt="newsletter" />
                <h5 className="text-white mb-0">Sign up for Skateshop</h5>
              </div>
            </div>
            <div className="col-12 col-xl-5">
              <div className="input-group ">
                <input
                  type="text"
                  class="form-control py-2"
                  placeholder="Search product here..."
                  aria-label="Search product here..."
                  aria-describedby="basic-addon2"
                />
                <span class="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="footer py-3 home-wrapper-1">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 col-xl-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white py-2 ">
                  ADDRESS: KCC B1 Bach Dang Dong, Duong Van Nga, Son Tra, Da
                  Nang
                </address>

                <a
                  href="tel:+84 0905632492"
                  className="mt-2 d-block mb-2 text-white"
                >
                  Hotline: 0905632492
                </a>

                <a
                  href="mailto:volelongthaipnt@gmail.com"
                  className="mt-4 d-block mb-2 text-white"
                >
                  Email: volelongthaipnt@gmail.com
                </a>
                <div className="social-icons d-flex align-items-center gap-30 mt-4">
                  <Link className="text-white" to="#">
                    <BsFacebook className="fs-4" />
                  </Link>

                  <Link className="text-white" to="#">
                    <BsGithub className="fs-4" />
                  </Link>

                  <Link className="text-white" to="#">
                    <BsYoutube className="fs-4" />
                  </Link>

                  <Link className="text-white" to="#">
                    <BsLinkedin className="fs-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-4 col-xl-3 footer-info">
              <h4 className="text-white mb-4">Infomation</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">Private Policy</Link>
                <Link className="text-white py-2 mb-1">Refund Policy</Link>
                <Link className="text-white py-2 mb-1">shipping Policy</Link>
                <Link className="text-white py-2 mb-1">Term & Conditions</Link>
              </div>
            </div>
            <div className="col-4 col-xl-3 footer-info">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">Search</Link>
                <Link className="text-white py-2 mb-1">About Us</Link>
                <Link className="text-white py-2 mb-1">Fag</Link>
                <Link className="text-white py-2 mb-1">Contact</Link>
              </div>
            </div>
            <div className="col-4 col-xl-2 footer-info">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">Clothers</Link>
                <Link className="text-white py-2 mb-1">Deck</Link>
                <Link className="text-white py-2 mb-1">Wheel</Link>
                <Link className="text-white py-2 mb-1">Sticker</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4 footer">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}; Developer by me
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
