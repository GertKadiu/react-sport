import classes from "./Login.module.css";
import Button from "../../UI/Button/Button";
import { Link } from "react-router-dom";
import Input from "../../Components/Input/Input";
import { ButtonTypes } from "../../UI/Button/ButtonTypes";
import useInput from "../../hooks/use-inpute";
import img2 from "../../Components/Images/sport.png";
import img3 from "../../Components/Images/Football.png";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useLogin } from "../../hooks/Authentication";
import img from "../../Components/Images/Nbacground.jpg"

const Login = (props) => {
  
  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailChangeHandler,
    InputBlurHandler: emailBlurHandler,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    isValid: enteredPasswordIsValid,
    valueChangeHandler: passwordChangeHandler,
    InputBlurHandler: passwordBlur,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
  } = useInput((value) => value.trim().length > 8);

  let formIsValid = false;
  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return (
      <MuiAlert
        sx={{ zIndex: "22", marginTop: "10px" }}
        elevation={6}
        ref={ref}
        variant="filled"
        {...props}
      />
    );
  });

  const { error, isLoading, handleLogin } = useLogin(
    enteredEmail,
    enteredPassword
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", 
        backgroundImage: `url(${process.env.PUBLIC_URL + img})`,
        backgroundSize: "cover", 
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={classes.contanier}>
        {" "}
        {error && (
          <Alert severity="error">Incorrect Username or Password!</Alert>
        )}
        <div className={classes.card}>
          <img src={img3} alt="logo1" className={classes.image2} />
          <img
            src={img2}
            alt="logo"
            style={{ width: 100, height: 30, marginTop: "32px" }}
          />
          <form onSubmit={handleLogin}>
            <div className={classes.h2}>Login</div>
            <div style={{ width: "308px", marginBottom: "8px" }}>
              <Input
                label="Email"
                value={enteredEmail}
                onChange={emailChangeHandler}
                error={emailInputHasError}
                onBlur={emailBlurHandler}
                variant="filled"
                inputType="email"
                IsUsername
                type="email"
                errortext="Email includes '@!"
              />
              <div>
                <Input
                  label="Password"
                  id="outlined-adornment-password"
                  variant="filled"
                  value={enteredPassword}
                  onChange={passwordChangeHandler}
                  error={passwordInputHasError}
                  onBlur={passwordBlur}
                  errortext="Password must be 8 characters long."
                  type={showPassword}
                  isPassword
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                />
              </div>
            </div>
            <div className={classes.a}>Forgot password</div>
            <Button
              type={!formIsValid ? ButtonTypes.DISABLED : ButtonTypes.PRIMARY}
              btnText={
                isLoading ? (
                  <ClipLoader
                    color={"white"}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Login"
                )
              }
              disabled={!formIsValid || isLoading}
            />
            <div className={classes.line}></div>
            <div className={classes.p}>
              Don't have an account?
              <Link className={classes.a1} to="singup">
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
