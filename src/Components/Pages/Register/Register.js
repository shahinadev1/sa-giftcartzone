import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit" to="/">
        {window.location.hostname}
      </Link>
      {new Date().getFullYear()}
      {". "}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const location = useLocation();
  const url = location.state || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isLoading, googleSignIn, createAccount } = useAuth();
  const formSubmit = (data) => {
    const newData = { ...data };
    newData.route = "/";
    createAccount(newData);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(formSubmit)}
            sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  {...register("fullName", { required: true })}
                  label="Full Name"
                  autoFocus
                />
                {errors.fullName && (
                  <p className="text-danger">This filed is required.</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  id="email"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                  })}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-danger">This filed is required.</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  {...register("password", { required: true })}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                {errors.password && (
                  <p className="text-danger">This filed is required.</p>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="center" flexDirection="column">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
              <p className="text-center d-block">OR</p>
              <Button
                onClick={() => googleSignIn({ route: url })}
                variant="contained"
                disabled={isLoading}>
                Continue with
                <span>
                  <GoogleIcon
                    style={{ fontSize: "18px", marginLeft: "10px" }}
                  />
                </span>
              </Button>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
