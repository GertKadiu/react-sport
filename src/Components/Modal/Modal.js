import React, { useState, useEffect } from "react";
import classes from "./Modal.module.css";
import useFollowAction from "../../hooks/useFollowAction";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import Button from "../../UI/Button/Button";
import { ButtonTypes } from "../../UI/Button/ButtonTypes";

function Modal({
  closeModal,
  modalType,
  value,
  likedUserAvatars,
  followingUserAvatars,
  followersUserAvatars,
}) {
  const {
    followerNames,
    followingNames,
    followingIds,
    followerIds,
    followUnfollowUser,
    removeFollower,
  } = useFollowAction();
  const [names, setNames] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (modalType === "followers") {
      setNames(followerNames);
      setImages(followersUserAvatars);
    } else if (modalType === "following") {
      setNames(followingNames);
      setImages(followingUserAvatars);
    } else if (modalType === "likes") {
      setNames(value);
      setImages(likedUserAvatars);
    }
  }, [
    modalType,
    value,
    likedUserAvatars,
    followingUserAvatars,
    followerNames,
    followingNames,
    followersUserAvatars,
  ]);

  const shouldShowButton =
    modalType === "followers" || modalType === "following";

  const isLikesEmpty = modalType === "likes" && value.length === 0;

  if (isLikesEmpty) {
    return null;
  }

  const handleUnfollow = async (index) => {
    try {

      await followUnfollowUser(followingIds[index], true);


      const updatedNames = [...names];
      updatedNames.splice(index, 1);
      setNames(updatedNames);

      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);
    } catch (error) {
      console.error("Error unfollowing user:", error);

    }
  };

  const handleRemove = async (index) => {
    try {

      await removeFollower(followerIds[index]);

      const updatedNames = [...names];
      updatedNames.splice(index, 1);
      setNames(updatedNames);

      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);
    } catch (error) {
      console.error("Error removing follower:", error);

    }
  };

  const handleButtonClick = (followerId, index, buttonText) => {
    if (buttonText === "Unfollow") {
      handleUnfollow(followerId, index);
    } else if (buttonText === "Remove") {
      handleRemove(followerId, index);
    }
  };

  return (
    <div className={classes.modalOverlay}>
      <div className={classes.modal}>
        <div
          className={classes.header}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontSize: "22px", textAlign: "center", color: "black" }}>
            {modalType === "followers"
              ? "Followers"
              : modalType === "following"
              ? "Following"
              : "Likes"}
          </h2>
          <ClearSharpIcon onClick={closeModal} />
        </div>
        <div>
          {names.map((name, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "black",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {images && images[index] ? <div>{images[index]}</div> : null}
                <p style={{ marginLeft: 12 }}>{name}</p>
              </div>
              <div></div>
              {shouldShowButton ? (
                <Button
                  onClick={() =>
                    handleButtonClick(
                      index,
                      index,
                      modalType === "following" ? "Unfollow" : "Remove"
                    )
                  }
                  type={ButtonTypes.Modal}
                  btnText={modalType === "following" ? "Unfollow" : "Remove"}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal;
