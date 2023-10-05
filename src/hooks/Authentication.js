import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/Firebase1";
import { useState,  } from "react";
import { db } from "../Firebase/Firebase1";
import { setDoc, doc, serverTimestamp } from "@firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const useSignup = (enteredEmail, enteredPassword, enteredName) => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [color] = useState("#3C3A3B");

  const createPost = async (e) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );
      await setDoc(doc(db, "users", res.user.uid), {
        name: enteredName,
        email: enteredEmail,
        img: "",
        bio: "",
        followers: [],
        following: [],
        joinDate: serverTimestamp(),
        lastUpdate: serverTimestamp(),
        id: res.user.uid,
      });
      setIsLoading(true);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  return { error, success, isLoading, color, createPost };
};

export const useLogin = (enteredEmail, enteredPassword, enteredName) => {

const navigate = useNavigate();
const [error, setError] = useState(false);
const [success, setSuccess] = useState(false);
const [isLoading, setIsLoading] = useState(false);
let [color] = useState("#3C3A3B");

const { dispatch } = useContext(AuthContext);

const handleLogin = (e) => {
  e.preventDefault();

  signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatch({ type: "LOGIN", payload: user });
      setIsLoading(true);
    
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/home");
      }, 2000);
    })
    .catch((error) => {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    });
};

return { error, success, isLoading, color, handleLogin };
}

