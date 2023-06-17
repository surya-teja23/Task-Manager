import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useValues } from "../context/ContextProvider";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Cancel, Edit, Loop } from "@mui/icons-material";

export default function EditTask({ task }) {
  const { setTasks } = useValues();
  const mediumScreen = useMediaQuery("(min-width: 800px)");

  // State for modal to edit a specific task.
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editMsg, setEditMsg] = useState("");

  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskStatus, setTaskStatus] = useState(task.status);

  function confirmEditing() {
    setEditModalOpen(true);
    setConfirmEdit(true);
  }

  async function editTask(e, id) {
    e.preventDefault();
    setConfirmEdit(false);
    setIsEditing(true);
    try {
      let response = await fetch(`http://localhost:3500/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: taskTitle,
          description: taskDescription,
          status: taskStatus,
        }),
      });

      if (!response.ok) throw Error("Failed to Update task");
      let data = await response.json();
      setTasks([...data]);
      setEditMsg("Updation Successful");
    } catch (err) {
      setEditMsg(err.message);
    } finally {
      setTimeout(() => {
        setIsEditing(false);
        setEditModalOpen(false);
        setEditMsg("");
      }, 1000);
    }
  }

  function cancelEditing() {
    setEditModalOpen(false);
    setConfirmEdit(false);
  }
  return (
    <>
      {mediumScreen ? (
        <Button
          onClick={confirmEditing}
          size="large"
          color="primary"
          endIcon={<Edit />}
        >
          Edit
        </Button>
      ) : (
        <IconButton onClick={confirmEditing} size="large" color="primary">
          <Edit fontSize="inherit" />
        </IconButton>
      )}
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={editModalOpen}
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
          {confirmEdit && (
            <Box component="form" onSubmit={(e) => editTask(e, task._id)}>
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
                sx={{ my: 3 }}
                value={taskDescription}
                inputProps={{ maxLength: 200 }}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  labelId="status"
                  id="simple-select"
                  value={taskStatus}
                  label="Status"
                  onChange={(e) => setTaskStatus(e.target.value)}
                >
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
              </FormControl>
              <ButtonGroup
                size="large"
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
              >
                <Button
                  color="error"
                  onClick={cancelEditing}
                  startIcon={<Cancel />}
                >
                  Cancel
                </Button>
                <Button type="submit" color="primary" endIcon={<Loop />}>
                  Update Task
                </Button>
              </ButtonGroup>
            </Box>
          )}
          {isEditing && (
            <Box textAlign="center">
              <CircularProgress />
              <Typography variant="h5" mt={5}>
                {editMsg}
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
