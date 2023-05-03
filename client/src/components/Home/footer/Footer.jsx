import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="container"></div>
      <footer>
        {/* Footer main  */}
        <section className="ft-main">
          <div className="ft-main-item">
            <h2 className="ft-title">About</h2>
            <ul>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">News</a>
              </li>
              <li>
                <a href="#">Partnerships</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div className="ft-main-item">
            <h2 className="ft-title">Support</h2>
            <ul>
              <li>
                <a href="#">Help & Support</a>
              </li>
              <li>
                <a href="#">Trust & Safety</a>
              </li>
              <li>
                <a href="#">Teaching on EduCrat</a>
              </li>
              <li>
                <a href="#">Learning on EduCrat</a>
              </li>
            </ul>
          </div>
          <div className="ft-main-item">
            <h2 className="ft-title">Contact</h2>
            <ul>
              <li>
                <a href="#">Help</a>
              </li>
              <li>
                <a href="#">Sales</a>
              </li>
              <li>
                <a href="#">Advertise</a>
              </li>
              <li>
                <a href="#">Webinars</a>
              </li>
              <li>
                <a href="#">Bolgs</a>
              </li>
            </ul>
          </div>
          <div className="ft-main-item">
            <h2 className="ft-title">Resources</h2>
            <ul>
              <li>
                <a href="#">Docs</a>
              </li>
              <li>
                <a href="#">eBooks</a>
              </li>
              <li>
                <a href="#">Portfolio</a>
              </li>
              <li>
                <a href="#">Learn</a>
              </li>
              <li>
                <a href="#">EduCrat Guides</a>
              </li>
            </ul>
          </div>
          <div className="ft-main-item_email">
            <h2 className="ft-title">Stay Updated</h2>
            <p>Subscribe to our newsletter to get our latest news.</p>
            <form>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
              />
              <input type="submit" value="Subscribe" />
            </form>
          </div>
        </section>

        {/* Footer social  */}
        <section className="ft-social">
          <ul className="ft-social-list">
            <li>
              <a href="#">
                <div></div>
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src="./Images/Icons/facebook_icon.png"
                  className="img-fluid"
                  alt="logo"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src="./Images/Icons/instagram_icon.png"
                  className="img-fluid"
                  alt="logo"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src="./Images/Icons/twitter_icon.png"
                  className="img-fluid"
                  alt="logo"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src="./Images/Icons/linkedin_icon.png"
                  className="img-fluid"
                  alt="logo"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src="./Images/Icons/youtube_icon.png"
                  className="img-fluid"
                  alt="logo"
                />
              </a>
            </li>
          </ul>
        </section>

        {/* Footer legal  */}
        <section className="ft-legal">
          <li>&copy; 2022 Copyright EduCrat Inc.</li>
        </section>
      </footer>
    </>
  );
};

export default Footer;
