import classes from "./Comment.module.css";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

const CommentPost = (props) => {
  const { id, name, comment, time, img, onDelete, postId, currentUserComment } =
    props;

  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;

  const isCurrentUserComment = currentUserId === currentUserComment;

  const profileLink = isCurrentUserComment
    ? `/profile/${currentUserId}`
    : `/profile/${currentUserComment}`;

    
const handleDelete = () => {
    onDelete(id, postId);
  };

  return (
    <div className={classes.buttom}>
      <Avatar
        as={Link}
        to={profileLink}
        alt="Remy Sharp"
        src={img}
        sx={{ width: 30, height: 30 }}
      />
      <div className={classes.class}>
        <Link to={profileLink} className={classes.name}>
          {name}
        </Link>
        <div className={classes.comments}>
          <div className={classes.text}>{comment}</div>
          {isCurrentUserComment && (
            <div className={classes.deleteIcon}>
              <DeleteIcon onClick={handleDelete} style={{ width: 28 }} />
            </div>
          )}
        </div>
        <div className={classes.hour}>{time}</div>
      </div>
    </div>
  );
};

export default CommentPost;
