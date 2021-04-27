import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { postDataAndImage, getData, postData } from "../FetchNodeServices";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/images/tracking.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [getAdminId, setAdminid] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getAlert, setAlert] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault()
    var body = { adminid: getAdminId, password: getPassword };
    var result = await postData("admin/checklogin", body);
    if (result.length == 1) {
      //console.log(props)
      // alert(true)
      localStorage.setItem(
        "admin",
        JSON.stringify({ adminid: result[0].adminid })
      );
      //props.history.replace({pathname:`/Dashboard`,admin:result[0]})
      //value can't given because it will only get when admin will Signin So LocalStorage will use
      props.history.replace({ pathname: `/Dashboard` });
    } else {
      setAlert(true);
    }
  };

  function AlertMsg() {
    return (
      <div>
        {getAlert ? (
          <div w>
            <Alert
              style={{ width: 370, margin: 5 }}
              variant="filled"
              severity="error"
            >
              Invalid Id / Password
            </Alert>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }

  return (
    <div class="sidebar-condensed account2" style={{ height: "1000px" }}>
      // {/* <Grid container component="main" className={classes.root}> */}
      {/* BEGIN LOGIN BOX */}
      <div class="container" id="login-block">
        <i class="user-img icons-faces-users-03"></i>
        <div
          class="account-info"
          style={{
            backgroundImage: "url(" + "../images/tracking.png" + ")",
            padding: 0,
            backgroundSize: "cover",
          }}
        >
          {/* <img src="/images/tracking.png" style={{ width: "100%" }} /> */}
        </div>
          <div class="account-form">
            <form class="form-signin" role="form" onSubmit={handleSubmit}>
              <img src="/images/91logo.png" style={{ width: "100%" }} />
              <h3>
                <strong>Sign in</strong> to your account
              </h3>
              <div class="append-icon">
                <input
                  type="text"
                  id="adminid"
                  class="form-control form-white username"
                  placeholder="Username"
                  required
                  onChange={(event) => setAdminid(event.target.value)}
                  autoComplete="admin"
                />
                <i class="icon-user"></i>
              </div>
              <div class="append-icon m-b-20">
                <input
                  type="password"
                  class="form-control form-white password"
                  placeholder="Password"
                  required
                  id="password"
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
                <i class="icon-lock"></i>
              </div>
              <button
                style={{ width: "100%" }}
                type="submit"
                id="submit-form"
                class="btn btn-lg btn-dark btn-rounded ladda-button"
                data-style="expand-left"
              >
                Sign In
              </button>
            </form>
          </div>
      </div>
      {/* END LOCKSCREEN BOX */}
      {/* <CssBaseline /> */}
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="adminid"
              label="Admin Id"
              autoComplete="admin"
              onChange={(event)=>setAdminid(event.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              onChange={(event)=>setPassword(event.target.value)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={()=>handleSubmit()}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {AlertMsg()}
            
            <Box mt={5}>
              <Copyright />
            </Box>
        </div>
      </Grid> */}
      // {/* </Grid> */}
    </div>
  );
}
