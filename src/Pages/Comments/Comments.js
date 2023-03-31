import Post from "../../Components/Post/Post";
import NavBar from "../../Components/NavBar/NavBar";
import classes from "./Comments.module.css";
import Comment from "../../Components/Comment/Comment";
import Card from "../../UI/Card";
import Input from "../../Components/Input/Input";

const PROFILE = [
  {
    key: "profile",
    name: "Hinata",
    description: "Text",
    time: "20-02-2023 15:00",
    participants: "0/5",
    tags: "football",
    likes: "12 Likes",
  },
];

const COMMENTS = [
  {
    key: "comment",
    name: "Hinata",
    comment: "Comenting here",
    time: "1 hour",
  },
  {
    key: "comment",
    name: "Hinata",
    comment: "Comenting here",
    time: "1 hour",
  },
  {
    key: "comment",
    name: "Hinata",
    comment: "Comenting here",
    time: "1 hour",
  },
  {
    key: "comment",
    name: "Hinata",
    comment:
      "Comenting hereComenting hereComenting hereComenting hereComenting hereComenting hereComenting hereComenting hereComenting hereComenting here",
    time: "1 hour",
  },
];

const Comments = () => {
  return (
    <>
      <div className={classes.body}>
        <div className={classes.contanier}>
          <NavBar isNavbarComment name="SPORT" />
          <ul style={{ marginTop: "16px" }}>
            {PROFILE.map((data) => (
              <Post
                key={data.key}
                name={data.name}
                description={data.description}
                time={data.time}
                participants={data.participants}
                tags={data.tags}
                likes={data.likes}
              />
            ))}
          </ul>
          <div className={classes.comments}>Comment</div>
          <Card>
            <ul>
              {COMMENTS.map((comment) => (
                <Comment
                  key={comment.key}
                  name={comment.name}
                  comment={comment.comment}
                  time={comment.time}
                />
              ))}
            </ul>
            <div style={{ width: "100%" }}>
              <Input
                isPosting
                label="Comment"
                type="text"
                variant="filled"
                autoComplete="off"
              />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Comments;
