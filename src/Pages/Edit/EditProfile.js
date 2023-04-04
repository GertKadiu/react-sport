import * as React from "react";
import classes from "./EditProfile.module.css";
import FormControl from "@mui/material/FormControl";
import Avatar from "@mui/material/Avatar";
import Button from "../../Components/Button/Button";
import { ButtonTypes } from "../../Components/Button/ButtonTypes";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import Input from "../../Components/Input/Input";
import { useNavigate } from "react-router-dom";
import ima2 from "../../Components/Images/kokaxhines.png";
import useInput from "../../Components/hooks/use-inpute";

function EditProfile(props) {

  const navigate = useNavigate()

  let formIsValid = false;

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    valueChangeHandler: nameChangeHandler,
  } = useInput((value) => value.trim() !== "");

    const {
      value: enteredBio,
      isValid: enteredBioIsValid,
      valueChangeHandler: bioChangeHandler,
    } = useInput((value) => value.trim() !== "");

    if(enteredNameIsValid && enteredBioIsValid) {
      formIsValid = true;   
    }

  return (
    <div className={classes.body}>
      <div className={classes.contanier}>
        <div className={classes.first}>
          <ClearSharpIcon onClick={() => navigate("/profile")} />
          <div style={{ fontSize: "16px" }}>Edit Profile</div>
        </div>
        <div className={classes.line}></div>
        <Avatar sx={{ width: 90, height: 90 }}>
          {" "}
          <img src={ima2} alt="background" style={{ width: 90, height: 90 }} />
        </Avatar>
        <div className={classes.text}>Change profile photo</div>
        <FormControl style={{ width: "100%", marginBottom: "16px" }}>
          <Input
            IsUsername
            label="Username"
            value={enteredName}
            onChange={nameChangeHandler}
            type="text"
            variant="filled"
            autoComplete="off"
            InputLabelProps={{
              style: { color: "#666666" },
            }}
          />
          <Input
            IsUsername
              value={enteredBio}
            onChange={bioChangeHandler}
            label="Bio"
            type="text"
            variant="filled"
            autoComplete="off"
            InputLabelProps={{
              style: { color: "#666666" },
            }}
          />
        </FormControl>
        <Button
          type={formIsValid ? ButtonTypes.PRIMARY : ButtonTypes.DISABLED}
          btnText="Save"
        />
      </div>
    </div>
  );
}

export default EditProfile;