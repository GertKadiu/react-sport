import * as React from "react";
import Button from "../../UI/Button/Button";
import { ButtonTypes } from "../../UI/Button/ButtonTypes";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import Input from "../../Components/Input/Input";
import Card from "../../UI/Card/Card";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import classes from "./EditPost.module.css";
import { db } from "../../Firebase/Firebase1";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { CreatingPost } from "../../hooks/Action";
import MultipleSelect from "../../Components/Chip/Chip";
import { ClipLoader } from "react-spinners";

function EditPost(props) {
   const { postId } = useParams();

  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [participants, setParticipants] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const { avatar, name, setTags, handleChange, tags } = CreatingPost();

  useEffect(() => {
    const fetchPostData = async () => {
      if (!currentUserId || !postId) {
        return;
      }

      const postRef = doc(db, "post", postId);
      const postDoc = await getDoc(postRef);

      if (postDoc.exists()) {
        const postData = postDoc.data();
        setDescription(postData.description || "");
        setParticipants(postData.participants || "");
        setTags(postData.tags || "");
      } else {
        console.log("Post not found");
      }
    };

    fetchPostData();
  }, [currentUserId, postId, setTags]);

  const handleUpdatePosts = async () => {
    if (!currentUserId || !postId) {
      return;
    }

    const postRef = doc(db, "post", postId);

    try {
      await updateDoc(postRef, {
        description: description,
        participants: participants,
        tags: tags,
      });
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate(`/profile/${currentUserId}`);
      }, 1000);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div>
      <Card>
        <div className={classes.first}>
          <ClearSharpIcon onClick={() => navigate("/home")} />
          <div fontSize="16px">Edit Post</div>
        </div>
        <div className={classes.line}></div>
        <div className={classes.profile}>
          <div>{avatar}</div>
          <div style={{ marginLeft: "10px" }}>{name}</div>
        </div>
        <div style={{ width: "100%" }}>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            label="People Limit"
            type="number"
            max="5"
            id="test"
            autoComplete="off"
            variant="filled"
          />
          <MultipleSelect value={tags} onChange={handleChange} />
          <div style={{ marginBottom: "30px" }}></div>
        </div>
        <Button
          type={ButtonTypes.PRIMARY}
          btnText={
            isLoading ? (
              <ClipLoader
                color={"white"}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Save Changes"
            )
          }
          disabled={isLoading}
          onClick={() => {
            handleUpdatePosts();
          }}
        />

        <div style={{ alignSelf: "center" }}></div>
      </Card>
    </div>
  );
}
export default EditPost;
