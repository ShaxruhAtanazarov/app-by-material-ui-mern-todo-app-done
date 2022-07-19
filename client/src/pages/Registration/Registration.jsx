// importing dependencies
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { postApi } from "api/postApi";
import { AuthContext } from "context/AuthContext";
import { get } from "lodash";
// ===------------------------------------------

// importing components
import TextField from "components/TextField";
import Btn from "components/Btn";

// Material UI components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// importing styles
import "assets/styles/Auth.scss";

const Registration = () => {
  const { login } = useContext(AuthContext);
  const [valiadationError, setValidationError] = useState({
    email: "",
    password: "",
  });

  const [registrationValues, setRegistrationValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (prop) => (event) => {
    setRegistrationValues({
      ...registrationValues,
      [prop]: event.target.value,
    });
  };

  const registration = async () => {
    try {
      await postApi("auth/registration", registrationValues).then(
        (response) => {
          login(response.data.token, response.data.userId);
        }
      );
      setRegistrationValues({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      let emailError = null;
      let passwordError = null;
      if (error.errors.length === 2) {
        emailError = get(error.errors[0], "msg", "");
        passwordError = get(error.errors[1], "msg", "");
      }

      if (error.errors.length === 1) {
        passwordError = get(error.errors[0], "msg", "");
      }

      setValidationError({
        email: emailError,
        password: passwordError,
      });
    }
  };

  return (
    <div className="auth">
      <Container maxWidth="xl">
        <div className="auth__title">
          <Typography variant="h2" component="h4">
            Registration
          </Typography>
        </div>
        <div className="auth__form">
          <div className="auth__form-inner">
            <TextField
              fieldType={"text"}
              setValues={setRegistrationValues}
              inputValue={registrationValues.username}
              handleValueParam={"username"}
              values={registrationValues}
              label={"Username"}
              inputType={"text"}
              handleValue={handleChange}
              htmlFor={"username"}
            />
            <TextField
              fieldType={"text"}
              setValues={setRegistrationValues}
              handleValueParam={"email"}
              inputValue={registrationValues.email}
              values={registrationValues}
              label={"E-mail"}
              inputType={"email"}
              handleValue={handleChange}
              htmlFor={"user-email"}
              validationError={valiadationError.email}
            />
            <TextField
              fieldType={"password"}
              setValues={setRegistrationValues}
              inputValue={registrationValues.password}
              handleValueParam={"password"}
              values={registrationValues}
              label={"Password"}
              inputType={"password"}
              handleValue={handleChange}
              htmlFor={"user-password"}
              validationError={valiadationError.password}
            />
          </div>
          <div className="auth__bottom">
            <Btn buttonTitle={"registration"} func={registration} />
            <Link className={"auth__link"} to="/login">
              have an account ?
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Registration;
