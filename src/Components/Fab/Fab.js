import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import classes from './fab.module.css';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

export default function FloatingActionButtonSize() {

  const navigate = useNavigate()

return (
  <Box className={classes.MuiFabroot}>
    <Fab
      onClick={() => navigate("/create")}
      sx={{
        width: "58px",
        height: "58px",
        backgroundColor: "#118C94",
        color: "#FFFFFF",
        "&:hover": {
          backgroundColor: "#0c7b83",
        },
      }}
      aria-label="add"
    >
      <AddIcon
        sx={{
          width: "30px",
          height: "38px",
        }}
      />
    </Fab>
  </Box>
);
}