import React, { useState } from "react";
import {
  designationOptions,
  employeeGrid,
  employeesData,
  employeesGrid,
} from "../data/dummy";
import { Header } from "../components";
import { Modal } from "../components/Modal";
import { Formik } from "formik";
import Input from "../components/Input";
import Select from "react-select";
import { IoIosClose } from "react-icons/io";
import { useDisclosure } from "../hooks/use-disclosure";
import { useStateContext } from "../contexts/ContextProvider";
import { capitalizeFirstWord } from "@syncfusion/ej2-react-schedule";
import * as Yup from "yup";
import { MdDelete } from "react-icons/md";
import DragDrop from "../components/ImageInput";
import Table from "../components/Table";
import {
  useAddEmployees,
  useDeleteEmployees,
  useEmployees,
  useUpdateEmployees,
} from "../hooks/api/employees";
import DisplayTemplate from "../components/DisplayTemplate";

const initialValues = {
  employeeName: "",
  designation: "unassigned",
  location: "Nigeria",
  reportsTo: "",
  file: null,
};

const validationSchema = Yup.object({
  employeeName: Yup.string()
    // .max(15, "Must be 15 characters or less")
    .required("Please enter employee name"),
  designation: Yup.string().required(
    "please select designation"
  ),
  location: Yup.string(),
  // .required(
  //   "please select country"
  // ),
  email: Yup.string()
    .email()
    .required("please enter email"),
});

const Employees = () => {
  const postMutation = useAddEmployees();
  const getMutation = useEmployees();
  const updateMutation = useUpdateEmployees();
  const deleteMutaion = useDeleteEmployees();

  // console.log(getMutation.data);
  return (
    <DisplayTemplate
      postMutation={postMutation}
      getMutation={getMutation}
      updateMutation={updateMutation}
      deleteMutation={deleteMutaion}
      defaultFormData={initialValues}
      formField={FormField}
      validationSchema={validationSchema}
      title={"Employee"}
      columns={employeeGrid}
    />
  );
};

const FormField = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  handlePicUpload,
  setFieldValue,
  setUploadedPic,
  uploadedPic,
}) => {
  //(values);
  return (
    <div className="w-full max-w-[400px] flex flex-col gap-3">
      <Input
        placeholder={"Employee Name"}
        value={values.employeeName}
        name={"employeeName"}
        className={"w-full"}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <Input
        placeholder={"Email"}
        value={values.email}
        name={"email"}
        type={"text"}
        className={"w-full"}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      {/* <Input placeholder = {'Status'} value= name={'status'} className={"w-full"} onChange={handleChange}/> */}
      <div className="flex flex-col gap-2">
        <p className="text-gray-500/80 capitalize text-sm">
          Department or Designation
        </p>
        <Select
          name="designation"
          placeholder="Designation"
          value={{
            value: values.designation,
            label: values.designation,
          }}
          onChange={(val) => {
            setFieldValue(
              "designation",
              val.value
            );
          }}
          options={designationOptions}
          formatOptionLabel={(data) =>
            capitalizeFirstWord(data.label)
          }
          className="border-gray-400/30 dark:border-gray-100 rounded-sm"
          onBlur={handleBlur}
        />
        {touched.designation &&
        errors.designation ? (
          <div className="text-xs text-red-400">
            {errors.designation}
          </div>
        ) : null}
      </div>

      <Input
        placeholder={"Location"}
        value={values.location}
        name={"location"}
        type={"text"}
        className={"w-full"}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-2">
        <p className="text-gray-500/80 capitalize text-sm">
          Select Picture
        </p>

        {values.file && (
          <button
            onClick={() => {
              setUploadedPic(null);
              setFieldValue("file", null);
            }}
            className="flex gap-1 mt-3"
          >
            <MdDelete
              style={{
                fontSize: "22px",
              }}
              className="text-red-500/80"
            />
            <p className="text-gray-700 text-sm font-medium">
              Remove
            </p>
          </button>
        )}

        {values.file && (
          <img
            src={uploadedPic}
            onLoad={() => {
              URL.revokeObjectURL(uploadedPic);
            }}
          />
        )}
        {!values.file && (
          <DragDrop
            handleChange={(val) =>
              handlePicUpload({
                val,
                setFieldValue,
              })
            }
            name="file"
          />
        )}
      </div>
    </div>
  );
};

export default Employees;
