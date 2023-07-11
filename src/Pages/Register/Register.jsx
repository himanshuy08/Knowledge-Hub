import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button, Input } from "reactstrap";
import { Snackbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import registerImage from "../../assets/register.jpg";
import "./register.css";
import { auth, storage } from "../../Firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile, fetchSignInMethodsForEmail } from "firebase/auth";
import { ref, uploadBytes } from "firebase/storage";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleRegister = () => {
    // Check if email is already registered
    fetchSignInMethodsForEmail(auth, email)
      .then((signInMethods) => {
        if (signInMethods.length > 0) {
          setShowSnackbar(true);
          return;
        }

        
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;

            if (image) {
              const storageRef = ref(storage, `users/${user.uid}/profileImage`);
              uploadBytes(storageRef, image).then(() => {
              
              });
            }

            updateProfile(user, {
              displayName: name,
              photoURL: `users/${user.uid}/profileImage`,
            })
              .then(() => {
              
                navigate("/dashboard");
              })
              .catch((error) => {
                console.log(error.message);
              });
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log("Error checking email registration:", error);
      });
  };

  return (
    <Container fluid className="register-main">
      <Row className="d-flex align-items-center justify-content-center register-content">
        <Col md={6}>
          <img src={registerImage} alt="Register" className="img-fluid" />
        </Col>
        <Col md={6} className="d-flex">
          <div className="text-center">
            <h1 className="mb-4">
              Create an Account on Knowledge{" "}
              <span style={{ color: "#fe6532" }}>Hub</span>
            </h1>
            <h6 className="mb-4">Enter Your Details to Register</h6>
            <Form>
              <FormGroup className="m-3">
                <div className="input-icon">
                  <i className="ri-user-line"></i>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={handleNameChange}
                    className="register-input-icon"
                    autoComplete="off"
                  />
                </div>
              </FormGroup>
              <FormGroup className="m-3">
                <div className="input-icon">
                  <i className="ri-mail-line"></i>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={handleEmailChange}
                    className="register-input-icon"
                    autoComplete="off"
                  />
                </div>
              </FormGroup>
              <FormGroup className="m-3">
                <div className="input-icon">
                  <i className="ri-lock-line"></i>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="register-input-icon"
                    autoComplete="off"
                  />
                </div>
              </FormGroup>
              <FormGroup className="m-3">
                <div className="input-icon">
                  <i className="ri-image-line"></i>
                  <Input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="register-input-icon"
                  />
                </div>
              </FormGroup>
              <Button
                color="primary"
                style={{ width: 480 }}
                onClick={handleRegister}
              >
                Register
              </Button>
            </Form>
            <p style={{ marginTop: 30 }}>
              Already have an account?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                Log In
              </Link>
            </p>
            <Snackbar
              open={showSnackbar}
              autoHideDuration={4000}
              onClose={handleSnackbarClose}
              message="Email is already registered. Please use a different email."
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
