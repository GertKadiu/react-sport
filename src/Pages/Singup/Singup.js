import classes from "./Singup.module.css";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";
import Input from "../../Components/Input/Input";
import useInput from "../../Components/hooks/use-inpute";
import { ButtonTypes } from "../../Components/Button/ButtonTypes";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Components/Config/firebase";
import { useNavigate } from "react-router-dom";
import { render } from "@testing-library/react";
import { FormControl } from "@mui/material";
import img1 from "../../Components/Images/Background1_1.svg";
import img2 from "../../Components/Images/sport.png";
import img3 from "../../Components/Images/Football.png";

function Singup(props) {
  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    valueChangeHandler: nameChangeHandler,
    InputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailChangeHandler,
    InputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.trim().includes("@"));

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
  if (enteredEmailIsValid && enteredPasswordIsValid && enteredNameIsValid) {
    formIsValid = true;
  }

  const navigate = useNavigate();
  
  const clickHandler = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword,
        enteredName
      );
    } catch (error) {
      console.log(error);
    }
    if (formIsValid) {
      navigate("/");
    } else {
      render(emailInputHasError, passwordInputHasError, nameInputHasError);
    }
    if (!formIsValid) {
      resetName("");
      resetPassword("");
      resetEmail('');
    } 
  };

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
          <div className={classes.h2}>Sign up</div>
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
              errorText="Username must not be empty!"
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "16px" }}>
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
          <Button
            onClick={clickHandler}
            type={formIsValid ? ButtonTypes.PRIMARY : ButtonTypes.DISABLED}
            btnText="Sign up"
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
  );
}

export default Singup;
