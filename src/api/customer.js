import { transformCustomerData } from "../utils/transform";
import { api } from "./shared/route";

const customerRoute = "/customers";

export const fetchCustomers = () =>
  api
    .get(customerRoute)
    .then((res) =>
      transformCustomerData(res.data)
    );
export const addcustomer = async (
  newCustomer
) => {
  return api
    .post(customerRoute, newCustomer)
    .then((res) => {
      return res.data;
    });
};

export const updateCustomer = async (
  updatedCustomer
) => {
  const id = updatedCustomer.id;
  return api
    .patch(
      `${customerRoute}/${id}`,
      updatedCustomer
    )
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};
export const deleteCustomer = async (id) => {
  return api
    .delete(`${customerRoute}/${id}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};
