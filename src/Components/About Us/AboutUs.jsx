
import React from "react";
import { Col, Container, Row } from "reactstrap";
import about from '../../assets/about.jpg'
import './about.css'
const AboutUs = () => {
  return (
    <Container className="about-section">
      <Row>
        <Col lg="6">
          <img src={about} alt="" className="w-100" />
        </Col>
        <Col lg="6">
          <div className="about__section-content ">
            <h4 className="section__subtitle">About Us</h4>
            <h2 className="section__title">Welcome to Knowledge Hub</h2>
            <p className="section__description pt-3">
            At Knowledge Hub, we believe that education should be accessible to everyone. That's why we have created an online learning platform that makes it easy for learners to access courses anytime, anywhere, and on any device.<br/> Our courses are designed to be flexible, engaging, and practical, so that learners can achieve their learning goals and advance their careers. Join us today and experience the benefits of personalized and accessible online learning.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
