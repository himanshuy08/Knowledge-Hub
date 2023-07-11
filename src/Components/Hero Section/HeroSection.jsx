import React from "react";
import { Col, Container, Row } from "reactstrap"
import heroImg from '../../assets/online.jpg'
import './herosection.css'
const HeroSection = () => {
  return (
    <Container>
      <Row>
        <Col lg="6">
          <div className="hero-content">
            <h2 className="mb-4 hero-title">
              Learn from Anywhere:
              <br /> Access Our Online Learning
              <br /> Platform on-the-go .
            </h2>
            <p className="mb-5 ">
              Our online learning platform allowing you to learn from anywhere
              and on-the-go. <br/>Join us today to access our online learning
              platform and keep learning , <br/>no matter where you are.
            </p>
          </div>
        </Col>
        <Col lg="6">
            <img src={heroImg} alt="" className="w-100"/>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;
