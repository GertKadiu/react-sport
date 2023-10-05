import * as React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

export default function FloatingActionButtonSize() {
  const navigate = useNavigate();

  const StyledFab = styled(Fab)(({ theme }) => ({
    width: "68px",
    height: "68px",
    backgroundColor: "#118C94",
    position: "fixed",
    right: "40%",
    top: "83%",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#0c7b83",
    },

    [theme.breakpoints.only("xs")]: {
      right: "10%",
      top: "80%",
    },
    [theme.breakpoints.only("sm")]: {
      right: "30%",
      top: "80%",
    },
  }));

  return (
    <StyledFab onClick={() => navigate("/create")} aria-label="add">
      <AddIcon
        sx={{
          width: "30px",
          height: "38px",
        }}
      />
    </StyledFab>
  );
}
