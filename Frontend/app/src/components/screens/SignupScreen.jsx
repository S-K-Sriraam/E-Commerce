import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { signup } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { Link, useNavigate } from "react-router-dom";

function SignupScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [show, setShow] = useState("fa fa-eye-slash");

  const userSignup = useSelector((state) => state.userSignup);
  const { error, loading, userInfo } = userSignup;
  const handleClose = () => setMessage("");
  const [formValues, setFromValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [formErrors, setFromErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFromValues({
      ...formValues,
      [name]: newValue,
    });
    validateField(name, newValue);
  };

  const getValidationClass = (name) => {
    if (formValues[name] === "") return "";
    return formErrors[name] ? "is-invalid" : "is-valid";
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
      case "firstname":
      case "lastname":
        if (!value) {
          errorMessage = "This field is required...";
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = "Invalid email format...";
        }
        break;

      case "password":
        const minLength = 6;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[_$@*!])[A-Za-z0-9_$@*!]{6,}$/;
        if (value.length < minLength || !passwordRegex.test(value)) {
          errorMessage = "Password must include atleast [1-9][a-z][A-Z][_$@*!..] & 6 Characters";
        }
        break;

      case "confirmPassword":
        if (value !== formValues.password) {
          errorMessage = "Password do not match...";
        }
        break;

      case "termsAccepted":
        if (!value) {
          errorMessage = "You must accept the terms and conditions...";
        }
        break;

      default:
        break;
    }

    setFromErrors({
      ...formErrors,
      [name]: errorMessage,
    });
  };

  const showPassword = () => {
    var x = document.getElementById("pass1");
    var z = document.getElementById("pass2");
    if (x.type === "password" && z.type === "password") {
      x.type = "text";
      z.type = "text";
      setShow(`fa fa-eye`);
    } else {
      x.type = "password";
      z.type = "password";
      setShow(`fa fa-eye-slash`);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      signup(
        formValues.firstname,
        formValues.lastname,
        formValues.email,
        formValues.password
      )
    );
  };

  useEffect(() => {
    if(userInfo) {
      setFromValues({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
      });
      setMessage(userInfo?.details || "Signup successful");
      navigate("/login");
    }
    localStorage.removeItem('userInfo')
  }, [navigate, userInfo])

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
                <br />

                <h3 className="text-center">SignUp Here</h3>
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
                <Form.Group controlId="firstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your First Name"
                    name="firstname"
                    value={formValues.firstname}
                    onChange={handleChange}
                    isInvalid={!!formErrors.firstname}
                    className={getValidationClass("firstname")}
                  ></Form.Control>

                  <Form.Control.Feedback type="invalid">
                    {formErrors.firstname}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="lastname" className="mt-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Last Name"
                    name="lastname"
                    value={formValues.lastname}
                    onChange={handleChange}
                    isInvalid={!!formErrors.lastname}
                    className={getValidationClass("lastname")}
                  ></Form.Control>

                  <Form.Control.Feedback type="invalid">
                    {formErrors.lastname}
                  </Form.Control.Feedback>
                </Form.Group>

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

                <Form.Group className="mb-3">
                  <Form.Label>
                    <span>
                      <i className={show}></i>
                    </span>{" "}
                    Password
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox onClick={showPassword}/>{" "}
                    <Form.Control
                      required
                      type="password"
                      id="pass1"
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                      isInvalid={!!formErrors.password}
                      className={getValidationClass("password")}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <span>
                      <i className={show}></i>
                    </span>{" "}
                    Confirm Password
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox onClick={showPassword}/>{" "}
                    <Form.Control
                      required
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={formValues.confirmPassword}
                      onChange={handleChange}
                      id="pass2"
                      isInvalid={!!formErrors.confirmPassword}
                      className={getValidationClass("confirmPassword")}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.confirmPassword}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Check
                    required
                    label="Agree to terms and conditions"
                    feedback="You must agree before submitting."
                    name="termsAccepted"
                    value={formValues.termsAccepted}
                    checked={formValues.termsAccepted}
                    onChange={handleChange}
                    isInvalid={!!formErrors.termsAccepted}
                    className={getValidationClass("termsAccepted")}
                  />

                  <Form.Control.Feedback type="invalid">
                    {formErrors.termsAccepted}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  className="mt-3"
                  variant="success"
                  type="submit"
                  disabled={!isFormValid()}
                >
                  SignUp
                </Button>
              </Form>
              <Row className="py-3">
                <Col>
                  Already User?
                  <Link to="/login">Login In</Link>
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

export default SignupScreen;
