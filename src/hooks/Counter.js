import { useState} from "react";
import { db } from "../Firebase/Firebase1";
import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";


export const deletePost = async (postId) => {
  try {
    await deleteDoc(doc(db, "post", postId));
    console.log("Post deleted successfully!");
  } catch (error) {
    console.error("Error deleting post: ", error);
  }
};

export const useDeleteComment = () => {
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  const deleteComment = async (commentId) => {
    try {
      const collectionRef = collection(db, "Comments");
      const querySnapshot = await getDocs(
        query(collectionRef, where("id", "==", commentId))
      );

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );

      setCommentCount((prevCount) => prevCount - 1);

      console.log("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return {
    deleteComment,
    comments,
    commentCount,
    setComments,
    setCommentCount,
  };
};


export function countComments(comments) {
  if (comments && Array.isArray(comments)) {
    return comments.length;
  }
  return 0;
}

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("following");
  const [userId, setUserId] = useState(null);

 const openModal = (type, userId = null) => {

   setIsModalOpen(true);
   setModalType(type);
   setUserId(userId); 
 };

 const closeModal = () => {
   setIsModalOpen(false);
   setModalType("");
   setUserId(null); 
 };

  return {
    isModalOpen,
    modalType,
    openModal,
    closeModal,
    setIsModalOpen,
    userId
  };
};











