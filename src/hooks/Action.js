import { db } from "../Firebase/Firebase1";
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  getDocs,
  where,
  query,
  onSnapshot,
  orderBy,
  serverTimestamp,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { React, useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import Post from "../Components/Post/Post";
import { Avatar } from "@mui/material";
import moment from "moment";
import useFollowAction from "./useFollowAction";
import {
  useToggleLike,
  usePostLike,
  GettingAllUsersWichLikedPost,
  countLikes,
} from "./Likes";
import { deletePost, useDeleteComment } from "./Counter";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase/Firebase1";
import useInput from "./use-inpute";
import Comment from "../Components/Comment/Comment";

const useLogout = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await db.signOut();
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return { logout };
};

export default useLogout;

export const HomeAction = () => {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const [posts, setPosts] = useState([]);
  const { handlePostLike } = useToggleLike();
  const { allUsers } = GettingAllUsersWichLikedPost();
  const [displayedPosts, setDisplayedPosts] = useState(3);
    const { handleToggleLike } = usePostLike(currentUser, handlePostLike);
  const navigate = useNavigate();


  const fetchPostData = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "post"), orderBy("createdAt", "desc"))
      );
      const posts = [];
      for (const doc of querySnapshot.docs) {
        const postData = {
          ...doc.data(),
          id: doc.id,
        };

        const commentsSnapshot = await getDocs(
          query(collection(db, "Comments"), where("postId", "==", postData.id))
        );
        const commentsCount = commentsSnapshot.size;

        postData.commentsCount = commentsCount;

        posts.push(postData);
      }

      setPosts(posts);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  }, []);
  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);



  const handleLoadMore = () => {
    setDisplayedPosts(displayedPosts + 3); 
  };

  const handleDelete = async (postId) => {
    await deletePost(postId);
    setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
  };

  const navigateToComments = (postId) => {
    navigate(`/comments/${postId}`);
  };

  const navigateToEditPost = (postId) => {
    navigate(`/EditPost/${postId}`);
  };

  const extractLikedUserNames = (likes, users) => {
    const likedUserNames = [];

    if (likes && users) {
      for (const userId of likes) {
        const likedUser = users.find((user) => user.id === userId);
        if (likedUser) {
          likedUserNames.push(likedUser.name);
        }
      }
    }

    return likedUserNames;
  };

  const extractLikedAvatars = (likes, allUsers) => {
    const likedUsers = [];

    if (likes && allUsers) {
      for (const userId of likes) {
        const likedUser = allUsers.find((user) => user.id === userId);
        if (likedUser) {
          likedUsers.push(likedUser);
        }
      }
    }

    return likedUsers;
  };

  const displayedPostData = posts.slice(0, displayedPosts).map((data) => {
    const likesCount = countLikes(data.likes);
    const likedUserNames = extractLikedUserNames(data.likes, allUsers);
    const likedUsers = extractLikedAvatars(data.likes, allUsers);

    const likedUserAvatars = likedUsers.map((likedUser) => (
      <Avatar
        src={likedUser.img}
        alt={likedUser.name}
        key={likedUser.id}
        style={{ width: 34, height: 34 }}
      />
    ));

    return (
      <Post
        key={data.id}
        onEdit={() => navigateToEditPost(data.id)}
        name={data.name}
        description={data.description}
        tags={data.tags}
        participants={data.participants}
        createdAt={moment(data.createdAt.toDate()).fromNow()}
        img={data.img}
        likes={likesCount}
        comment={data.commentsCount}
        time={data.time}
        onDelete={() => handleDelete(data.id)}
        onLike={() => handleToggleLike(data.id)}
        owner={data.owner}
        isLiked={data.likes && data.likes.includes(currentUserId)}
        handleToggleLike={() => handleToggleLike(data.id, posts, setPosts)}
        onComment={() => navigateToComments(data.id)}
        likedUserNames={likedUserNames}
        likedUserAvatars={likedUserAvatars}
      />
    );
  });

  return { displayedPostData, posts, handleLoadMore, navigate, displayedPosts };
};

