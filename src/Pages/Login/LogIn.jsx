import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import login from "../../assets/login.png";
import "./login.css";
import { auth, googleProvider } from "../../Firebase/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [google, setGoogle] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailPasswordSignIn = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setGoogle(user.email);
        localStorage.setItem("email", user.email);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setGoogle(user.email);
        localStorage.setItem("email", user.email);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setGoogle(userEmail);
    }
  }, []);

  if (google) {
    return navigate("/dashboard");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleEmailPasswordSignIn();
  };

  return (
    <Container fluid className="login-main">
      <Row className="d-flex align-items-center justify-content-center login-content">
        <Col md={6}>
          <img src={login} alt="Login" className="img-fluid" />
        </Col>
        <Col md={6} className="d-flex">
          <div className="text-center">
            <h1 className="mb-4">
              Welcome to Knowledge <span style={{ color: "#fe6532" }}>Hub</span>
            </h1>
            <h6 className="mb-4">Hey Enter Your Details to Log In to Your Account.</h6>
            <Form onSubmit={handleSubmit}>
              <FormGroup className="m-3">
                <div className="input-icon">
                  <i className="ri-user-line"></i>
                  <Input
                    type="email"
                    name="username"
                    id="username"
                    placeholder="Enter Your Email"
                    value={username}
                    onChange={handleUsernameChange}
                    className="login-input-icon-username"
                    autoComplete="off"
                    required
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
                    className="login-input-icon-password"
                    autoComplete="off"
                    required
                  />
                </div>
              </FormGroup>
              <Button color="primary" style={{ width: 480 }} type="submit">
                Log In
              </Button>
            </Form>
            <p className="mt-4">or Sign In with</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {!google && (
                <Button
                  onClick={handleSignInWithGoogle}
                  style={{ backgroundColor: "transparent", width: 480 }}
                >
                  <i className="ri-google-fill" style={{ color: "black" }}>
                    <span style={{ marginLeft: 10 }}>Continue with Google</span>
                  </i>
                </Button>
              )}
            </div>
            <p style={{ marginTop: 30 }}>
              Don't have an account?{" "}
              <Link to="/Register" style={{ textDecoration: "none" }}>
                Sign Up
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LogIn;
