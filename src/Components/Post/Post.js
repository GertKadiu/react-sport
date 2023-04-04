import * as React from "react";
import Avatar from "@mui/material/Avatar";
import clasess from "./Post.module.css";
import Button from "../Button/Button";
import { ButtonTypes } from "../Button/ButtonTypes";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import LongMenu from "../../Menu/Menu";
import Card from "../../UI/Card";
import ima2 from "../../Components/Images/kokaxhines.png";
import { Link } from "react-router-dom";

function Post(props) {
  const { name, description, time, participants, tags, likes, comments } =
    props;

  // const data = [];
  return (
    <Card>
      <div className={clasess.cardHeader}>
        <div className={clasess.profile}>
          <div>
            <Avatar sx={{ width: 40, height: 40 }}>
              <img
                src={ima2}
                alt="background"
                style={{ width: 40, height: 40 }}
              />
            </Avatar>
          </div>
          <div className={clasess.name}>
            <div>{name}</div>
            <div style={{ fontSize: "12px", color: "#666666" }}>1 hour ago</div>
          </div>
        </div>
        <div className={clasess.profile2}>
          <Button type={ButtonTypes.SECONDARY} btnText="join"></Button>
          <LongMenu
            isMenuPost
            style={{ color: "#3C3A3B", width: "22px", height: "22px" }}
          />
        </div>
      </div>
      <div className={clasess.description}>
        <div>{description}</div>
        <div>{description}</div>
      </div>
      <div className={clasess.time}>
        <CalendarMonthIcon sx={{ width: 20, height: 20 }} />
        <div>{time}</div>
      </div>
      <div className={clasess.participants}>
        <PeopleOutlineIcon sx={{ width: 20, height: 20 }} />
        <div>{participants}</div>
      </div>
      <div className={clasess.tags}>
        <div className={clasess.taget}>
          <div>{tags}</div>
        </div>
        <div className={clasess.taget}>
          <div>{tags}</div>
        </div>
        <div className={clasess.taget}>
          <div>{tags}</div>
        </div>
      </div>
      <div className={clasess.line}></div>
      <div className={clasess.icon}>
        <FavoriteBorderIcon sx={{ width: 20, height: 20 }} />
        <AssignmentOutlinedIcon sx={{ width: 20, height: 20 }} />
      </div>
      <div className={clasess.likes}>{likes}</div>
      <Link
        style={{
          color: "#999999",
          fontSize: "smaller",
          textDecoration: "none",
        }}
        to="/comments"
      >
        {comments}
      </Link>
    </Card>
  );
}

export default Post;
