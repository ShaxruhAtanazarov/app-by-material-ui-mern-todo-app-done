// importing dependencies
import React, { useContext } from "react";
import { AuthContext } from "context/AuthContext";
// ===------------------------------------------

// importing styles
import "./NavBar.scss";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
// Material UI components

const ResponsiveAppBar = () => {
  const { logOut, isLogin } = useContext(AuthContext);

  return (
    <AppBar position="static" className="nav-bar">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="nav-bar__inner">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            SHAKA'S TODOS
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            SHAKA'S TODOS
          </Typography>
          {isLogin ? (
            <Button onClick={logOut} variant="outlined" color="error">
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
