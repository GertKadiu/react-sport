import classes from "./Login.module.css";
import Button from "../../Components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Components/Input/Input";
import { ButtonTypes } from "../../Components/Button/ButtonTypes";
import useInput from "../../Components/hooks/use-inpute";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Components/Config/firebase";
import img1 from "../../Components/Images/Background1_1.svg";
import img2 from "../../Components/Images/sport.png";
import img3 from "../../Components/Images/Football.png";
import { FormControl } from "@mui/material";

const Login = (props) => {
  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailChangeHandler,
    InputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    isValid: enteredPasswordIsValid,
    valueChangeHandler: passwordChangeHandler,
    InputBlurHandler: passwordBlur,
    reset: resetPassword,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
  } = useInput((value) => value.trim().length > 8);

  let formIsValid = false;
  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const clickHandler = async () => {
    try {
      await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword);
    } catch (error) {
      console.log(error);
    }

    if (formIsValid) {
      navigate("/home");
    }

    if (!formIsValid) {
      resetEmail("");
      resetPassword("");
    }
    
  };
  const navigate = useNavigate();

  return (
    <div className={classes.contanier}>
      <img src={img1} alt="backround" className={classes.image} />

      <div className={classes.card}>
        <img src={img3} alt="logo1" className={classes.image2} />
        <img
          src={img2}
          alt="logo"
          style={{ width: 100, height: 30, marginTop: "32px" }}
        />
        <form>
          <div className={classes.h2}>Login</div>
          <FormControl fullWidth>
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
              errorText="Email includes '@!"
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "8px" }}>
            <Input
              label="Password"
              id="outlined-adornment-password"
              variant="filled"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              error={passwordInputHasError}
              onBlur={passwordBlur}
              errorText="Password must be 8 characters long"
              type={showPassword}
              isPassword
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            />
          </FormControl>
          <div className={classes.a}>Forgot password</div>
          <Button
            onClick={clickHandler}
            type={formIsValid ? ButtonTypes.PRIMARY : ButtonTypes.DISABLED}
            btnText="Login"
          />
          <div className={classes.line}></div>
          <div className={classes.p}>
            Don't have an account?
            <Link className={classes.a1} to="/singup">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
