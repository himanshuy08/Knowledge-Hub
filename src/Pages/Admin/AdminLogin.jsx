

import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import teacher from '../../assets/teacher.jpg';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { auth } from '../../Firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AdminLogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showInvalidCredentialsToast, setShowInvalidCredentialsToast] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Successful login
      const user = userCredential.user;
      localStorage.setItem('email', user.email);
      navigate('/videoupload');
    } catch (error) {
      // Failed login
      setShowInvalidCredentialsToast(true);
    }
  };

  return (
    <Container fluid className="login-main">
      <Row className="d-flex align-items-center justify-content-center login-content">
        <Col md={6}>
          <img src={teacher} alt="Login" className="img-fluid" />
        </Col>
        <Col md={6} className="d-flex">
          <div className="text-center">
            <h1 className="mb-4">
              Welcome to Knowledge <span style={{ color: '#fe6532' }}>Hub</span>
            </h1>
            <h6 className="mb-4">Hey Enter Your Details to Log In to Your Account.</h6>
            <Form onSubmit={handleSubmit}>
              <FormGroup className="m-3">
                <div className="input-icon">
                  <i className="ri-user-line"></i>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={handleEmailChange}
                    className="login-input-icon-username"
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
                    className="login-input-icon-password"
                    autoComplete="off"
                  />
                </div>
              </FormGroup>
              <Button color="primary" style={{ width: 480 }} type="submit">
                Log In
              </Button>
            </Form>
            {showInvalidCredentialsToast && (
              <div className="toast-container">
                <Toast>
                  <ToastHeader toggle={() => setShowInvalidCredentialsToast(false)}>
                    Invalid Credentials
                  </ToastHeader>
                  <ToastBody>
                    The email or password you entered is incorrect. Please try again.
                  </ToastBody>
                </Toast>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLogIn;

