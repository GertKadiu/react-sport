import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { useNavigate, Link } from "react-router-dom";
import clasess from "./Post.module.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import LongMenu from "../../Menu/Menu";
import Card from "../../UI/Card/Card";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from "../../Context/AuthContext";
import IconButton from "@mui/material/IconButton";
import { useModal } from "../../hooks/Counter";
import Modal from "../Modal/Modal";
import ContentLoader from "react-content-loader";
import { ProfileAction } from "../../hooks/Action";

function Post(props) {
  const {
    name,
    description,
    time,
    participants,
    tags,
    likes,
    comments,
    img,
    createdAt,
    onDelete,
    owner,
    comment,
    handleToggleLike,
    isLiked,
    onComment,
    onEdit,
    likedUserNames,
    likedUserAvatars,
  } = props;

  const { isLoading } = ProfileAction();
  const { modalType, openModal, isModalOpen, setIsModalOpen } = useModal();
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const navigate = useNavigate();

  const CurrentUserPost = () => {
    if (currentUser) {
      return owner === currentUserId;
    }
    return false;
  };

  const handlePostLike = () => {
    setLocalIsLiked((prevState) => !prevState);
    handleToggleLike();
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {

    onDelete();

    closeDeleteModal();
  };

  return (
    <div>
      {isLoading ? (
        <ContentLoader
          style={{ marginTop: "20px" }}
          height={100}
          speed={2}
          backgroundColor={"#EBEBEB"}
          foregroundColor={"#999"}
        >
          <rect x="0" y="0" rx="50" ry="50" width="70" height="70" />
          <rect x="80" y="17" rx="4" ry="4" width="70" height="13" />
          <rect x="80" y="40" rx="3" ry="3" width="150" height="10" />
        </ContentLoader>
      ) : (
        <Card>
          <div className={clasess.cardHeader}>
            <div className={clasess.profile}>
              <div>
                <Avatar
                  src={img}
                  sx={{ width: 40, height: 40 }}
                  onClick={() => {
                    if (owner === currentUserId) {
                      navigate(`/profile/${currentUserId}`);
                    } else {
                      navigate(`/profile/${owner}`);
                    }
                  }}
                />
              </div>
              <div className={clasess.name}>
                <Link
                  as={Link}
                  to={
                    owner === currentUserId
                      ? `/profile/${currentUserId}`
                      : `/profile/${owner}`
                  }
                  style={{
                    marginLeft: "10px",
                    textDecoration: "none",
                    color: "#3C3A3B",
                  }}
                >
                  {name}
                </Link>
                <div
                  style={{
                    fontSize: "12px",
                    marginLeft: "10px",
                    color: "#666",
                  }}
                >
                  {createdAt}
                </div>
              </div>
            </div>
            <div className={clasess.profile2}>
              {CurrentUserPost() && !isDeleteModalOpen ? (
                <>
                  <LongMenu
                    menuType="menu1"
                    name="Edit"
                    name2="Delete"
                    onClickEdit={onEdit}
                    onClickDelete={openDeleteModal}
                    EditIcon={<EditIcon onClick={onEdit} />}
                    Delete={<DeleteIcon onClick={openDeleteModal} />}
                    style={{ color: "#3C3A3B", width: "22px", height: "22px" }}
                  />
                </>
              ) : null}
              {isDeleteModalOpen && (
                <div className={`${clasess.deleteModal} delete-modal`}>
                  <p>Are you sure you want to delete this post?</p>
                  <div className={clasess.deletebutton}>
                    <button className={clasess.yes} onClick={confirmDelete}>
                      Yes
                    </button>
                    <button className={clasess.no} onClick={closeDeleteModal}>
                      No
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={clasess.description}>
            <div>{description}</div>
          </div>
          <div className={clasess.time}>
            <CalendarMonthIcon sx={{ width: 20, height: 20 }} />
            <div style={{ marginLeft: "7px" }}>{time}</div>
          </div>
          <div className={clasess.participants}>
            <PeopleOutlineIcon sx={{ width: 20, height: 20 }} />
            <div style={{ marginLeft: "7px" }}>{participants}</div>
          </div>
          <div className={clasess.tags}>
            {Array.isArray(tags) &&
              tags.map((tag, index) => (
                <div className={clasess.taget} key={index}>
                  <div>{tag}</div>
                </div>
              ))}
          </div>
          <div className={clasess.line}></div>
          <div style={{ display: "flex" }}>
            <IconButton onClick={handlePostLike}>
              {localIsLiked ? (
                <FavoriteIcon sx={{ width: 20, height: 20, color: "red" }} />
              ) : (
                <FavoriteBorderIcon sx={{ width: 20, height: 20 }} />
              )}
            </IconButton>
            <IconButton onClick={onComment}>
              <AssignmentOutlinedIcon sx={{ width: 20, height: 20 }} />
            </IconButton>
          </div>
          <div style={{ display: "flex" }}>
            <a
              href="#red"
              onClick={() => openModal("likes")}
              className={clasess.comments}
            >
              {likes} Likes
            </a>
            <a href="#red" onClick={onComment} className={clasess.comments}>
              {comment} <span onClick={onComment}>Comments</span>
            </a>
          </div>
          <Link
            style={{
              color: "#999999",
              fontSize: "smaller",
              textDecoration: "none",
            }}
            to={
              owner === currentUserId
                ? `/comments/${currentUserId}`
                : `/comments/${owner}`
            }
          >
            {comments}
          </Link>
          {isModalOpen && (
            <Modal
              currentUserId={currentUserId}
              modalType={modalType}
              likedUserAvatars={likedUserAvatars}
              value={likedUserNames}
              closeModal={() => setIsModalOpen(false)}
            />
          )}
        </Card>
      )}
    </div>
  );
}

export default Post;
