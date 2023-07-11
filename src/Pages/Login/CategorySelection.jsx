import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import teacher from "../../assets/teacher.jpg";
import { Link } from "react-router-dom";
import student from "../../assets/student.jpg";
import "./CategorySelection.css";

const CategorySelection = () => {
  return (
    <Container className="mt-4">
      <h2 className="text-center my-4">Category Selection</h2>
      <Row className="justify-content-center">
        <Col md={6} className="mb-4 d-flex justify-content-center">
          <Card className="custom-card">
            <Link to="/AdminLogin">
              <CardImg
                top
                width="100%"
                height="250px"
                src={teacher}
                alt="Category 1"
              />
              <CardBody>
                <CardTitle className="text-center mb-3">Teacher</CardTitle>
              </CardBody>
            </Link>
          </Card>
        </Col>
        <Col md={6} className="mb-4 d-flex justify-content-center">
          <Card className="custom-card">
            <Link to="/LogIn">
              <CardImg
                top
                width="100%"
                height="250px"
                src={student}
                alt="Category 2"
              />
              <CardBody>
                <CardTitle
                  className="text-center "
                  style={{ textDecoration: "None" }}
                >
                  Student
                </CardTitle>
              </CardBody>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CategorySelection;
