// importing dependencies
import React, { useCallback, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
// ===------------------------------------------

// Material UI components
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";

// importing components
import NotData from "components/NotData";
import ToDoTableSkeleton from "components/Skeleton/ToDoTableSkeleton";

// importing styles
import "assets/styles/todo-table.scss";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// =================================================================
export default function ToDoTable({
  todos,
  setTodos,
  getTodos,
  status,
  setTriggerTable,
  triggerTable,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    getTodos();
    setTriggerTable(false);
  }, [getTodos, setTriggerTable]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - todos.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteTodo = useCallback(
    async (id) => {
      try {
        await axios
          .delete(
            `/api/todo/delete/${id}`,
            { id },
            { headers: { "Content-Type": "application/" } }
          )
          .then(() => getTodos());
      } catch (error) {
        console.log(error);
      }
    },
    [getTodos]
  );

  const complatedTodo = useCallback(
    async (id) => {
      try {
        await axios
          .put(
            `/api/todo/complete/${id}`,
            { id },
            { headers: { "Content-Type": "application" } }
          )
          .then((response) => {
            setTodos([...todos], response.data);
            getTodos();
          });
      } catch (error) {
        console.log(error);
      }
    },
    [getTodos, setTodos, todos]
  );

  const handleDeleteButton = (id) => {
    deleteTodo(id);
    setTriggerTable(false);
  };

  return (
    <>
      {status === 204 && triggerTable === false && todos.length === 0 ? (
        <NotData />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableBody>
              {todos.length === 0
                ? [...Array(5)].map((todo, index) => (
                    <ToDoTableSkeleton key={index} />
                  ))
                : (rowsPerPage > 0
                    ? todos.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : todos
                  ).map((todo, index) => (
                    <TableRow key={todo._id}>
                      <TableCell component="th" scope="row">
                        <p
                          className={
                            todo.isComplated
                              ? "todo__text complated"
                              : "todo__text"
                          }
                        >
                          {todo.text}
                        </p>
                      </TableCell>
                      <TableCell style={{ width: 40 }} align="right">
                        <Checkbox
                          onClick={() => complatedTodo(todo._id)}
                          checked={todo.isComplated ? true : false}
                          {...label}
                          color="success"
                        />
                      </TableCell>
                      <TableCell style={{ width: 100 }} align="right">
                        <Button
                          className="todo__del-btn"
                          variant="contained"
                          onClick={() => handleDeleteButton(todo._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={5}
                  count={todos.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
