import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import forgot from '../../assets/forgotpassword.png';
import { auth,sendPasswordResetEmail} from '../../Firebase/firebase';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false); // State to track if the reset email has been sent

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = async () => {
    try {
      // Call the Firebase function to send a reset password email
      await sendPasswordResetEmail(auth,email); // Corrected function name
      setResetEmailSent(true); // Set state to indicate that the reset email has been sent
    } catch (error) {
      console.error('Error sending reset password email:', error);
    }
  };

  return (
    <Container fluid className="login-main">
      <Row className="d-flex align-items-center justify-content-center login-content">
        <Col md={6}>
          <img src={forgot} alt="Forgot Password" className="img-fluid" />
        </Col>
        <Col md={6} className="d-flex">
          <div className="text-center">
            <h1 className="mb-4">Forgot Your Password?</h1>
            {resetEmailSent ? ( // Show a message if the reset email has been sent
              <p className="mb-4">A password reset email has been sent to your email address.</p>
            ) : (
              <p className="mb-4">Enter your email address to reset your password.</p>
            )}
            <Form>
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
                    autoComplete="off"
                    style={{ width: 480 }}
                    required
                  />
                </div>
              </FormGroup>
              <Button
                color="primary"
                style={{ width: 480 }}
                onClick={handleResetPassword}
                disabled={resetEmailSent} // Disable the button when the reset email has been sent
              >
                {resetEmailSent ? 'Email Sent' : 'Reset Password'}
              </Button>
            </Form>
            <p className="mt-2 text-end">
              <Link to="/login" style={{ textDecoration: 'none' }}>
                Back to Login
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
