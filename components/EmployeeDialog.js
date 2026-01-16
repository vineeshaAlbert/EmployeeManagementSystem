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

  const [errors, setErrors] = useState({});

  useEffect(() => {
  if (employee) {
    setForm(employee);
  } else {
    setForm({
      name: "",
      email: "",
      department: "",
      salary: ""
    });
  }
  setErrors({});
}, [employee, open]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Name & Department: allow letters + space only
    if (name === "name" || name === "department") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    // Salary: digits only
    if (name === "salary") {
      if (!/^\d*$/.test(value)) return;
    }

    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    let temp = {};

    // Name
    if (!form.name.trim()) {
      temp.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
      temp.name = "Name must contain only letters";
    } else if (form.name.trim().length < 3) {
      temp.name = "Name must be at least 3 letters";
    }

    // Email
    if (!form.email.trim()) {
      temp.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      temp.email = "Enter a valid email address";
    }

    // Department
    if (!form.department.trim()) {
      temp.department = "Department is required";
    } else if (!/^[a-zA-Z\s]+$/.test(form.department)) {
      temp.department = "Department must contain only letters";
    } else if (form.department.trim().length < 2) {
      temp.department = "Department must be at least 2 letters";
    }

    // Salary
    if (!form.salary) {
      temp.salary = "Salary is required";
    } else if (Number(form.salary) <= 1000) {
      temp.salary = "Salary must be greater than 1000";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(form);
    }
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
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          margin="dense"
          label="Email"
          name="email"
          fullWidth
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          margin="dense"
          label="Department"
          name="department"
          fullWidth
          value={form.department}
          onChange={handleChange}
          error={!!errors.department}
          helperText={errors.department}
        />

        <TextField
          margin="dense"
          label="Salary"
          name="salary"
          fullWidth
          value={form.salary}
          onChange={handleChange}
          error={!!errors.salary}
          helperText={errors.salary}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