export const CommentAction = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [userProfileData, setUserProfileData] = useState({});
  const { handlePostLike } = useToggleLike();
  const [isLoading, setIsLoading] = useState(true);
  const [displayedComments, setDisplayedComments] = useState(4);
  const { allUsers } = GettingAllUsersWichLikedPost();

  const currentUserId = currentUser ? currentUser.uid : null;
  const {
    deleteComment,
    comments,
    setComments,
    commentCount,
    setCommentCount,
  } = useDeleteComment();

  const {
    value: enteredComment,
    hasError: comentInputHasError,
    isValid: enteredCommentIsValid,
    reset: resetCommentInput,
    valueChangeHandler: comentChangeHandler,
    InputBlurHandler: commentBlur,
  } = useInput((value) => value.trim().length > 1);

  const createComment = async (e) => {
    e.preventDefault();

    try {
      const commentId = uuidv4();
      const owner = currentUser ? currentUser.uid : "unknown";
      const userRef = doc(db, "users", owner);
      const userSnapshot = await getDoc(userRef);
      const userName = userSnapshot.exists()
        ? userSnapshot.data().name
        : "unknown";
      const userImage = userSnapshot.exists()
        ? userSnapshot.data().img
        : "unknown";

      const newTime = new Date().toLocaleString();

      const currentUserComment = currentUser ? currentUser.uid : "unknown";
      const newCommentData = {
        id: commentId,
        comment: enteredComment,
        time: newTime.toString(),
        currentUserComment,
        name: userName,
        img: userImage,
        postId: post.id,
      };

      await addDoc(collection(db, "Comments"), newCommentData);

      setComments((prevComments) => [...prevComments, newCommentData]);

      resetCommentInput();

      setCommentCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (postId && (!post || postId !== post.id)) {

          const postDocRef = doc(db, "post", postId);
          const postDocSnapshot = await getDoc(postDocRef);

          if (postDocSnapshot.exists()) {
            const postData = postDocSnapshot.data();

            const userDocRef = doc(db, "users", postData.owner);
            const userDocSnapshot = await getDoc(userDocRef);
            if (userDocSnapshot.exists()) {
              const userData = userDocSnapshot.data();
              postData.user = userData;
            }

            setPost(postData);
            setIsLoading(false);
          } else {
            console.log("Post not found");
          }
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId, post]);

  useEffect(() => {
    if (currentUserId) {
      const userDocRef = doc(db, "users", currentUserId);
      getDoc(userDocRef).then((userDocSnapshot) => {
        if (userDocSnapshot.exists()) {
          setUserProfileData(userDocSnapshot.data());
        }
      });
    }
  }, [currentUserId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (postId) {
          const commentCollectionRef = collection(db, "Comments");
          const q = query(commentCollectionRef, where("postId", "==", postId));
          const querySnapshot = await getDocs(q);
          const commentsData = [];
          querySnapshot.forEach((doc) => {
            commentsData.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setComments(commentsData);
          setCommentCount(commentsData.length);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId, setCommentCount, setComments]);

  const handleToggleLike = async (postId) => {
    try {
      const updatedPost = { ...post }; 

      if (updatedPost.likes && updatedPost.likes.includes(currentUserId)) {

        updatedPost.likes = updatedPost.likes.filter(
          (like) => like !== currentUserId
        );
      } else {

        if (!updatedPost.likes) {
          updatedPost.likes = [];
        }
        updatedPost.likes.push(currentUserId);
      }

      setPost(updatedPost); 

      await handlePostLike(postId, currentUser);
    } catch (error) {
      console.error("Error toggling post like:", error);
    }
  };

  const extractLikedUserNames = (likes, allUsers) => {
    const likedUserNames = [];

    if (likes && allUsers) {
      for (const userId of likes) {
        const likedUser = allUsers.find((user) => user.id === userId);
        if (likedUser) {
          likedUserNames.push(likedUser.name);
        }
      }
    }

    return likedUserNames;
  };

  const extractLikedAvatars = (likes, allUsers) => {
    const likedUserAvatars = [];

    if (likes && allUsers) {
      for (const userId of likes) {
        const likedUser = allUsers.find((user) => user.id === userId);
        if (likedUser) {
          likedUserAvatars.push(
            <Avatar
              src={likedUser.img}
              alt={likedUser.name}
              key={likedUser.id}
              style={{ width: 34, height: 34 }}
            />
          );
        }
      }
    }

    return likedUserAvatars;
  };

  const likedUserAvatars = extractLikedAvatars(post?.likes, allUsers);
  const likedUserNames = extractLikedUserNames(post?.likes, allUsers);

  const likesCount = countLikes(post?.likes);

  const postData = post ? (
    <Post
      key={post.id}
      name={post.name}
      description={post.description}
      participants={post.participants}
      createdAt={moment(post.createdAt.toDate()).fromNow()}
      img={post.img}
      likes={likesCount}
      comment={commentCount}
      time={post.time}
      owner={post.owner}
      isLiked={post.likes && post.likes.includes(currentUserId)}
      handleToggleLike={() => handleToggleLike(post.id)}
      isLoading={isLoading}
      likedUserNames={likedUserNames}
      likedUserAvatars={likedUserAvatars}
    />
  ) : null;

  const handleLoadMore = () => {
    setDisplayedComments(displayedComments + 3); 
  };

  // Display comments by time
  // const sortedComments = [...comments].sort((a, b) => {
  //   const timeA = new Date(a.time).getTime();
  //   const timeB = new Date(b.time).getTime();
  //   return timeB - timeA;
  // });

  const displayedCommentsData = comments
    .slice(0, displayedComments)
    .map((comment) => {
      const commentAuthorId = comment.currentUserComment;
      const isCurrentUserComment = currentUserId === commentAuthorId;
      const Username = isCurrentUserComment
        ? userProfileData.name || "unknown"
        : comment.name || "unknown";

      const userImage = isCurrentUserComment
        ? userProfileData.img || "unknown"
        : comment.img || "unknown";

      const formattedTime = moment(comment.time).fromNow();

      return (
        <Comment
          key={comment.id}
          name={Username}
          comment={comment.comment}
          currentUserComment={comment.currentUserComment}
          img={userImage}
          time={formattedTime}
          onDelete={() => deleteComment(comment.id)}
        />
      );
    });

  const navigate = useNavigate();

  

  return {
    navigate,
    resetCommentInput,
    displayedCommentsData,
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
    comments,
  };
};

export const ProfileAction = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [color] = useState("#118C94");
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const { handlePostLike } = useToggleLike();
  const [commentCounts, setCommentCounts] = useState({});
  const { allUsers } = GettingAllUsersWichLikedPost();
  const { handleToggleLike } = usePostLike(currentUser, handlePostLike);
  const { handleFollow } = useFollowAction(userId);

  useEffect(() => {
    const collectionRef = collection(db, "users");
    let q;
    if (currentUserId && userId) {
      q = query(collectionRef, where("id", "==", userId));
    } else {
      q = query(collectionRef);
    }
    const unsub = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const followersCount = data.followers ? data.followers.length : 0;
        const followingCount = data.following ? data.following.length : 0;
        items.push({ ...data, followersCount, followingCount });
      });
      setUsers(items);
    });

    return () => {
      unsub();
    };
  }, [currentUserId, userId]);

  const navigateToEditPost = (postId) => {
    navigate(`/EditPost/${postId}`);
  };

  const extractLikedUserNames = (likes, allUsers) => {
    const likedUserNames = [];

    if (likes && allUsers) {
      for (const userId of likes) {
        const likedUser = allUsers.find((user) => user.id === userId);
        if (likedUser) {
          likedUserNames.push(likedUser.name);
        }
      }
    }

    return likedUserNames;
  };

  const extractLikedAvatars = (likes, allUsers) => {
    const likedUserAvatars = [];

    if (likes && allUsers) {
      for (const userId of likes) {
        const likedUser = allUsers.find((user) => user.id === userId);
        if (likedUser) {
          likedUserAvatars.push(
            <Avatar
              src={likedUser.img}
              alt={likedUser.name}
              key={likedUser.id}
              style={{ width: 34, height: 34 }}
            />
          );
        }
      }
    }

    return likedUserAvatars;
  };

  const extractFollowingAvatars = (following, allUsers) => {
    const followingUsers = [];

    if (following && allUsers) {
      for (const userId of following) {
        const followingUser = allUsers.find((user) => user.id === userId);
        if (followingUser) {
          followingUsers.push(followingUser);
        }
      }
    }
    return followingUsers;
  };

  const extractFollowersAvatars = (followers, allUsers) => {
    const followersUsers = [];

    if (followers && allUsers) {
      for (const userId of followers) {
        const followersUser = allUsers.find((user) => user.id === userId);
        if (followersUser) {
          followersUsers.push(followersUser);
        }
      }
    }
    return followersUsers;
  };

  useEffect(() => {
    const postRef = query(collection(db, "post"));
    let q;
    if (currentUserId && userId) {
      q = query(postRef, where("owner", "==", userId));
    } else {
      q = query(postRef);
    }

    const unsub = onSnapshot(q, (querySnapshot) => {
      const items = [];
      const counts = {}; 
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt.toDate();
        items.push({
          ...data,
          createdAt,
        });

        const postId = doc.id;
        const commentsRef = collection(db, "Comments");
        const commentQuery = query(commentsRef, where("postId", "==", postId));
        onSnapshot(commentQuery, (commentSnapshot) => {
          const count = commentSnapshot.size;
          counts[postId] = count;
          setCommentCounts((prevCounts) => ({ ...prevCounts, ...counts }));
        });
      });
      setTimeout(() => {
        setIsLoading(false);
        setPost(items);
      }, 1000);
    });

    return () => {
      unsub();
    };
  }, [currentUserId, userId]);

  const followingUsers = extractFollowingAvatars(users[0]?.following, allUsers);
  const followersUsers = extractFollowersAvatars(users[0]?.followers, allUsers);
  const likedUserAvatars = extractLikedAvatars(post[0]?.likes, allUsers);

  const followingUserAvatars = followingUsers.map((followingUser) => (
    <Avatar
      src={followingUser.img}
      alt={followingUser.name}
      key={followingUser.id}
      style={{ width: 34, height: 34 }}
    />
  ));

  const followersUserAvatars = followersUsers.map((followersUser) => (
    <Avatar
      src={followersUser.img}
      alt={followersUser.name}
      key={followersUser.id}
      style={{ width: 34, height: 34 }}
    />
  ));



  const sortedPosts = post.sort((a, b) => b.createdAt - a.createdAt);
  const postData = sortedPosts.map((data) => {
    const handleDelete = () => {
      deletePost(data.id);
    };
    const likesCount = countLikes(data.likes);
    const commentsCount = commentCounts[data.id] || 0;
    const likedUserNames = extractLikedUserNames(data.likes, allUsers);

    return (
      <Post
        onEdit={() => navigateToEditPost(data.id)}
        name={data.name}
        key={data.id}
        description={[data.description]}
        participants={[data.participants]}
        likes={likesCount}
        createdAt={moment(data.createdAt.toString()).fromNow()}
        img={data.img}
        tags={data.tags}
        time={data.time}
        onDelete={handleDelete}
        comment={commentsCount}
        owner={data.owner}
        isLiked={data.likes && data.likes.includes(currentUserId)}
        handleToggleLike={() => handleToggleLike(data.id, post, setPost)}
        onComment={() => navigateToComments(data.id)}
        likedUserNames={likedUserNames}
        isLoading={isLoading}
        likedUserAvatars={likedUserAvatars}
      />
    );
  });

  const bio = users.map((user) => {
    return <div key={user.id}>{user.bio}</div>;
  });

  const name = users.map((user) => {
    return <div key={user.id}>{user.name}</div>;
  });

  const avatar = users.map((user) => {
    return (
      <div key={user.id}>
        <Avatar
          src={user.img}
          style={{ width: 74, height: 74, cursor: "pointer" }}
        />
      </div>
    );
  });

  const joinDate = users.map((user) => {
    const joinDate = new Date(user.joinDate.seconds * 1000);
    const year = joinDate.getFullYear();
    return <div key={user.id}>{year}</div>;
  });

  const navigateToComments = (postId) => {
    navigate(`/comments/${postId}`);
  };

  return {
    navigateToComments,
    handleToggleLike,
    users,
    isLoading,
    color,
    commentCounts,
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
  };
};





