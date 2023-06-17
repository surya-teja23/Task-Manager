import React from "react";
import Box from "@mui/material/Box";
import { useValues } from "../context/ContextProvider";
import {
  Alert,
  Typography,
} from "@mui/material";
import Task from "./Task";

export default function TasksList() {
  const { tasks } = useValues();

  return (
    <Box
      sx={{
        backgroundColor: "rgba(256,256,256,0.6)",
        width: "min(90vw,800px)",
        p: 2,
        borderRadius: 3,
      }}
    >
      <Typography
        textAlign="center"
        variant="h3"
        component="h1"
        sx={{ textDecoration: "underline", mb: 3 }}
      >
        Task Manager
      </Typography>
      {tasks.length ? (
        <>
          {tasks.map((task) => {
            return <Task key={task._id} task={task} />;
          })}
        </>
      ) : (
        <Alert severity="info" sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5">Tasks list is empty</Typography>
        </Alert>
      )}
    </Box>
  );
}
