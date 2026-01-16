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
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
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

  // 🔴 Delete confirmation state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Load employees
  const loadEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // ADD / UPDATE
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

  // DELETE FLOW
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteEmployee(deleteId);
    setConfirmOpen(false);
    setDeleteId(null);
    loadEmployees();
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  // SEARCH + PAGINATION
  const filtered = employees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Card sx={{ m: 3 }}>
      <CardContent>

        {/* ADD BUTTON */}
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => {
            setSelectedEmployee(null); // ✅ Reset for ADD
            setOpen(true);
          }}
        >
          Add Employee
        </Button>

        {/* SEARCH */}
        <TextField
          fullWidth
          size="small"
          label="Search"
          sx={{ mb: 2 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* TABLE */}
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
                  {/* EDIT */}
                  <IconButton
                    onClick={() => {
                      setSelectedEmployee(e);
                      setOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  {/* DELETE */}
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(e.employeeId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* PAGINATION */}
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

      {/* ADD / EDIT DIALOG */}
      <EmployeeDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        employee={selectedEmployee}
      />

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog open={confirmOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>

        <DialogContent>
          Do you want to remove this employee?
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancelDelete}>No</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
