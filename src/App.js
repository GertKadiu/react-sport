import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Singup from "./Pages/Singup/Singup";
import Home from "./Pages/Home/Home";
import CreatePost from "./Pages/Create/CreatePost";
import Profile from './Pages/Profile/Profile'
import EditProfile from "./Pages/Edit/EditProfile";
import Comments from "./Pages/Comments/Comments";


const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/singup", element: <Singup /> },
  { path: "/home", element: <Home /> },
  { path: "/create", element: <CreatePost /> },
  { path: "/profile", element: <Profile /> },
  { path: "/edit", element: <EditProfile /> },
  { path: "/comments", element: <Comments /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
