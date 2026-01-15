import { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Card,
  CardContent,
  TextField,
  TablePagination
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import EmployeeDialog from "../components/EmployeeDialog";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from "../services/employeeService";

export default function Index() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const loadEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleSave = async (data) => {
    if (selectedEmployee) {
      await updateEmployee(selectedEmployee.employeeId, data);
    } else {
      await addEmployee(data);
    }
    setOpen(false);
    setSelectedEmployee(null);
    loadEmployees();
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    loadEmployees();
  };

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Card sx={{ m: 3 }}>
      <CardContent>

        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => setOpen(true)}
        >
          Add Employee
        </Button>

        <TextField
          fullWidth
          size="small"
          label="Search"
          sx={{ mb: 2 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.map((e) => (
              <TableRow key={e.employeeId}>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.email}</TableCell>
                <TableCell>{e.department}</TableCell>
                <TableCell>{e.salary}</TableCell>

                <TableCell>
                  <IconButton onClick={() => {
                    setSelectedEmployee(e);
                    setOpen(true);
                  }}>
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleDelete(e.employeeId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(+e.target.value);
            setPage(0);
          }}
        />

      </CardContent>

      <EmployeeDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        employee={selectedEmployee}
      />
    </Card>
  );
}
