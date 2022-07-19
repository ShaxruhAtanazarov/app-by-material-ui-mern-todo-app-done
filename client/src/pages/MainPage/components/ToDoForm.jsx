// importing dependencies
import React, { useState, useCallback } from "react";
import { postApi } from "api/postApi";

// ===------------------------------------------
// Importing components
import Btn from "components/Btn";

// Material UI components
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";

const ToDoForm = ({
  userId,
  todos,
  setTodos,
  getTodos,
  setTriggerTable,
  loading,
  setLoading,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    setData({
      text: inputValue,
      userId,
    });
  }, [inputValue, userId]);

  const createTodo = useCallback(async () => {
    if (!inputValue) return;

    postApi("todo/add", data).then((response) => {
      setTodos([...todos], response.data);
    });
    getTodos();
    setInputValue("");
    setTriggerTable(true);
    setLoading(true);
  }, [
    data,
    setTodos,
    todos,
    inputValue,
    getTodos,
    setTriggerTable,
    setLoading,
  ]);

  return (
    <div className="top">
      <div className="top__title" style={{ padding: "30px 0" }}>
        <Typography
          variant="h2"
          component="h4"
          style={{ marginBottom: "20px" }}
        >
          Add Task
        </Typography>
        <div style={{ display: "flex" }}>
          <TextField
            autoComplete="off"
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            label="My todos"
            id="fullWidth"
            style={{ marginRight: "20px" }}
          />
          <Btn buttonTitle={"Add"} disabledBtn={loading} func={createTodo} />
        </div>
      </div>
    </div>
  );
};

export default ToDoForm;
