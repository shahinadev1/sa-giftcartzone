import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import GoogleIcon from "@mui/icons-material/Google";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useLocation, Navigate } from "react-router-dom";

import useAuth from "../../../Hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        {window.location.hostname}
      </Link>
      {". "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();
export default function Login() {
  const { user, isLoading, loginWithEmailAndPassword, message, googleSignIn } =
    useAuth();
  const location = useLocation();

  const url = location.state || "/";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const formSubmit = (data) => {
    if (loginWithEmailAndPassword({ ...data, route: url })) {
      return <Navigate to={url} />;
    } else {
      return <Navigate to={url} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ backgroundColor: "#fff" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(formSubmit)}
            noValidate
            autoComplete="off"
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
              })}
              autoComplete="email"
              autoFocus
            />
            {errors.email && (
              <p className="text-danger">This filed is required.</p>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", { required: true })}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {errors.password && (
              <p className="text-danger">This filed is required.</p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign In
            </Button>
            <Button
              onClick={() => googleSignIn(url)}
              variant="contained"
              className="mx-auto mb-3 d-block"
              disabled={isLoading}
            >
              Continue with
              <span>
                <GoogleIcon style={{ fontSize: "18px", marginLeft: "10px" }} />
              </span>
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/password-reset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
