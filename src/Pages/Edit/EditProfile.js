import classes from "./EditProfile.module.css";
import Button from "../../UI/Button/Button";
import { ButtonTypes } from "../../UI/Button/ButtonTypes";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import Input from "../../Components/Input/Input";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { EditAction } from "../../hooks/Action";

function EditProfile(props) {
  const {
    imageUrl,
    currentImage,
    openModal,
    setFile,
    setCurrentName,
    currentbio,
    updateProfile,
    setCurrentBio,
    currentName,
    navigate,
  } = EditAction();

  return (
    <div className={classes.body}>
      <div className={classes.contanier}>
        <div className={classes.first}>
          <ClearSharpIcon onClick={() => navigate("/home")} />
          <div style={{ fontSize: "16px" }}>Edit Profile</div>
        </div>
        <div className={classes.line}></div>
        <img
          style={{ width: 90, height: 90, borderRadius: 90, cursor: "pointer" }}
          src={imageUrl || currentImage}
          alt=""
          onClick={openModal}
        />
        <label htmlFor="file">
          <div className={classes.text}>
            Change profile picture:{" "}
            <DriveFolderUploadOutlinedIcon
              style={{verticalAlign:"middle"}}
            />
          </div>
        </label>
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: "none", marginTop: "10px" }}
        />
        <div style={{ width: "100%", marginBottom: "16px" }}>
          <Input
            IsUsername
            label="Username"
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
            type="text"
            variant="filled"
            autoComplete="off"
            InputLabelProps={{
              style: { color: "#666666" },
            }}
          />
          <Input
            IsUsername
            value={currentbio}
            onChange={(e) => setCurrentBio(e.target.value)}
            label="Bio"
            type="text"
            variant="filled"
            autoComplete="off"
            InputLabelProps={{
              style: { color: "#666666" },
            }}
          />
        </div>
        <Button
          type={ButtonTypes.PRIMARY}
          btnText="Save"
          onClick={updateProfile}
        />
      </div>
    </div>
  );
}

export default EditProfile;
