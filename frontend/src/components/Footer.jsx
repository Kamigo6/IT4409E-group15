import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconTelephone } from "bootstrap-icons/icons/telephone.svg";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconBriefcase } from "bootstrap-icons/icons/briefcase.svg";
import { ReactComponent as IconBadgeAd } from "bootstrap-icons/icons/badge-ad.svg";
import { ReactComponent as IconGift } from "bootstrap-icons/icons/gift.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faInstagram,
  faYoutube,
  faApple,
  faWindows,
  faAndroid,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <React.Fragment>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <footer>
        <div className="container-fluid bg-primary">
          <div className="row ">
            <div className="col-md-9 py-3 text-white">
              Get connected with us on social networks!
            </div>
            <div className="col-md-3 py-3 text-center text-white">
              <a href="https://twitter.com/" target="_blank" title="Twitter">
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="text-light ms-3 me-3"
                />
              </a>
              <a href="https://www.facebook.com/" target="_blank" title="Facebook">
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className="text-light me-3"
                />
              </a>
              <a href="https://www.instagram.com/" target="_blank" title="Instagram">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-light me-3"
                />
              </a>
              <a href="https://www.youtube.com/" target="_blank" title="Youtube">
                <FontAwesomeIcon icon={faYoutube} className="text-light me-3" />
              </a>
            </div>
          </div>
        </div>
        <div className="container-fluid bg-dark text-white">
          <div className="row ">
            <div className="col-md-3 py-3">
              <div className="h6">Bookstore 15</div>
              <hr />
              <p>
                Bookstore 15 is a haven for book lovers and a treasure trove of knowledge and imagination. It is a place where the tangible magic of books comes alive, offering a unique experience for readers and seekers of knowledge. Stepping into a bookstore, one is greeted by rows upon rows of shelves, filled with books of various genres, enticing covers, and intriguing titles.
              </p>
            </div>
            <div className="col-md-3 py-3">
              <div className="h6">Categories</div>
              <hr />
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/category/business-finance"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Business & Finance
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/category/fiction"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Fiction
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/category/health-fitness"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Health & Fitness
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/category/history-archaeology"
                    className="text-decoration-none text-white stretched-link"
                  >
                    History & Archaeology
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/category/art-photography"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Art & Photography
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 py-3">
              <div className="h6">Policy</div>
              <hr />
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/support"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Return Policy
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/support"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Terms Of Use
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/support"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Account
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/support"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Privacy
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/support"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Taxes
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 py-3">
              <div className="h6">Address</div>
              <hr />
              <address>
                <strong>HUST, Inc.</strong>
                <br />
                1 Dai Co Viet, Hai Ba Trung
                <br />
                Ha Noi, Viet Nam
                <br />
                <abbr title="Phone">P:</abbr> (123) 456-7890
              </address>
              <div className="h6">Customer Care</div>
              <hr />
              <IconTelephone /> +0900 090 090
              <br />
              <IconEnvelope /> minh.nq205163@sis.hust.edu.vn
            </div>
          </div>
        </div>
        <div className="container-fluid bg-secondary text-white text-center">
          <div className="row">
            <div className="col-md-2 py-2">
              <Link to="/" className="text-white text-decoration-none">
                <IconBriefcase className="text-warning" /> Partner with us
              </Link>
            </div>
            <div className="col-md-2 py-2">
              <Link to="/" className="text-white text-decoration-none">
                <IconBadgeAd className="text-info" /> Advertise
              </Link>
            </div>
            <div className="col-md-2 py-2">
              <Link to="/" className="text-white text-decoration-none">
                <IconGift className="text-dark" /> Gift
              </Link>
            </div>
            <div className="col-md-3 py-2">
              © 2022-{new Date().getFullYear()} bookstore15.com
            </div>
            <div className="col-md-3 py-2 bg-white">
              <img
                src="../../images/payment/american_express.webp"
                width="32"
                alt="American Express"
                className="me-2"
              />
              <img
                src="../../images/payment/maestro.webp"
                width="32"
                alt="Maestro"
                className="me-2"
              />
              <img
                src="../../images/payment/netbanking.webp"
                width="32"
                alt="Net Banking"
                className="me-2"
              />
              <img
                src="../../images/payment/paypal.webp"
                width="32"
                alt="Paypal"
                className="me-2"
              />
              <img
                src="../../images/payment/rupay.webp"
                width="32"
                alt="Rupay"
                className="me-2"
              />
              <img
                src="../../images/payment/upi.webp"
                width="32"
                alt="UPI"
                className="me-2"
              />
              <img
                src="../../images/payment/visa.webp"
                width="32"
                alt="Visa"
                className="me-2"
              />
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};
export default Footer;
