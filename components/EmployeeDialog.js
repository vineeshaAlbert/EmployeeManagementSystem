import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
import { useEffect, useState } from "react";

export default function EmployeeDialog({ open, onClose, onSave, employee }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    salary: ""
  });

  useEffect(() => {
    if (employee) setForm(employee);
    else setForm({ name: "", email: "", department: "", salary: "" });
  }, [employee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {employee ? "Edit Employee" : "Add Employee"}
      </DialogTitle>

      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          name="name"
          fullWidth
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          fullWidth
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Department"
          name="department"
          fullWidth
          value={form.department}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Salary"
          name="salary"
          fullWidth
          value={form.salary}
          onChange={handleChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSave(form)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
