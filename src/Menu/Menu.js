import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import { auth } from "../Firebase/Firebase1";


const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Icon = (props) => <div>{props.Icon}</div>;

  const { dispatch } = useContext(AuthContext);

  const logout = async () => {
    try {
      await auth.signOut();
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };


  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon style={props.style} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left", 
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right", 
        }}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
            borderRadius: "10px",
          },
        }}
      >
        {/* Case 1 */}
        {props.menuType === "menu1" && (
          <div>
            <MenuItem>
              <ListItemIcon>
                {<Icon onClick={props.onClickEdit} Icon={props.EditIcon} />}
              </ListItemIcon>
              <button
                style={{
                  textDecoration: "none",
                  color: "#3C3A3B",
                  border: "none",
                  backgroundColor: "transparent",
                  fontSize: "18px",
                }}
                onClick={props.onClickEdit}
              >
                {props.name}
              </button>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                {<Icon onClick={props.onClickDelete} Icon={props.Delete} />}
              </ListItemIcon>
              <button
                onClick={props.onClickDelete}
                style={{
                  textDecoration: "none",
                  color: "#3C3A3B",
                  border: "none",
                  backgroundColor: "transparent",
                  fontSize: "18px",
                }}
              >
                {props.name2}
              </button>
            </MenuItem>
          </div>
        )}

        {/* Case 2 */}
        {props.menuType === "menu2" && (
          <div>
            <MenuItem>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                {<Icon onClick={props.onClick} Icon={props.Delete} />}
              </ListItemIcon>
              <button
                onClick={logout}
                style={{
                  textDecoration: "none",
                  color: "#3C3A3B",
                  border: "none",
                  backgroundColor: "transparent",
                  fontSize: "18px",
                }}
              >
                {props.name2}
              </button>
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
}