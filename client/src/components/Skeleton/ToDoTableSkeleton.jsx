// Material UI components
import TableCell from "@mui/material/TableCell";
import Skeleton from "@mui/material/Skeleton";
import TableRow from "@mui/material/TableRow";

const ToDoTableSkeleton = () => {
  return (
    <TableRow style={{ height: "75px" }}>
      <TableCell component="th" scope="row">
        <Skeleton style={{ height: "43px" }} />
      </TableCell>
      <TableCell style={{ width: 40 }} align="center">
        <Skeleton style={{ height: "43px" }} />
      </TableCell>
      <TableCell style={{ width: 40 }} align="center">
        <Skeleton style={{ height: "43px" }} />
      </TableCell>
    </TableRow>
  );
};

export default ToDoTableSkeleton;
