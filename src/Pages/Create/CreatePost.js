import * as React from "react";
import classes from "./CreatePost.module.css";
import Button from "../../UI/Button/Button";
import { ButtonTypes } from "../../UI/Button/ButtonTypes";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import MultipleSelect from "../../Components/Chip/Chip";
import Input from "../../Components/Input/Input";
import Card from "../../UI/Card/Card";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import Calendar from "../../Components/Calendar/Calendar";
import { CreatingPost } from "../../hooks/Action";

function CreatePost(props) {
  const {
    avatar,
    setTime,
    name,
    createPost,
    formIsValid,
    numberChangeHandler,
    urlChangeHandler,
    navigate,
    description,
    participants,
    time,
    tags,
    handleChange,
    participantsInputHasError,
    participantsBlurHandler,
    descriptionInputHasError,
    descriptionBlurHandler,
  } = CreatingPost();

  return (
    <div>
      <Card>
        <div className={classes.first}>
          <ClearSharpIcon onClick={() => navigate("/home")} />
          <div fontSize="16px">Create Post</div>
        </div>
        <div className={classes.line}></div>
        <div className={classes.profile}>
          <div>{avatar}</div>
          <div style={{ marginLeft: "10px" }}>{name}</div>
        </div>
        <div style={{ width: "100%" }}>
          <Input
            value={description}
            onChange={urlChangeHandler}
            onBlur={descriptionBlurHandler}
            error={descriptionInputHasError}
            id="standard-basic"
            label="What's in your mind?"
            variant="standard"
            isCssTextField
            autoComplete="off"
            errortext="Not more than 100 character"
          />
          <div className={classes.text2}>Post Detail</div>
          <Input
            IsUsername
            Icon={<PeopleOutlineIcon />}
            value={participants}
            onChange={numberChangeHandler}
            onBlur={participantsBlurHandler}
            error={participantsInputHasError}
            label="People Limit"
            type="number"
            max="5"
            id="test"
            autoComplete="off"
            variant="filled"
            errortext="30 is the maximum "
          />
          <Calendar onChange={(newTime) => setTime(newTime)} value={time} />
          <div style={{ marginBottom: "30px", marginTop: "16px" }}>
            <MultipleSelect
              onChange={handleChange}
              value={tags}
            />
          </div>
        </div>
        <Button
          type={!formIsValid ? ButtonTypes.DISABLED : ButtonTypes.PRIMARY}
          btnText="Post"
          disable={!formIsValid}
          onClick={() => {
            createPost();
          }}
        />
      </Card>
    </div>
  );
}
export default CreatePost;
