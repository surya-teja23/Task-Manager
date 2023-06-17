import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useValues } from "../context/ContextProvider";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { Cancel, Check, Delete } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function DeleteTask({task}) {
  const { setTasks } = useValues();
  const mediumScreen = useMediaQuery("(min-width: 800px)");

  // State for modal to delete a specific task.
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletionMsg, setDeletionMsg] = useState("");

  function confirmDeletion() {
    setDeleteModalOpen(true);
    setConfirmDelete(true);
  }

  async function deleteTask(e,id) {
    e.preventDefault()
    setConfirmDelete(false);
    setIsDeleting(true);
    try {
      let response = await fetch(`http://localhost:3500/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw Error("Failed to delete task");
      let data = await response.json();
      setTasks([...data]);
      setDeletionMsg("Deletion Successful");
    } catch (err) {
      setDeletionMsg(err.message);
    } finally {
      setTimeout(() => {
        setDeleteModalOpen(false);
        setIsDeleting(false);
        setDeletionMsg("");
      }, 2000);
    }
  }

  function cancelDeletion() {
    setDeleteModalOpen(false);
    setConfirmDelete(false);
  }
  return (
    <>
      {mediumScreen ? (
        <Button
          onClick={confirmDeletion}
          size="large"
          color="error"
          startIcon={<Delete />}
        >
          Delete
        </Button>
      ) : (
        <IconButton onClick={confirmDeletion} size="large" color="error">
          <Delete fontSize="inherit" />
        </IconButton>
      )}

      {/* Task Delete Modal */}
      <Modal
        component="form"
        onSubmit={(e) => deleteTask(e,task._id)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={deleteModalOpen}
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
          {confirmDelete && (
            <>
              <Typography textAlign="center" variant="h5">
                Are you sure you want to delete this task?
              </Typography>
              <ButtonGroup
                size="large"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                <Button
                  onClick={cancelDeletion}
                  color="error"
                  startIcon={<Cancel />}
                >
                  Cancel
                </Button>
                <Button type="submit" color="primary" endIcon={<Check />}>
                  Confirm
                </Button>
              </ButtonGroup>
            </>
          )}
          {isDeleting && (
            <Box textAlign="center">
              <CircularProgress />
              <Typography variant="h5" sx={{ mt: 2 }}>
                {deletionMsg}
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
