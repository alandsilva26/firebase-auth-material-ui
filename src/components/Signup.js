import React, { useState } from "react";
import {
  Container,
  TextField,
  Paper,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  OutlinedInput,
  Avatar,
  Grid,
  Box,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import LockIcon from "@material-ui/icons/Lock";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../contexts/AuthContext";
import { useDb } from "../contexts/DatabaseContext";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "transparent",
  },
  form: {
    // width: "80%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Signup() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
    showPassword: false,
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  let { signup, currentUser } = useAuth();
  const { createUser } = useDb();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (values.email.length < 1) {
      setLoading(false);
      return setError("Email address invalid");
    } else if (values.password.length < 1) {
      setLoading(false);
      return setError("Invalid Password");
    }

    try {
      setError("");
      const name = `${values.fname} ${values.lname}`;
      await signup(values.email, values.password, name);
    } catch (e) {
      setError("Failed to create account");
    }

    setLoading(false);

    history.push("/");
  }

  const classes = useStyles();

  const handleChange = (props) => (event) => {
    setValues({ ...values, [props]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container
      maxWidth="xs"
      component="main"
      className={classes.root}
      disableGutters
    >
      <Paper className={classes.paper} elevation={0} variant="outlined">
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="fname"
                type="text"
                label="First Name"
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={handleChange("fname")}
                value={values.fname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="lname"
                type="text"
                label="Last Name"
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={handleChange("lname")}
                value={values.lname}
              />
            </Grid>
          </Grid>
          <TextField
            id="email"
            label="Email"
            type="text"
            margin="normal"
            value={values.email}
            fullWidth
            variant="outlined"
            autoComplete={"email"}
            onChange={handleChange("email")}
          />
          <FormControl variant="outlined" margin="normal" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          {error && (
            <Typography color="error" variant="body1">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
            disabled={loading}
          >
            Sign up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              Already have an account?&nbsp;
              <Link to="/login">{"Sign in"}</Link>
            </Grid>
          </Grid>
          {/* <Box my={2}>
            <Typography variant="button" display="block" align="center">
              OR
            </Typography>
          </Box>
          <Button variant="outlined" size="large" fullWidth>
            Sign in with Google
          </Button> */}
        </form>
      </Paper>
    </Container>
  );
}
