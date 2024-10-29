// useEmployeeAPI.js
import { useState } from "react";

const useEmployeeActions = (url) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addEmployee = async (newEmployee) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });
      if (!response.ok) throw new Error("Failed to add employee");
      const addedEmployee = await response.json();
      setEmployees((prev) => [...prev, addedEmployee]);
    } catch (err) {
      setError(err);
    }
  };

  const updateEmployee = async (updatedEmployee) => {
    try {
      const response = await fetch(`${url}/${updatedEmployee.employeeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployee),
      });
      if (!response.ok) throw new Error("Failed to update employee");
      const newEmployee = await response.json();
      setEmployees((prev) =>
        prev.map((employee) =>
          employee.employeeId === newEmployee.employeeId
            ? newEmployee
            : employee
        )
      );
    } catch (err) {
      setError(err);
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      const response = await fetch(`${url}/${employeeId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete employee");
      setEmployees((prev) =>
        prev.filter((employee) => employee.employeeId !== employeeId)
      );
    } catch (err) {
      setError(err);
    }
  };

  return {
    employees,
    loading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };
};

export default useEmployeeActions;
