import { db } from "../Firebase/Firebase1";
import { getDoc,doc, updateDoc, arrayRemove, arrayUnion, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";


export function countLikes(likes) {
  if (likes && Array.isArray(likes)) {
    return likes.length;
  }
  return 0;
}

export const useToggleLike = () => {
  const handlePostLike = async (postId, currentUser) => {
    const currentUserId = currentUser ? currentUser.uid : null;

    try {
      const postRef = doc(db, "post", postId);
      const postSnapshot = await getDoc(postRef);
      const postData = postSnapshot.data();

      if (postData.likes && postData.likes.includes(currentUserId)) {
        await updateDoc(postRef, {
          likes: arrayRemove(currentUserId),
        });
        console.log("Post like removed successfully!");
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(currentUserId),
        });
        console.log("Post liked successfully!");
      }
    } catch (error) {
      console.error("Error liking post: ", error);
    }
  };

  return { handlePostLike };
};

export function usePostLike(currentUser, handlePostLike) {
  const handleToggleLike = async (postId, posts, setPosts) => {
    const updatedPosts = [...posts];
    const postIndex = updatedPosts.findIndex((p) => p.id === postId);

    if (postIndex !== -1) {
      const isLiked = updatedPosts[postIndex].likes.includes(currentUser.uid);
      if (isLiked) {
        updatedPosts[postIndex].likes = updatedPosts[postIndex].likes.filter(
          (like) => like !== currentUser.uid
        );
      } else {
        updatedPosts[postIndex].likes.push(currentUser.uid);
      }
      setPosts(updatedPosts);
      await handlePostLike(postId, currentUser);
    }
  };

  return { handleToggleLike };
}
export const GettingAllUsersWichLikedPost = () => {
  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    const fetchAllUsers = async () => {
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);
      const allUsersData = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        allUsersData.push(userData);
      });
      setAllUsers(allUsersData);
    };
    fetchAllUsers();
  }, []);

  return { allUsers };
};


export const GettingAllComments = () => {
  const [allComments, setAllComments] = useState();

  useEffect(() => {
    const fetchAllComments = async () => {
      const commentsCollection = collection(db, "Comments");
      const querySnapshot = await getDocs(commentsCollection);
      const allCommentsData = [];
      querySnapshot.forEach((doc) => {
        const commentData = doc.data();
        allCommentsData.push(commentData);
      });
      setAllComments(allCommentsData);
    };
    fetchAllComments();
  }, []);

  return { allComments };
};