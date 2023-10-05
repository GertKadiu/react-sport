import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import Fab from "../../Components/Fab/Fab";
import Button from "../../UI/Button/Button";
import { ButtonTypes } from "../../UI/Button/ButtonTypes";
import NavBar from "../../Components/NavBar/NavBar";
import classes from "./Profile.module.css";
import { ProfileAction } from "../../hooks/Action";
import Modal from "../../Components/Modal/Modal";
import { useModal } from "../../hooks/Counter";
import ContentLoader from "react-content-loader";

function Profile(props) {
  const {
    users,
    isLoading,
    currentUserId,
    navigate,
    post,
    postData,
    bio,
    name,
    avatar,
    joinDate,
    handleFollow,
    userId,
    followingUserAvatars,
    followersUserAvatars,
  } = ProfileAction();
  
  const handleGoBack = () => {
    navigate(-1);
  };

    const {
    isModalOpen,
    modalType,
    openModal,
    setIsModalOpen
  } = useModal()

  const isCurrentUserProfile = currentUserId === userId;

  return (
    <div className={classes.contanier}>
      <div className={classes.navBar}>
        <NavBar
          Icon={
            <ArrowBackSharpIcon
              onClick={handleGoBack}
              sx={{ width: 20, height: 20, marginTop: "6px" }}
            />
          }
          isNavbarProfile
          name={name}
        />
      </div>
      <div className={classes.contanier2}>
        <div className={classes.header}>
          {isLoading ? (
            <div style={{ marginLeft: "10px" }}>
              <ContentLoader
                height={74}
                width={74}
                speed={1}
                backgroundColor={"#EBEBEB"}
                foregroundColor={"#999"}
              >
                <rect ry="40" width="74" height="70" />
              </ContentLoader>
            </div>
          ) : (
            <div>{avatar}</div>
          )}
          <div className={classes.follow}>
            <div style={{ fontSize: "16px" }}>
              {users[0]?.followersCount || 0}
            </div>
            <div
              onClick={() => openModal("followers", userId)}
              style={{ cursor: "pointer" }}
            >
              Followers
            </div>
          </div>
          <div className={classes.follow}>
            <div style={{ fontSize: "16px" }}>
              {users[0]?.followingCount || 0}
            </div>
            <div
              onClick={() => openModal("following", userId)}
              style={{ cursor: "pointer" }}
            >
              Following
            </div>
          </div>
        </div>
        <div className={classes.bio}>{bio}</div>
        <div className={classes.join}>
          JOINED SINCE <div style={{ marginLeft: "5px" }}>{joinDate}</div>
        </div>
        {currentUserId === userId ? (
          <Button
            onClick={() => navigate("/edit")}
            type={ButtonTypes.TERTIARY}
            btnText="Edit Profile"
          />
        ) : (
          <Button
            onClick={handleFollow}
            type={ButtonTypes.FOLLOW}
            btnText={
              users[0]?.followers?.includes(currentUserId)
                ? "Unfollow"
                : "Follow"
            }
          />
        )}

        <div className={classes.line}>
          <span className={classes.span}>{post.length} Posts</span>
        </div>
        <div>
          <ul>
            {postData.map((postDataItem, index) => (
              <li key={index}>{postDataItem}</li>
            ))}
          </ul>
        </div>
        <Fab />
      </div>
      {currentUserId && isModalOpen && isCurrentUserProfile ? (
        <Modal
          modalType={modalType}
          followingUserAvatars={followingUserAvatars}
          followersUserAvatars={followersUserAvatars}
          closeModal={() => setIsModalOpen(false)}
        />
      ) : null}
    </div>
  );
}

export default Profile;
