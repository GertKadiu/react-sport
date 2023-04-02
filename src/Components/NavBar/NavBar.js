import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Box } from "@mui/system";
import LongMenu from "../../Menu/Menu";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";

function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  marginLeft: 30,

  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: 16,
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  marginRight: "8px",
  height: "100%",
  position: "absolute",
  backgroundColor: "#3C3A3B",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "0ch",
      "&:focus": {
        width: "28ch",
      },
    },
    [theme.breakpoints.up("md")]: {
      width: "0ch",
      "&:focus": {
        width: "28ch",
      },
    },
    [theme.breakpoints.up("xs")]: {
      width: "0ch",
      "&:focus": {
        width: "28ch",
      },
    },
  },
}));

export default function ElevateAppBar(props) {
  const navigate = useNavigate();

  return (
    <div>
      {props.isNavbar && (
        <React.Fragment>
          <ElevationScroll>
            <AppBar
              style={{
                backgroundColor: "#3C3A3B",
                width: 375,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                position: "sticky",
              }}
            >
              <Toolbar>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    sx={{
                      ".css-1i09hnw-MuiInputBase-root .MuiInputBase-input": {
                        paddingLeft: "calc(1em + 70px)",
                      },
                    }}
                  />
                </Search>
                <PermIdentityIcon
                  clickable="true"
                  onClick={() => navigate("/profile")}
                />
              </Toolbar>
            </AppBar>
          </ElevationScroll>
        </React.Fragment>
      )}
      {props.isNavbarProfile && (
        <React.Fragment>
          <ElevationScroll>
            <AppBar
              position="sticky"
              style={{ backgroundColor: "#3C3A3B", width: 375 }}
            >
              <Toolbar>
                <ArrowBackSharpIcon
                  onClick={() => navigate("/home")}
                  sx={{ width: 20, height: 20 }}
                />
                <div style={{ marginLeft: 12, fontSize: "16px" }}>
                  {props.name}
                </div>
                <Box sx={{ marginLeft: 27 }}>
                  <LongMenu isMenuNavbar style={{ color: "white" }} />
                </Box>
              </Toolbar>
            </AppBar>
          </ElevationScroll>
        </React.Fragment>
      )}
      {props.isNavbarComment && (
        <React.Fragment>
          <ElevationScroll>
            <AppBar
              position="sticky"
              style={{ backgroundColor: "#3C3A3B", width: 375 }}
            >
              <Toolbar>
                <ArrowBackSharpIcon
                  onClick={() => navigate("/home")}
                  sx={{ width: 20, height: 20 }}
                />
                <div style={{ marginLeft: 12 }}>{props.name}</div>
              </Toolbar>
            </AppBar>
          </ElevationScroll>
        </React.Fragment>
      )}
    </div>
  );
}
