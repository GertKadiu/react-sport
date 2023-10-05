import NavBar from "../../Components/NavBar/NavBar";
import classes from "./Comments.module.css";
import Card from "../../UI/Card/Card";
import Input from "../../Components/Input/Input";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import ContentLoader from "react-content-loader";
import { CommentAction } from "../../hooks/Action";
import Modal from "../../Components/Modal/Modal";
import { useModal } from "../../hooks/Counter";

function Comments() {
  const {
    handleGoBack,
    postData,
    createComment,
    comentChangeHandler,
    comentInputHasError,
    commentBlur,
    enteredCommentIsValid,
    post,
    enteredComment,
    isLoading,
    handleLoadMore,
    displayedComments,
    displayedCommentsData,
    comments
  } = CommentAction();

    const { isModalOpen, modalType,  setIsModalOpen } = useModal();

  return (
    <>
      <div className={classes.contanier}>
        <div className={classes.navBar}>
          <NavBar
            isNavbarComments
            name="SPORT"
            Icon={
              <ArrowBackSharpIcon
                sx={{ width: 20, height: 20, marginTop: "6px" }}
                onClick={handleGoBack}
              />
            }
          />
        </div>
        <ul key={post?.id} style={{ marginTop: "66px" }}>
          {postData}
        </ul>
        <div className={classes.comments}>Comment</div>
        <Card>
          <div style={{ width: "100%", position: "relative" }}>
            <form onSubmit={createComment}>
              <Input
                IsUsername
                label="Comment"
                type="text"
                variant="filled"
                autoComplete="off"
                error={comentInputHasError}
                value={enteredComment}
                onChange={comentChangeHandler}
                onBlur={commentBlur}
              />
              <button
                className={`${classes.postBtn} ${
                  !enteredCommentIsValid ? classes.disabled : ""
                }`}
                type="submit"
                style={{
                  position: "absolute",
                  top: "40%",
                  right: "10px",
                  transform: "translateY(-50%)",
                }}
                disabled={!enteredCommentIsValid}
              >
                Post
              </button>
            </form>
          </div>
          {isLoading ? (
            <ContentLoader
              style={{ marginTop: "20px" }}
              height={70}
              speed={2}
              backgroundColor={"#EBEBEB"}
              foregroundColor={"#999"}
            >
              <rect x="0" y="0" rx="50" ry="50" width="50" height="50" />
              <rect x="60" y="17" rx="4" ry="4" width="50" height="13" />
              <rect x="60" y="40" rx="3" ry="3" width="100" height="10" />
            </ContentLoader>
          ) : (
            <ul>{displayedCommentsData}</ul>
          )}
          <div style={{ marginBottom: "20px" }}>
            {displayedComments < comments.length ? (
              <button onClick={handleLoadMore} className={classes.commentsBtn}>
                View more comments
              </button>
            ) : null}
          </div>
          {isModalOpen && (
            <Modal
              modalType={modalType}
              closeModal={() => setIsModalOpen(false)}
            />
          )}
        </Card>
      </div>
    </>
  );
}

export default Comments;
