import classes from "./Singup.module.css";
import Button from "../../UI/Button/Button";
import { Link } from "react-router-dom";
import Input from "../../Components/Input/Input";
import useInput from "../../hooks/use-inpute";
import { ButtonTypes } from "../../UI/Button/ButtonTypes";
import img2 from "../../Components/Images/sport.png";
import img3 from "../../Components/Images/Football.png";
import MuiAlert from "@mui/material/Alert";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useSignup } from "../../hooks/Authentication";
import img from "../../Components/Images/Nbacground.jpg"

function Singup(props) {
  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    valueChangeHandler: nameChangeHandler,
    InputBlurHandler: nameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailChangeHandler,
    InputBlurHandler: emailBlurHandler,
  } = useInput((value) => value.trim().includes("@"));

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
  if (enteredEmailIsValid && enteredPasswordIsValid && enteredNameIsValid) {
    formIsValid = true;
  }

  
  const Alert = React.forwardRef(function Alert(props, ref) {
    return (
      <MuiAlert
        elevation={6}
        sx={{ zIndex: "22", marginTop: "10px" }}
        ref={ref}
        variant="filled"
        {...props}
      />
    );
  });
const { error, success, isLoading, createPost } = useSignup(
    enteredEmail,
    enteredPassword,
    enteredName
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
        {error && <Alert severity="error">This is an error message!</Alert>}
        {success && (
          <Alert severity="success">Account created successfully!</Alert>
        )}
        <div className={classes.card}>
          <img src={img3} alt="logo1" className={classes.image2} />
          <img
            src={img2}
            alt="logo"
            style={{ width: 100, height: 30, marginTop: "32px" }}
          />
          <form onSubmit={createPost}>
            <div className={classes.h2}>Sign up</div>
            <div style={{ width: "308px", marginBottom: "24px" }}>
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
              <Input
                label="Username"
                inputType="text"
                id="outlined-username"
                variant="filled"
                IsUsername
                type="text"
                value={enteredName}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                error={nameInputHasError}
                errortext="Username must not be empty!"
              />
              <Input
                label="Password"
                id="outlined-adornment-password"
                variant="filled"
                value={enteredPassword}
                onChange={passwordChangeHandler}
                error={passwordInputHasError}
                onBlur={passwordBlur}
                errortext="Password must be 8 characters long"
                type={showPassword}
                isPassword
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              />
            </div>
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
                  "Sign up"
                )
              }
              disabled={!formIsValid || isLoading}
            />
            <div className={classes.line}></div>
            <div className={classes.p}>
              I have an account.
              <Link className={classes.a2} to="/">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Singup;
