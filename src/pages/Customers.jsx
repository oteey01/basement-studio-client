import React, { useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Toolbar,
  Sort,
  Edit,
  Filter,
} from "@syncfusion/ej2-react-grids";
import {
  customerGrid,
  customersData,
  customersGrid,
} from "../data/dummy";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { useDisclosure } from "../hooks/use-disclosure";
import Input from "../components/Input";
import { Formik } from "formik";
import { Modal } from "../components/Modal";
import { IoIosClose } from "react-icons/io";
import * as Yup from "yup";
import DisplayTemplate from "../components/DisplayTemplate";
import {
  useAddcustomers,
  useCustomers,
  useDeleteCustomers,
  useUpdateCustomers,
} from "../hooks/api/customers";
// import Select from 'react-select';

const defaultFormData = {
  customerName: "",

  email: "",

  location: "",
};

const validationSchema = Yup.object({
  customerName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Please enter project name"),
  email: Yup.string()
    .email()
    .required("please enter email"),
  location: Yup.string(),
});

const Customer = () => {
  const postMutation = useAddcustomers();
  const getMutation = useCustomers();
  const updateMutation = useUpdateCustomers();
  const deleteMutaion = useDeleteCustomers();
  // const [postType, setPostType] = useState(null); // UPDATE or CREATE or NULL

  return (
    <DisplayTemplate
      postMutation={postMutation}
      getMutation={getMutation}
      updateMutation={updateMutation}
      deleteMutation={deleteMutaion}
      defaultFormData={defaultFormData}
      formField={FormField}
      validationSchema={validationSchema}
      title={"Customer"}
      columns={customerGrid}
    />
  );
};

const FormField = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}) => {
  return (
    <div className="w-full max-w-[400px] flex flex-col gap-5">
      <div>
        <Input
          placeholder={"Customer Name"}
          value={values.customerName}
          name={"customerName"}
          className={"w-full"}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.customerName &&
        errors.customerName ? (
          <div className="text-xs text-red-400">
            {errors.customerName}
          </div>
        ) : null}
      </div>

      {/* <Input placeholder = {'Status'} value= name={'status'} className={"w-full"} onChange={handleChange}/> */}

      <div>
        <Input
          placeholder={"email"}
          value={values.email}
          type={"text"}
          name={"email"}
          className={"w-full"}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email ? (
          <div className="text-xs text-red-400">
            {errors.email}
          </div>
        ) : null}
      </div>

      <div>
        <Input
          placeholder={"location"}
          value={values.location}
          name={"location"}
          type={"text"}
          className={"w-full"}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default Customer;