export const EditAction = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  // eslint-disable-next-line
  const [perc, setPerc] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [currentImage, setCurrentImage] = useState(
    "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
  );
  const [currentName, setCurrentName] = useState("");
  const [currentbio, setCurrentBio] = useState("");

  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const userProfile = doc(db, "users", currentUserId);

  const updateProfile = async () => {
    await updateDoc(userProfile, {
      ...data,
      name: currentName,
      bio: currentbio,
    });

    const querySnapshot = await getDocs(
      query(collection(db, "post"), where("owner", "==", currentUserId))
    );

    const postUpdates = querySnapshot.docs.map((doc) => {
      const postRef = doc.ref;
      return updateDoc(postRef, {
        ...data,
        name: currentName,
        bio: currentbio,
      });
    });

    await Promise.all(postUpdates);

    if (currentUserId) {
      navigate(`/profile/${currentUserId}`);
    }
  };

  useEffect(() => {
    const fetchCurrentData = async () => {
      const docSnapshot = await getDoc(userProfile);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        if (userData.name) {
          setCurrentName(userData.name);
        }
        if (userData.img) {
          setCurrentImage(userData.img);
        }
        if (userData.bio) {
          setCurrentBio(userData.bio);
        }
      }
    };

    fetchCurrentData();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
            setImageUrl(downloadURL); 
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  return {
    imageUrl,
    currentImage,
    setFile,
    setCurrentName,
    currentbio,
    updateProfile,
    setCurrentBio,
    currentName,
    navigate,
  };
};




