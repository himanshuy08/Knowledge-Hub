import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./feature.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const ourFeature = [
  {
    id: 1,
    title: "Access from Anywhere",
    icon:faLocationDot ,
    desc: "Learn from anywhere in the world, at any time, and on any device with our online learning platform."
  },
  {
    id: 2,
    title: "Access Anytime 24/7",
    icon: faClock,
    desc: "Learn on your own time with our online learning platform, available 24/7 for flexible and convenient access."
  },
  {
    id: 3,
    title: "Flexible Learning Schedule",
    icon: faCalendar,
    desc: "Choose from a wide range of courses and learn at your own pace with our online learning platform, designed to meet your unique educational needs."
  },
];

const ServiceItem = ({ item }) => (
  <Col lg="4" md="4" sm="6" className="mb-3 text-center">
    <div className="service__item">
      <span className="mb-3 d-inline-block">
        <FontAwesomeIcon icon={item.icon} />
      </span>
      <h6>{item.title}</h6>
      <p className="section__description">{item.desc}</p>
    </div>
  </Col>
);

const Feature = () => {
  return (
    <Container className="features">
      <Row>
        <Col lg="12" className="mb-5 text-center">
          <h6 className="section__subtitle">See our</h6>
          <h2 className="section__title">Exciting Features</h2>
        </Col>
      </Row>
      <Row>
        {ourFeature.map((item) => (
          <ServiceItem item={item} key={item.id} />
        ))}
      </Row>
    </Container>
  );
};

export default Feature;
