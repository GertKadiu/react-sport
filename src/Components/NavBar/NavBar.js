import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import LongMenu from "../../Menu/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { FormControl } from "@mui/material";
import { CreatingPost } from "../../hooks/Action";
import { useNavigate } from "react-router-dom";
import img3 from "../../Components/Images/Football.png";

const Icon = (props) => <div>{props.Icon}</div>;

export default function ElevateAppBar(props) {


  const {avatar} = CreatingPost(); 

const navigate = useNavigate();

const handleGoBack = () => {
   // Go back to the previous screen
  navigate(-1);
};

  return (
    <div>
      {props.isNavbar && (
        <React.Fragment>
          <AppBar
            style={{
              backgroundColor: "#3C3A3B",
              display: "flex",
              alignItems: "center", 
              flexDirection:"row",
              justifyContent: "space-between",
              position: "sticky",
              width: 400,
              marginLeft: "5px",
            }}
          >
            <Toolbar>
              <img
                src={img3}
                alt="logo"
                style={{ width: "50px", height: "50px" }}
              />
            </Toolbar>
            <Toolbar
              style={{
                marginRight: "20px",
              }}
            >
              {avatar}
            </Toolbar>
          </AppBar>
        </React.Fragment>
      )}

      {props.isNavbarProfile && (
        <React.Fragment>
          <AppBar
            position="sticky"
            style={{ backgroundColor: "#3C3A3B", width: 390 }}
          >
            <Toolbar>
              {<Icon Icon={props.Icon} onClick={handleGoBack} />}
              <div style={{ marginLeft: 12, fontSize: "16px" }}>
                {props.name}
              </div>
              <div style={{ position: "absolute", right: 0, marginRight: 22 }}>
                <FormControl>
                  <LongMenu
                    Navbar
                    menuType="menu2"
                    name2="Logout"
                    Delete={<LogoutIcon />}
                    style={{ color: "white" }}
                  />
                </FormControl>
              </div>
            </Toolbar>
          </AppBar>
        </React.Fragment>
      )}

      {props.isNavbarComments && (
        <React.Fragment>
          <AppBar
            position="sticky"
            style={{ backgroundColor: "#3C3A3B", width: 390 }}
          >
            <Toolbar>
              {<Icon Icon={props.Icon} onClick={handleGoBack} />}
              <div style={{ marginLeft: 12, fontSize: "16px" }}>
                {props.name}
              </div>
              <div style={{ position: "absolute", right: 0, marginRight: 22 }}>
                <FormControl></FormControl>
              </div>
            </Toolbar>
          </AppBar>
        </React.Fragment>
      )}
    </div>
  );
}
