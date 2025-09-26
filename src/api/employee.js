import { transformEmployeeData } from "../utils/transform";
import { api } from "./shared/route";

const employeeRoute = "/employees"

export const fetchEmployees = () => api.get(employeeRoute).then(res => transformEmployeeData(res.data));

export const addEmployee = async (newEmployee) => {

    return api.post(employeeRoute, newEmployee).then(res => {
    return res.data
});}

export const updateEmployee = async (updatedEmployee) => {
    const id = updatedEmployee.id
    return api.patch(`${employeeRoute}/${id}`, updatedEmployee).then(res => {
    console.log(res.data)
    return res.data
}
);
}
export const deleteEmployee = async (id) => {
    return api.delete(`${employeeRoute}/${id}`).then(res => {
    console.log(res.data)
    return res.data
});}


