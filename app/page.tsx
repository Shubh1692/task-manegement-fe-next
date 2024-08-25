"use client"
import React, { useEffect, useState, useCallback, useMemo } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Box,
  Typography,
  Button,
  Stack,
  useTheme,
  CircularProgress,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  IconButton,
  Grid,
} from "@mui/material";
import API from "@/config/api";
import { toast } from "react-toastify";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import UpsertTask from "@/components/upsert-task";
import { Task } from "@/interface/task";

const Tasks = () => {
  const api = useMemo(() => new API(), []);
  const theme = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [deleteTaskInfo, setDeleteInfo] = useState({
    id: "",
    isLoading: false,
  });
  const [upsertTaskInfo, setUpsertTaskInfo] = useState({
    task: {
      id: "",
      title: "",
      description: "",
    },
    show: false,
    index: -1,
  });
  const fetchTasks = useCallback(async () => {
    const response = await api.get("task");
    if (response) {
      setTasks([...response]);
    }
  }, [api]);

  const onUpsertTask = (task: Partial<Task>, index: number) => {
    setUpsertTaskInfo({
      task: {
        id: task?.id || "",
        title: task?.title || "",
        description: task?.description || "",
      },
      index,
      show: true,
    });
  };

  const onDeleteTask = async () => {
    if (deleteTaskInfo.isLoading) {
      return;
    }
    try {
      setDeleteInfo({
        ...deleteTaskInfo,
        isLoading: true,
      });
      const response = await api.delete(`task/${deleteTaskInfo.id}`);
      if (response) {
        setDeleteInfo({
          ...deleteTaskInfo,
          isLoading: false,
          id: "",
        });
        toast.success("Delete successfully");
        fetchTasks();
      }
    } catch (error: any) {
      setDeleteInfo({
        ...deleteTaskInfo,
        isLoading: false,
      });
      toast.error(error?.message || error);
    }
  };

  const onCloseUpsertModel = (task: Task, index: number) => {
    if (task) {
      const updatedTasks = [...tasks];
      debugger
      if (index > -1) {
        updatedTasks[index] = task;
      } else {
        updatedTasks.unshift(task);
      }
      setTasks([...updatedTasks]);
    }
    setUpsertTaskInfo({
      task: {
        id: "",
        title: "",
        description: "",
      },
      show: false,
      index: -1,
    });
  };
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Stack sx={{ width: "85%", maxWidth: "1280px", marginTop: "6pc" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                marginBottom: 10,
              }}
            ></Box>
            <Button
              variant="contained"
              sx={{ borderRadius: "8px", float: "right" }}
              onClick={() =>
                onUpsertTask(
                  {
                    title: "",
                    description: "",
                    id: "",
                  },
                  -1
                )
              }
            >
              Add Task
            </Button>
          </Box>
          <Grid container spacing={2}>
            {tasks.map(({ title, description, id }, index) => {
              return (
                <Grid
                  sx={{
                    width: "100%",
                  }}
                  key={id}
                  xs={12}
                  md={4}
                  item
                  lg={2}
                >
                  <Card>
                    <CardHeader title={title} />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {description}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton
                        aria-label="edit"
                        onClick={() =>
                          onUpsertTask(
                            {
                              title,
                              description,
                              id,
                            },
                            index
                          )
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() =>
                          setDeleteInfo({
                            ...deleteTaskInfo,
                            id,
                          })
                        }
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </Box>
      <Dialog
        open={!!deleteTaskInfo.id || false}
        sx={{ padding: "20px", borderRadius: "16px" }}
      >
        <DialogTitle sx={{ textAlign: "center", width: "100%" }}>
          Delete Task
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{ fontSize: "14px", textTransform: "capitalize", mb: 2 }}
          >
            Are you sure you want to delete this task?
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Button
              variant="contained"
              sx={{
                fontSize: "15px",
                fontWeight: "600",
                textTransform: "capitalize",
              }}
              onClick={() => onDeleteTask()}
            >
              <CircularProgress
                size={25}
                sx={{
                  color: "#ffffff",
                  display: deleteTaskInfo.isLoading ? "flex" : "none",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <Typography
                sx={{
                  marginLeft: 2,
                  display: !deleteTaskInfo.isLoading ? "flex" : "none",
                }}
              >
                Delete
              </Typography>
            </Button>
            <Button
              disabled={deleteTaskInfo.isLoading}
              variant="outlined"
              onClick={() =>
                setDeleteInfo({
                  id: "",
                  isLoading: false,
                })
              }
              sx={{
                fontSize: "15px",
                fontWeight: "500",
                textTransform: "capitalize",
                color: theme.palette.primary.main,
                mr: 3,
                cursor: "pointer",
              }}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        open={upsertTaskInfo.show}
        sx={{ padding: "20px", borderRadius: "16px" }}
      >
        <UpsertTask
          onClose={(task: Task) => onCloseUpsertModel(task, upsertTaskInfo.index)}
          task={upsertTaskInfo.task}
        />
      </Dialog>
    </>
  );
};
export default Tasks;
