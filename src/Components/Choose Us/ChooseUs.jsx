import React from "react";
import { Col, Container, Row } from "reactstrap";
import chooseus from '../../assets/chooseus.jpg'
import './choose.css'
const ChooseUs = () => {
  return (
    <Container className="choose-section">
      <Row>
        <Col lg="6">
          <div className="choose__content">
            <h2 className="section__title pt-5">Why Choose Us</h2>
            <p className="choose-description">
              Our online learning platform offers a wide range of courses that
              cater to different interests and skill levels, ensuring that there
              is something suitable for everyone. Our courses are regularly
              updated to ensure that the content is current and relevant to the
              latest industry trends and developments. Using advanced
              technology, our platform offers personalized learning,
              recommending courses and topics based on learners' interests and
              learning style. With a user-friendly interface, our platform is
              easy to navigate, and resources are easy to find. Additionally,
              our platform is accessible from any device with an internet
              connection, providing learners with the freedom to learn anytime,
              anywhere.
            </p>
            <ul className="choose-list">
              <li>Up-to-Date Content</li>
              <li>Personalized Learning</li>
              <li>User-Friendly Interface</li>
              <li>Accessible Anytime, Anywhere</li>
            </ul>
          </div>
        </Col>
        <Col lg="6">
            <img src={chooseus} alt="Choose Us Logo" className="w-100"/>
        </Col>
      </Row>
    </Container>
  );
};

export default ChooseUs;
