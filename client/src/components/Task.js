import React from "react";
import Box from "@mui/material/Box";
import {
  ButtonGroup,
  Divider,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import EditTask from "./EditTask";
import ToggleTask from "./ToggleTask";
import DeleteTask from "./DeleteTask";

export default function Task({ task }) {
  const mediumScreen = useMediaQuery("(min-width: 800px)");

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "start" }}>
        <ToggleTask task={task} />
        {mediumScreen ? (
          <>
            {/* On Large Screens */}
            <ButtonGroup
              variant="contained"
              sx={{
                ml: "auto",
                minWidth: "238px",
              }}
            >
              <EditTask task={task} />
              <DeleteTask task={task} />
            </ButtonGroup>
          </>
        ) : (
          <>
            {/* On mobile screens */}
            <Box
              sx={{
                ml: "auto",
                minWidth: "104px",
              }}
            >
              <EditTask task={task} />
              <DeleteTask task={task} />
            </Box>
          </>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />
    </>
  );
}
