// importing dependencies
import React from "react";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
// ===------------------------------------------

const Btn = ({ buttonTitle, func, disabledBtn }) => {
  return (
    <Button
      className="auth__btn"
      variant="contained"
      size="large"
      onClick={func}
      disabled={disabledBtn ? true : false}
    >
      {buttonTitle}
    </Button>
  );
};

Btn.propTypes = {
  buttonTitle: PropTypes.string,
  func: PropTypes.func,
};

export default Btn;
