import * as React from "react";
import Avatar from "@mui/material/Avatar";
import classes from "./CreatePost.module.css";
import Button from "../../Components/Button/Button";
import { ButtonTypes } from "../../Components/Button/ButtonTypes";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import Chip from "../../Components/Chip/Chip";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Input/Input";
import Card from "../../UI/Card";
import ima2 from "../../Components/Images/kokaxhines.png";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AttachmentIcon from "@mui/icons-material/Attachment";
import useInput from "../../Components/hooks/use-inpute";

function CreatePost(props) {
  const navigate = useNavigate();

  let formIsValid = false;

  const {
    value: enteredSomething,
    isValid: enteredSomethingIsValid,
    valueChangeHandler: somethingChangeHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredNumber,
    isValid: enteredNumberIsValid,
    valueChangeHandler: numberChangeHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredUrl,
    isValid: enteredUrlIsValid,
    valueChangeHandler: urlChangeHandler,
  } = useInput((value) => value.trim() !== "");

  if (enteredSomethingIsValid && enteredNumberIsValid && enteredUrlIsValid) {
    formIsValid = true;
  }

  function clickHandler(e) {
  if (formIsValid === true) {
    navigate('/profile')
  }
}
  
  return (
    <div className={classes.body}>
      <Card>
        <div className={classes.first}>
          <ClearSharpIcon onClick={() => navigate("/profile")} />
          <div fontSize="16px">Create Post</div>
        </div>
        <div className={classes.line}></div>
        <div className={classes.profile}>
          <div>
            <Avatar sx={{ width: 40, height: 40 }}>
              <img
                src={ima2}
                alt="background"
                style={{ width: 40, height: 40 }}
              />
            </Avatar>
          </div>
          <div className={classes.text}>Hinata</div>
        </div>
        <div style={{ width: "100%" }}>
          <Input
            value={enteredSomething}
            onChange={somethingChangeHandler}
            id="standard-basic"
            label="What's in your mind?"
            variant="standard"
            isCssTextField
            autoComplete="off"
          />
          <div className={classes.text2}>Post Detail</div>
          <Input
            IsUsername
            Icon={<PeopleOutlineIcon />}
            value={enteredNumber}
            onChange={numberChangeHandler}
            label="People Limit"
            type="number"
            id="test"
            autoComplete="off"
            variant="filled"
          />
          <Input isClaendar />
          <div style={{ marginTop: "16px" }}>Tags</div>
          <Chip label="Choose tag" />
          <div className={classes.chat}>Chat Link</div>
          <div style={{ marginBottom: "10px" }}>
            <Input
              IsUsername
              value={enteredUrl}
              onChange={urlChangeHandler}
              Icon={<AttachmentIcon />}
              label="Add Chat Link"
              variant="filled"
              type="link"
            />
          </div>
        </div>
        <Button
          type={formIsValid ? ButtonTypes.PRIMARY : ButtonTypes.DISABLED}
          btnText="Post"
          onClick={clickHandler}
        />
      </Card>
    </div>
  );
}
export default CreatePost;
