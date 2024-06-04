import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo1 from "../assets/logo 1.png";
import twitter from "../assets/twitter.png";
import instagram from "../assets/instagram.png";
import facebook from "../assets/facebook.png";

export const Footer = () => {
  return (
    <>
      <div className="container">
        <footer
          className="d-flex flex-wrap justify-content-between align-items-center py-3"
          style={{ borderTop: "1px solid rgba(70, 43, 146, 0.50)" }}
        >
          <div className="col-md-4 d-flex align-items-center">
            <a
              href="/"
              className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
            >
              <img src={logo1} height="75" />
            </a>
            <span
              className="mb-3 mb-md-0"
              style={{
                fontSize: "12px",
                color: "#8B70B9",
                margin: "35px auto auto -33px",
              }}
            >
              © 2024 http_status_ok
            </span>
          </div>

          <div
            className="d-flex flex-column flex-sm-row w-20 gap-2"
            style={{ width: "460px", marginRight: "-50px" }}
          >
            <label htmlFor="newsletter1" className="visually-hidden">
              Email address
            </label>
            <input
              id="newsletter1"
              type="text"
              className="form-control"
              placeholder="Email address"
              style={{
                borderColor: "#8540F5",
                borderRadius: "20px",
                width: "240px",
                fontSize: "14px",
                boxShadow: "0px 0px 0px 3px rgba(102, 16, 242, 0.15)",
              }}
            />
            <button
              className="btn btn-primary text-white"
              type="button"
              style={{
                borderColor: "#8540F5",
                backgroundColor: "#7749F8",
                borderRadius: "0px 20px 20px 0px",
                width: "92px",
                fontSize: "14px",
                marginLeft: "-100px",
                paddingBottom: "8px",
              }}
            >
              Subscribe
            </button>

            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
              <li className="ms-3">
                <a className="text-body-secondary" href="https://twitter.com">
                  <img src={twitter} height="32" />
                </a>
              </li>
              <li className="ms-3">
                <a
                  className="text-body-secondary"
                  href="https://www.instagram.com"
                >
                  <img src={instagram} height="32" />
                </a>
              </li>
              <li className="ms-3">
                <a
                  className="text-body-secondary"
                  href="https://www.facebook.com/"
                >
                  <img src={facebook} height="32" />
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
};
