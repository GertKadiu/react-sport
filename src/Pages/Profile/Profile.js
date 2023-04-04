import Avatar from "@mui/material/Avatar";
import Post from "../../Components/Post/Post";
import classes from "./Profile.module.css";
import NavBar from "../../Components/NavBar/NavBar";
import * as React from "react";
import Fab from "../../Components/Fab/Fab";
import Button from "../../Components/Button/Button";
import { ButtonTypes } from "../../Components/Button/ButtonTypes";
import { useNavigate } from "react-router-dom";
import ima2 from "../../Components/Images/kokaxhines.png";

const DUMMY_DATA = [
  {
    key: "p1",
    name: "Hinata",
    description: "Text",
    time: "20-02-2023 15:00",
    participants: "0/5",
    tags: "football",
  },
  {
    key: "p2",
    name: "Hinata",
    description: "Text",
    time: "20-02-2023 15:00",
    participants: "0/5",
    tags: "football",
    likes: "12 Likes",
    comments: "Show all comments",
  },
];

function Profile(props) {
  const navigate = useNavigate();

  return (
    <div className={classes.contanier}>
      <div className={classes.navBar}>
      <NavBar isNavbarProfile name="Hinata" />
      </div>
      <div className={classes.header}>
        <div>
          <Avatar sx={{ width: 74, height: 74 }}>
            <img
              src={ima2}
              alt="background"
              style={{ width: 74, height: 74 }}
            />
          </Avatar>
        </div>
        <div className={classes.follow}>
          <div style={{ fontSize: "16px" }}>20</div>
          <div>Followers</div>
        </div>
        <div className={classes.follow}>
          <div style={{ fontSize: "16px" }}>12</div>
          <div>Following</div>
        </div>
      </div>
      <div className={classes.bio}>Smth for my Bio here.</div>
      <div className={classes.join}>JOINED SINCE 1997</div>
      <Button
        onClick={() => navigate("/edit")}
        type={ButtonTypes.TERTIARY}
        btnText="Edit Profile"
      ></Button>
      <div className={classes.line}>
        <span className={classes.span}>5 Post</span>
      </div>
      <ul>
        {DUMMY_DATA.map((data) => (
          <Post
            key={data.key}
            name={data.name}
            description={data.description}
            time={data.time}
            participants={data.participants}
            tags={data.tags}
            likes={data.likes}
            comments={data.comments}
          />
        ))}
      </ul>
      <Fab />
    </div>
  );
}

export default Profile;
