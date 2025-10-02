import { transformEmployeeData } from "../utils/transform";
import { api } from "./shared/route";

const employeeRoute = "/employees";

export const fetchEmployees = () =>
  api
    .get(employeeRoute)
    .then((res) =>
      transformEmployeeData(res.data)
    );

export const addEmployee = async (
  newEmployee
) => {
  return api
    .post(employeeRoute, newEmployee, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const updateEmployee = async (
  updatedEmployee
) => {
  const id = updatedEmployee.id;
  //(updatedEmployee);
  return api
    .patch(
      `${employeeRoute}/${id}`,
      updatedEmployee,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => {
      //(res.data);
      return res.data;
    });
};
export const deleteEmployee = async (id) => {
  return api
    .delete(`${employeeRoute}/${id}`)
    .then((res) => {
      //(res.data);
      return res.data;
    });
};
