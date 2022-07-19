// importing dependencies
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { postApi } from "api/postApi";
import { AuthContext } from "context/AuthContext";
import { get } from "lodash";
// ===------------------------------------------

// importing components
import TextField from "components/TextField";
import Btn from "components/Btn/Btn";

// Material UI components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// importing styles
import "assets/styles/Auth.scss";

const Login = () => {
  const { login } = useContext(AuthContext);
  
  const [valiadationError, setValidationError] = useState({
    email: "",
    password: "",
  });

  const [loginValues, setLoginValues] = useState({
    password: "",
    email: "",
  });

  const [userNetFoundError, setUserNetFoundError] = useState("");

  const handleChange = (prop) => (event) => {
    setLoginValues({ ...loginValues, [prop]: event.target.value });
  };

  const loginHandler = async () => {
    try {
      await postApi("auth/login", loginValues).then((response) =>
        login(response.data.jwtToken, response.data.userId)
      );
      setLoginValues({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
      setUserNetFoundError(error.message);

      let emailError = null;
      let passwordError = null;

      if (!!error.errors) {
        if (error.errors.length === 2) {
          emailError = get(error.errors[0], "msg", "");
          passwordError = get(error.errors[1], "msg", "");
        }

        if (error.errors.length === 1) {
          passwordError = get(error.errors[0], "msg", "");
        }
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
            Login
          </Typography>
        </div>
        <form className="auth__form">
          <div className="auth__form-inner">
            <TextField
              fieldType={"text"}
              setValues={setLoginValues}
              inputValue={loginValues.email}
              handleValueParam={"email"}
              values={loginValues}
              label={"E-mail"}
              inputType={"text"}
              handleValue={handleChange}
              htmlFor={"user-email"}
              validationError={valiadationError.email}
            />
            <TextField
              fieldType={"password"}
              setValues={setLoginValues}
              inputValue={loginValues.password}
              handleValueParam={"password"}
              values={loginValues}
              label={"Password"}
              inputType={"password"}
              handleValue={handleChange}
              htmlFor={"user-password"}
              validationError={valiadationError.password}
            />
            <p className="error">{userNetFoundError}</p>
          </div>
          <div className="auth__bottom">
            <Btn func={loginHandler} buttonTitle={"Login"} />
            <Link className={"auth__link"} to="/registration">
              Don't have an account ?
            </Link>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Login;
