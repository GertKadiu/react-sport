import * as React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

export default function FloatingActionButtonSize() {
  const navigate = useNavigate();

  const StyledFab = styled(Fab)(({ theme }) => ({
    width: "58px",
    height: "58px",
    backgroundColor: "#118C94",
    position: "sticky",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#0c7b83",
    },

    [theme.breakpoints.only("xs")]: {
      right: 16,
      bottom: 16,
      marginLeft: 250,
    },
    [theme.breakpoints.only("md")]: {
      right: 16,
      bottom: 16,
      marginLeft: 250,
    },
    [theme.breakpoints.only("sm")]: {
      right: 16,
      bottom: 16,
      marginLeft: 250,
    },
    [theme.breakpoints.only("lg")]: {
      right: 16,
      bottom: 16,
      marginLeft: 250,
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
