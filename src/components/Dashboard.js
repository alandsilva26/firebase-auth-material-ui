import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {
  Box,
  Card,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import { AccountCircle, MoreVert as MoreVertIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDb } from "../contexts/DatabaseContext";

const useStyles = makeStyles((theme) => ({
  appBarTitle: {
    flexGrow: 1,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const { currentUser, logout } = useAuth();
  const { createUser } = useDb();
  const [error, setError] = React.useState("");
  const history = useHistory();

  async function handleLogout() {
    setError("");
    await logout();
    history.push("/login");
    try {
    } catch (e) {
      setError("Failed to logout");
    }
  }

  return (
    <>
      <AppBar color="primary">
        <Toolbar>
          <Typography variant="h6" className={classes.appBarTitle}>
            Dashboard
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            // onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container maxWidth="sm">
        <Box my={2}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="initial">
                Profile
              </Typography>
            </CardContent>
            <CardHeader
              avatar={<Avatar aria-label=""></Avatar>}
              // action={
              //   <IconButton aria-label="">
              //     <MoreVertIcon />
              //   </IconButton>
              // }
              title={currentUser.displayName}
              subheader={currentUser.email}
            />

            <CardContent></CardContent>
          </Card>
          <Box my={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleLogout}
              fullWidth
            >
              Log Out
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
