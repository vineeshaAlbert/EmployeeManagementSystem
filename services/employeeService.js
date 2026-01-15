import axios from "axios";

const BASE_URL = "https://localhost:7198/api/Employees";

// GET all employees
export const getEmployees = () => {
  return axios.get(`${BASE_URL}/employees-List`);
};

// GET employee by id
export const getEmployeeById = (id) => {
  return axios.get(`${BASE_URL}/employees/${id}`);
};

// ADD employee
export const addEmployee = (data) => {
  return axios.post(`${BASE_URL}/employees`, data);
};

// UPDATE employee
export const updateEmployee = (id, data) => {
  return axios.put(`${BASE_URL}/employee/${id}`, data);
};

// DELETE employee
export const deleteEmployee = (id) => {
  return axios.delete(`${BASE_URL}/employee/${id}`);
};
