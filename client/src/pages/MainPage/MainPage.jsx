// importing dependencies
import React, { useCallback, useContext, useState } from "react";
import { AuthContext } from "context/AuthContext";
import { getApi } from "api/getApi";
// ===------------------------------------------

// Importing components
import ToDoTable from "./components/ToDoTable";
import ToDoForm from "./components/ToDoForm";

// Material UI components
import Container from "@mui/material/Container";

const MainPage = () => {
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(true);
  const [triggerTable, setTriggerTable] = useState(true);

  const { userId } = useContext(AuthContext);
  const userSortedParams = -1;

  const [todos, setTodos] = useState([]);

  const getTodos = useCallback(async () => {
    const params = {
      userId,
      userSortedParams,
    };
    try {
      getApi("/api/todo", params).then((response) => {
        setStatus(response.status);
        setTodos(response.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, [userId, userSortedParams]);

  return (
    <Container maxWidth="xl">
      <ToDoForm
        userId={userId}
        todos={todos}
        setTodos={setTodos}
        getTodos={getTodos}
        setTriggerTable={setTriggerTable}
        loading={loading}
        setLoading={setLoading}
      />
      <div>
        <div className="middle">
          <ToDoTable
            todos={todos}
            setTodos={setTodos}
            getTodos={getTodos}
            status={status}
            triggerTable={triggerTable}
            setTriggerTable={setTriggerTable}
          />
        </div>
      </div>
    </Container>
  );
};

export default MainPage;
