import classes from "./Comment.module.css";
import Avatar from "@mui/material/Avatar";

const CommentPost = (props) => {
  const { name, comment, time } = props;

  return (
    <div className={classes.buttom}>
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 20, height: 20 }}
      />
      <div className={classes.class}>
        <div className={classes.name}>{name}</div>
        <div className={classes.comments}>{comment}</div>
        <div className={classes.hour}>{time}</div>
      </div>
      {/* <div className={classes.comments}>{comment}</div> */}
    </div>
  );
};

export default CommentPost;
