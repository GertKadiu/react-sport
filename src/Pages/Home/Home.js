import Chip from "../../Components/Chip/Chip";
import Post from "../../Components/Post/Post";
import classes from "./Home.module.css";
import NavBar from "../../Components/NavBar/NavBar";
import * as React from "react";
import Fab from "../../Components/Fab/Fab";
import { FormControl } from "@mui/material";

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
  },
  {
    key: "p3",
    name: "Naruto",
    description: "Text",
    time: "20-02-2023 15:00",
    participants: "5/5",
    tags: "football",
    likes: "12 Likes",
  },
];

function Home(props) {
  return (
    <div className={classes.contanier}>
      <div className={classes.navBar}>
        <NavBar isNavbar />
      </div>
      <FormControl
        sx={{ width: "340px", marginBottom: "4px", marginTop: "66px" }}
      >
        <Chip label="Search tag" />
      </FormControl>
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
          />
        ))}
      </ul>
     
        <Fab />
      
    </div>
  );
}

export default Home;