export const CreatingPost = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [time, setTime] = useState([]);

  const handleChange = (event) => {
    const selectedTags = event.target.value;
    setTags(selectedTags);
  };

  let formIsValid = false;

  const {
    value: participants,
    isValid: enteredNumberIsValid,
    valueChangeHandler: numberChangeHandler,
    hasError: participantsInputHasError,
    InputBlurHandler: participantsBlurHandler,
  } = useInput((value) => /^\d+$/.test(value) && parseInt(value) <= 30);

  const {
    value: description,
    isValid: enteredUrlIsValid,
    InputBlurHandler: descriptionBlurHandler,
    hasError: descriptionInputHasError,
    valueChangeHandler: urlChangeHandler,
  } = useInput((value) => value.trim() !== "");

  if (enteredNumberIsValid && enteredUrlIsValid) {
    formIsValid = true;
  }

  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  
  const colletionRef = collection(db, "users");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(colletionRef, where("id", "==", currentUserId));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setUsers(items);
    });
    return () => {
      unsub();
    };

    // eslint-disable-next-line
  }, []);

  const postCollection = collection(db, "post");

  async function createPost() {
    const owner = currentUser ? currentUser.uid : "unknown";
    const userRef = doc(db, "users", owner);
    const userSnapshot = await getDoc(userRef);
    const userName = userSnapshot.exists()
      ? userSnapshot.data().name
      : "unknown";
    const userImage = userSnapshot.exists()
      ? userSnapshot.data().img
      : "unknown";
    const newTime = new Date(time).toISOString().split("T")[0];
    const id = uuidv4();

    const newPost = {
      name: userName,
      description: description,
      participants: participants,
      id: id,
      tags: tags,
      link: "",
      likes: [],
      time: newTime.toString(),
      owner,
      img: userImage,
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    };

    try {
      const postRef = doc(postCollection, newPost.id);
      await setDoc(postRef, newPost);

      navigate("/home");
    } catch (error) {}
  }

  const name = users.map((user) => {
    return (
      <Link
        as={Link}
        to={`/profile/${currentUserId}`}
        style={{
          textDecoration: "none",
          color: "#3C3A3B",
        }}
        key={user.id}
      >
        {user.name}
      </Link>
    );
  });

  const avatar = users.map((user) => (
    <div key={user.id}>
      <Avatar as={Link} to={`/profile/${currentUserId}`} src={user.img} />
    </div>
  ));

  return {
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
    setTags,
    tags,
    handleChange,
    participantsInputHasError,
    participantsBlurHandler,
    descriptionInputHasError,
    descriptionBlurHandler,
  };
};
