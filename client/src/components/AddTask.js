import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import { Add, Cancel } from "@mui/icons-material";
import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useValues } from "../context/ContextProvider";

export default function AddTask() {
  const { setTasks } = useValues();
  const theme = useTheme();

  // State for modal to create a task.
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [confirmCreate, setConfirmCreate] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [addMsg, setAddMsg] = useState("");

  // State for storing task details.
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  function confirmCreation() {
    setAddModalOpen(true);
    setConfirmCreate(true);
  }

  async function createTask(e) {
    e.preventDefault();
    setConfirmCreate(false);
    setIsCreating(true);
    try {
      let task = {
        title: taskTitle,
        description: taskDescription,
      };

      let response = await fetch(`https://task-manager-y9np.onrender.com/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw Error("Failed to create task");
      let data = await response.json();
      setTasks([...data]);
      setAddMsg("Task Creation Successfull");
    } catch (err) {
      setAddMsg(err.message);
    } finally {
      setTimeout(() => {
        setAddModalOpen(false);
        setIsCreating(false);
        setAddMsg("");

        setTaskTitle("");
        setTaskDescription("");
      }, 500);
    }
  }

  function cancelCreation() {
    setAddModalOpen(false);
    setConfirmCreate(false);
  }

  return (
    <>
      <Tooltip
        title="Delete"
        onClick={confirmCreation}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          [theme.breakpoints.down("sm")]: {
            right: "50%",
            translate: "50% 0%",
          },
        }}
      >
        <Fab variant="extended" color="error" aria-label="add">
          <Add />
          Add Task
        </Fab>
      </Tooltip>

      {/* Task Create Modal */}
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={addModalOpen}
      >
        <Box
          px={2}
          py={5}
          borderRadius={5}
          bgcolor="white"
          sx={{
            width: "min(90vw,500px)",
          }}
        >
          {confirmCreate && (
            <Box component="form" onSubmit={(e) => createTask(e)}>
              <TextField
                label="Task Title"
                required
                fullWidth
                value={taskTitle}
                inputProps={{ maxLength: 30 }}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <TextField
                label="Task Description"
                required
                fullWidth
                multiline
                maxRows={5}
                sx={{ mt: 3 }}
                value={taskDescription}
                inputProps={{ maxLength: 200 }}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
              <ButtonGroup
                size="large"
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
              >
                <Button
                  color="error"
                  onClick={cancelCreation}
                  startIcon={<Cancel />}
                >
                  Cancel
                </Button>
                <Button type="submit" color="primary" endIcon={<Add />}>
                  Add Task
                </Button>
              </ButtonGroup>
            </Box>
          )}
          {isCreating && (
            <Box textAlign="center">
              <CircularProgress />
              <Typography variant="h5" mt={5}>
                {addMsg}
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
