import React from "react";
import Box from "@mui/material/Box";
import AddTask from "./components/AddTask";
import Tasks from "./components/TasksList";

export default function App() {
  return (
    <Box sx={{
      minHeight: '100vh',
      py: "100px",
      display: 'flex',
      justifyContent: "center",
      alignItems: "start",
    }}>
      <Tasks />
      <AddTask />
    </Box>
  );
}
