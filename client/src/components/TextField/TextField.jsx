// importing dependencies
import React from "react";
import PropTypes from "prop-types";
// ===------------------------------------------

// Material UI components
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

const TextField = ({
  fieldType,
  setValues,
  values,
  inputType,
  handleValue,
  handleValueParam,
  label,
  inputValue,
  htmlFor,
  validationError,
}) => {
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1d1d1d",
      },
      secondary: {
        light: "#1d1d1d",
        main: "#1d1d1d",
      },
    },
  });

  if (fieldType === "text") {
    return (
      <ThemeProvider theme={theme}>
        <FormControl fullWidth variant="outlined" margin={"normal"}>
          <InputLabel htmlFor={htmlFor}>{label}</InputLabel>
          <div className="div">
            <OutlinedInput
              autoComplete="off"
              autoFocus={false}
              color={"secondary"}
              id={htmlFor}
              value={inputValue}
              onChange={handleValue(handleValueParam)}
              label={label}
              type={inputType}
              fullWidth
            />
          </div>
          <p className={validationError ? "error" : null}>{validationError}</p>
        </FormControl>
      </ThemeProvider>
    );
  }

  if (fieldType === "password") {
    return (
      <ThemeProvider theme={theme}>
        <FormControl fullWidth variant="outlined" margin={"normal"}>
          <InputLabel htmlFor={htmlFor}>{label}</InputLabel>
          <OutlinedInput
            fullWidth
            autoComplete="off"
            id={htmlFor}
            type={values.showPassword ? "text" : "password"}
            value={inputValue}
            onChange={handleValue(handleValueParam)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  color="primary"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={inputType}
          />
          <p className={validationError ? "error" : null}> {validationError}</p>
        </FormControl>
      </ThemeProvider>
    );
  }
};

TextField.propTypes = {
  fieldType: PropTypes.string.isRequired,
  setValues: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  inputType: PropTypes.string.isRequired,
  handleValue: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
};

TextField.defaultProps = {
  fieldType: "text",
};

export default TextField;
