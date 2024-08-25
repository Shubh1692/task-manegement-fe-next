"use client"
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Grid,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import API from "../../config/api";
import { toast } from "react-toastify";
import { Task } from "@/interface/task";

const AddCard = styled(Card)(() => ({
  borderRadius: "16px",
  width: "100%",
  padding: "26px",
  boxShadow: "0px 8px 30px rgba(141, 31, 36, 0.12)",
  margin: 10,
}));
const UpsertTask = ({ onClose, task }: {
  onClose: Function, task: Task
}) => {
  const [formValues, setFormValues] = useState(task);
  const api = new API();
  const handleTaskSubmit = async (event: any) => {
    event.preventDefault();
    const inputData: Task = { ...formValues };
    if (task.id) {
      const response = await api.put(`task/${task.id}`, inputData);
      if (response) {
        toast.success("Your task updated successfully");
        onClose(inputData, true);
      }
    } else {
      inputData.id = undefined as unknown as string;
      const response = await api.post("task", inputData);
      if (response) {
        toast.success("Your task created successfully");
        onClose(response, false);
      }
    }
  };

  const onChangeFormValue = (key: string, value: string) => {
    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Grid item lg={12}>
        <Box
          component="form"
          onSubmit={handleTaskSubmit}
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
          }}
        >
          <AddCard>
            <Box>
              <Box
                //  noValidate
                sx={{ mt: 1, textAlign: "center", width: "100%" }}
              >
                <Typography
                  component="span"
                  sx={{ fontWeight: "bold", fontSize: "20px", mb: 5 }}
                >
                  {task.id ? "Update" : "Create"} Task
                </Typography>
                <Box sx={{ textAlign: "left" }}>
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: "400",
                      fontSize: "16px",
                      mb: 1,
                      mt: 1,
                    }}
                  >
                    Title
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    inputProps={{ minLength: 3, maxLength: 15 }}
                    name="title"
                    type={"text"}
                    id="title"
                    size="small"
                    sx={{ mb: 1, mt: 1 }}
                    value={formValues.title}
                    onChange={(e) => onChangeFormValue("title", e.target.value)}
                  ></TextField>
                </Box>
                <Box sx={{ textAlign: "left", marginTop: "10px" }}>
                  <Typography
                    component="span"
                    sx={{ fontWeight: "400", fontSize: "16px" }}
                  >
                    Description
                  </Typography>
                  <TextField
                    fullWidth
                    id="description"
                    name="description"
                    autoComplete="description"
                    inputProps={{ maxLength: 300 }}
                    type="textarea"
                    autoFocus
                    rows={4}
                    sx={{ mb: 1, mt: 1 }}
                    value={formValues.description}
                    multiline
                    maxRows={4}
                    onChange={(e) =>
                      onChangeFormValue("description", e.target.value)
                    }
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "start",
                justifyContent: "space-around",
                flexWrap: "wrap" /* No wrapping by default */,
                gap: 1,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  borderRadius: 18,
                  flex: "1 1 200px",
                  width: "50%",
                  textTransform: "capitalize",
                }}
              >
                {task.id ? "Update" : "Create"} Task
              </Button>
              <Button
                type="button"
                variant="outlined"
                sx={{
                  borderRadius: 18,
                  flex: "1 1 200px",
                  width: "50%",
                  textTransform: "capitalize",
                }}
                onClick={() => onClose()}
              >
                Cancel
              </Button>
            </Box>
          </AddCard>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UpsertTask;
