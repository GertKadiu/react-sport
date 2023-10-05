import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const InputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    hasError: hasError,
    isValid: valueIsValid,
    valueChangeHandler,
    InputBlurHandler,
    reset: reset,
    showPassword: showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
  };
};

export default useInput;
