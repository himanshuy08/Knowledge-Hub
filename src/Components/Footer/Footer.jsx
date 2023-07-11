import React from "react";
import { Col, Container, Row } from "reactstrap";
import logo from "../../assets/logo.png";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container className="footer-container">
        <Row>
          <Col lg="6" md="6" className="mb-4">
            <img src={logo} alt="Logo" />

            <div className="follows">
              <p className="mb-0">Follow us on social media</p>
              <span>
                {" "}
                <a href="https://www.facebook.com">
                  <i class="ri-facebook-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="https://www.instagram.com">
                  <i class="ri-instagram-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="https://www.linkedin.com">
                  <i class="ri-linkedin-fill"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="https://www.twitter.com">
                  <i class="ri-twitter-fill"></i>
                </a>
              </span>
            </div>
          </Col>

          <Col lg="6" md="6" className="footer-end">
            <div>
            <h6 className="fw-bold">Get in Touch</h6>
            <p>Address: Bilaspur, India<br/>Phone: +91 9898989898<br/>Email: knowledgehub@gmail.com</p>
            </div>
            
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
