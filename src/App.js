import Login from "./Pages/Login/Login";
import Singup from "./Pages/Singup/Singup";
import Home from "./Pages/Home/Home";
import CreatePost from "./Pages/Create/CreatePost";
import Profile from "./Pages/Profile/Profile";
import EditProfile from "./Pages/Edit/EditProfile";
import EditPost from "./Pages/EditPost/EditPost";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Comments from "./Pages/Comments/Comments";
import { AuthContext } from "./Context/AuthContext";
import { useContext } from "react";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route
            path="home/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="create"
            element={
              <RequireAuth>
                <CreatePost />
              </RequireAuth>
            }
          />
          <Route path="singup" element={<Singup />} />
          <Route
            path="/comments/:postId"
            element={
              <RequireAuth>
                <Comments />
              </RequireAuth>
            }
          />
          <Route
            path="edit"
            element={
              <RequireAuth>
                <EditProfile />
              </RequireAuth>
            }
          />
          <Route
            path="EditPost/:postId"
            element={
              <RequireAuth>
                <EditPost />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
