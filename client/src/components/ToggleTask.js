import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useValues } from "../context/ContextProvider";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Modal,
  Typography,
} from "@mui/material";

export default function ToggleTask({ task }) {
  const { setTasks } = useValues();

  // State for modal to toggle a specific task.
  const [toggleModalOpen, setToggleModalOpen] = useState(false);
  const [toggleMsg, setToggleMsg] = useState("");

  async function toggleTask(id) {
    setToggleModalOpen(true);
    try {
      let response = await fetch(`http://localhost:3500/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: !task.status }),
      });

      if (!response.ok) throw Error("Failed to toggle task status");
      const data = await response.json();
      setTasks([...data]);
      setToggleMsg("Task status changed Successfully");
    } catch (err) {
      setToggleMsg(err.message);
    } finally {
      setTimeout(() => {
        setToggleModalOpen(false);
        setToggleMsg("");
      }, 400);
    }
  }

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 28 },
              alignSelf: "start",
            }}
            checked={task.status}
            onChange={() => toggleTask(task._id)}
            color="primary"
          />
        }
        label={
          <Box>
            <Typography
              sx={{ textDecoration: task.status ? "line-through" : "none" }}
              variant="h6"
            >
              {task.title}
            </Typography>
            <Typography
              sx={{ textDecoration: task.status ? "line-through" : "none",textAlign: "justify" }}
              variant="p"
            >
              {task.description}
            </Typography>
          </Box>
        }
      />

      {/* Task Toggle Modal */}
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={toggleModalOpen}
      >
        <Box
          px={2}
          py={5}
          borderRadius={5}
          bgcolor="white"
          textAlign="center"
          sx={{
            width: "min(90vw,500px)",
          }}
        >
          <CircularProgress />
          <Typography variant="h5" sx={{ mt: 2 }}>
            {toggleMsg}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
