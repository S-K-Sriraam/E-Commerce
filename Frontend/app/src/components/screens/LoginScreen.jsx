import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../../actions/userActions";

function LoginScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [message, setMessage] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const handleClose = () => setMessage(false);
  useEffect(() => {
    if (userInfo) {
      navigate("/" );
    }
  }, [userInfo, redirect, navigate]);
  const [formValues, setFromValues] = useState({ email: "", password: "" });
  const [formErrors, setFromErrors] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFromValues({ ...formValues, [name]: value });
    validateField(name, value);
  };
  const getValidationClass = (name) => {
    if (formValues[name] === "") return "";
    return formErrors[name] ? "is-invalid" : "is-valid";
  };
  const clearForm = () => {
    setFromValues({ email: "", password: "" });
  };
  const isFormValid = () => {
    return (
      Object.values(formErrors).every((error) => error === null) &&
      Object.values(formValues).every(
        (value) => value !== "" && value !== false
      )
    );
  };
  
  const validateField = (name, value) => {
    let errorMessage = null;
    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = "Invalid email format...";
        }
        break;
      case "password":
        if (value.length < 6) {
          errorMessage = "Password must be atleast 6 characters...";
        }
        break;
      default:
        break;
    }
    setFromErrors({ ...formErrors, [name]: errorMessage });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(formValues.email, formValues.password));
    clearForm();
  };

  useEffect(() => {
    if(userInfo) {
      navigate("/")
    }
  },[userInfo,navigate])

  return (
    <>
      <Container>
        <Row>
          <Col md="3"></Col>
          {loading ? (
            <Loader />
          ) : (
            <Col md="6">
              <Form onSubmit={submitHandler}>
                <br /> <h3 className="text-center">Login Here</h3>
                {/* instead of using <div className="form-group" for="name"></div> in HTMl we use 'Form.Group'*/}
                {error && (
                  <Message variant="danger" onClose={handleClose}>
                    {error}
                  </Message>
                )}
                {message && (
                  <Message variant="success" onClose={handleClose}>
                    {message}
                  </Message>
                )}
                <Form.Group controlId="email" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your Email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    isInvalid={!!formErrors.email}
                    className={getValidationClass("email")}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="pass1" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your Password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    isInvalid={!!formErrors.password}
                    className={getValidationClass("password")}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  className="mt-3"
                  variant="success"
                  type="submit"
                  disabled={!isFormValid()}
                >
                  Login
                </Button>
              </Form>
              <Row className="py-3">
                <Col>
                  New User?
                  <Link to="/signup">Signup</Link>
                </Col>
              </Row>
            </Col>
          )}
          <Col md="3"></Col>
        </Row>
      </Container>
    </>
  );
}
export default LoginScreen;