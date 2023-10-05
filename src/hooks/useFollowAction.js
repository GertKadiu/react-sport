import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { doc, updateDoc, getDoc, arrayRemove } from "firebase/firestore";
import { db } from "../Firebase/Firebase1";

const useFollowAction = (userId) => {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followerNames, setFollowerNames] = useState([]);
  const [followingNames, setFollowingNames] = useState([]);
  const [followingIds, setFollowingIds] = useState([]);
  const [followerIds, setFollowerIds] = useState([]);

  useEffect(() => {

    const fetchFollowerNames = async () => {
      if (currentUserId) {
        const userDoc = doc(db, "users", currentUserId);
        const userSnapshot = await getDoc(userDoc);
        const userData = userSnapshot.data();
        const followers = userData.followers || [];

        const followerNamePromises = followers.map(async (followerId) => {
          const followerDoc = doc(db, "users", followerId);
          const followerSnapshot = await getDoc(followerDoc);
          const followerData = followerSnapshot.data();
          return followerData.name; 
        });

        const followerNames = await Promise.all(followerNamePromises);
        setFollowerNames(followerNames);
        setFollowerCount(followerNames.length);
      }
    };

    const fetchFollowingNames = async () => {
      if (currentUserId) {
        const currentUserDoc = doc(db, "users", currentUserId);
        const currentUserSnapshot = await getDoc(currentUserDoc);
        const currentUserData = currentUserSnapshot.data();
        const following = currentUserData.following || [];

        const followingNamePromises = following.map(async (followingId) => {
          const followingDoc = doc(db, "users", followingId);
          const followingSnapshot = await getDoc(followingDoc);
          const followingData = followingSnapshot.data();
          return followingData.name; 
        });

        const followingNames = await Promise.all(followingNamePromises);
        setFollowingNames(followingNames);
        setFollowingCount(followingNames.length);
      }
    };

    const fetchFollowingIds = async () => {
      if (currentUserId) {
        const currentUserDoc = doc(db, "users", currentUserId);
        const currentUserSnapshot = await getDoc(currentUserDoc);
        const currentUserData = currentUserSnapshot.data();
        const following = currentUserData.following || [];

        const followingIds = following.map(async (followingId) => {
          return followingId;
        });

        const followingIdsArray = await Promise.all(followingIds);
        setFollowingIds(followingIdsArray); 
        setFollowingCount(followingIdsArray.length); 
      }
    };

    const fetchFollowerIds = async () => {
      try {
        if (currentUserId) {
          const userDoc = doc(db, "users", currentUserId);
          const userSnapshot = await getDoc(userDoc);
          const userData = userSnapshot.data();
          const followers = userData.followers || [];

          const followersIdsPromises = followers.map(async (followerId) => {
            return followerId;
          });

          const followersIds = await Promise.all(followersIdsPromises);

          setFollowerIds(followersIds); 
          setFollowerCount(followersIds.length); 
        }
      } catch (error) {
        console.error("Error fetching follower IDs: ", error);
      }
    };

    fetchFollowingIds();
    fetchFollowerNames();
    fetchFollowingNames();
    fetchFollowerIds();
    fetchFollowerNames();
    fetchFollowingNames();
  }, [currentUserId, userId]);

  const handleFollow = async () => {
    try {
      const currentUserDoc = doc(db, "users", currentUserId);
      const currentUserSnapshot = await getDoc(currentUserDoc);
      const currentUserData = currentUserSnapshot.data();
      const following = currentUserData.following || [];

      const userDoc = doc(db, "users", userId);
      const userSnapshot = await getDoc(userDoc);
      const userData = userSnapshot.data();
      const followers = userData.followers || [];

      if (followers.includes(currentUserId)) {
        const newFollowers = followers.filter(
          (followerId) => followerId !== currentUserId
        );
        await updateDoc(userDoc, { followers: newFollowers });
        setFollowerCount(newFollowers.length);
      } else {
        const newFollowers = [...followers, currentUserId];
        await updateDoc(userDoc, { followers: newFollowers });
        setFollowerCount(newFollowers.length);
      }

      if (!following.includes(userId)) {
        const newFollowing = [...following, userId];
        await updateDoc(currentUserDoc, { following: newFollowing });
        setFollowingCount(newFollowing.length);
      } else {
        const newFollowing = following.filter(
          (followingId) => followingId !== userId
        );
        await updateDoc(currentUserDoc, { following: newFollowing });
        setFollowingCount(newFollowing.length);
      }
    } catch (error) {
      console.error("Error following/unfollowing user: ", error);
    }
  };

  const followUnfollowUser = async (userId, isFollowing) => {
    try {
      const currentUserDoc = doc(db, "users", currentUserId);
      const currentUserSnapshot = await getDoc(currentUserDoc);
      const currentUserData = currentUserSnapshot.data();
      const following = currentUserData.following || [];

      console.log(followerIds);

      if (isFollowing) {
        const newFollowing = following.filter(
          (followingId) => followingId !== userId
        );

        await updateDoc(currentUserDoc, {
          following: arrayRemove(userId),
        });

        setFollowingCount(newFollowing.length);
      } else {
        const newFollowing = [...following, userId];
        await updateDoc(currentUserDoc, { following: newFollowing });
        setFollowingCount(newFollowing.length);
      }

      const userDoc = doc(db, "users", userId);
      const userSnapshot = await getDoc(userDoc);
      const userData = userSnapshot.data();
      const followers = userData.followers || [];

      if (isFollowing) {
        const newFollowers = followers.filter(
          (followerId) => followerId !== currentUserId
        );

        await updateDoc(userDoc, { followers: newFollowers });
        setFollowerCount(newFollowers.length);
      } else {
        
        const newFollowers = [...followers, currentUserId];
        await updateDoc(userDoc, { followers: newFollowers });
        setFollowerCount(newFollowers.length);
      }
    } catch (error) {
      console.error("Error following/unfollowing user: ", error);
    }
  };

  // const removeFollowoing = async (userId, isFollowing) => {
  //   try {
  //     const currentUserDoc = doc(db, "users", currentUserId);
  //     const currentUserSnapshot = await getDoc(currentUserDoc);
  //     const currentUserData = currentUserSnapshot.data();
  //     const following = currentUserData.following || [];

  //     console.log(followerIds);

  //     if (isFollowing) {
  //       const newFollowing = following.filter(
  //         (followingId) => followingId !== userId
  //       );

  //       await updateDoc(currentUserDoc, {
  //         following: arrayRemove(userId),
  //       });

  //       setFollowingCount(newFollowing.length);
  //     } else {
  //       const newFollowing = [...following, userId];
  //       await updateDoc(currentUserDoc, { following: newFollowing });
  //       setFollowingCount(newFollowing.length);
  //     }
  //   } catch (error) {
  //     console.error("Error removing follower: ", error);
  //   }
  // };

  const removeFollower = async (userIdToRemove) => {
    try {
      console.log(userIdToRemove);
      if (followerIds.includes(userIdToRemove)) {
        const currentUserDoc = doc(db, "users", currentUserId);

        await updateDoc(currentUserDoc, {
          followers: arrayRemove(userIdToRemove),
        });

        const newFollowerCount = followerCount - 1;
        setFollowerCount(newFollowerCount);
      } else {
        console.warn("Follower not found in followers array.");
      }
    } catch (error) {
      console.error("Error removing follower: ", error);
    }
  };

  return {
    followerCount,
    followingCount,
    handleFollow,
    followerNames,
    followingNames,
    followerIds,
    followingIds,
    followUnfollowUser,
    removeFollower,
    // removeFollowoing,
  };
};

export default useFollowAction;
