import { useState } from "react";
import { ordersGrid } from "../data/dummy";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { useDisclosure } from "../hooks/use-disclosure";
import Input from "../components/Input";
import { Formik } from "formik";
import { Modal } from "../components/Modal";
import { IoIosClose } from "react-icons/io";
import Select from "react-select";
import { MdDelete } from "react-icons/md";
import * as Yup from "yup";
import {
  useAddProjects,
  useDeleteProjects,
  useProjects,
  useUpdateProjects,
} from "../hooks/api/projects";
// import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import Table from "../components/Table";
import DragDrop from "../components/ImageInput";

const options = [
  { value: "pending", label: "pending" },
  { value: "active", label: "active" },
  { value: "terminated", label: "terminated" },
];

const validationSchema = Yup.object({
  projectName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Please enter project name"),
  status: Yup.string().required(
    "please select status"
  ),
  budget: Yup.number().required(
    "please enter budget"
  ),
  duration: Yup.number().required(
    "please enter duration"
  ),
});

const defaultProjectFormData = {
  projectName: "",
  status: "pending",
  budget: 0,
  duration: 0,
  file: null,
};

const Orders = () => {
  const { currentColor } = useStateContext();
  const [projectFormData, setProjectFormData] =
    useState(null);
  const [postState, setPostState] =
    useState(null);

  const [uploadedPic, setUploadedPic] =
    useState(null);

  const {
    isOpen: isCreateModalOpen,
    close: closeCreateModal,
    open: openCreateModal,
  } = useDisclosure();
  const {
    isOpen: deleteModalOpen,
    close: closeDeleteModal,
    open: openDeleteModal,
  } = useDisclosure();
  //  const {isOpen:isUpdateModalOpen, close:closeUpdateModal, open:openUpdateModal} = useDisclosure()
  const addProjectMutation = useAddProjects();
  const updateProjectMutation =
    useUpdateProjects();
  const deleteProjectMutation =
    useDeleteProjects();
  const { data, isError, isLoading } =
    useProjects();

  // const table = useReactTable({ data:ordersData, columns:ordersGrid, getCoreRowModel: getCoreRowModel() })

  const handleCreate = () => {
    setPostState("create");
    openCreateModal();
  };

  const handleCloseModal = () => {
    closeCreateModal();
    setProjectFormData(null);
  };
  const handleEdit = (id, props) => {
    setPostState("update");
    console.log(id, props);
    setProjectFormData({
      id: id,
      projectName: props.projectName,
      status: props.status,
      budget: props.budget,
      duration: props.duration,
    });
    openCreateModal();
  };
  const handleDeleteModal = (id) => {
    setProjectFormData({ id });
    openDeleteModal();
  };

  const handleSubmit = (
    values,
    { setSubmitting }
  ) => {
    if (postState === "update") {
      // if there is content to be edited update project
      console.log(values.id);

      updateProjectMutation.mutate(
        values,
        values.id
      );
    } else {
      console.log("creating...");
      // create new instead
      addProjectMutation.mutate(values);
    }
    console.log("submitting...");
    setSubmitting(false);
    setProjectFormData(null);
    closeCreateModal();
  };

  const handleDelete = () => {
    deleteProjectMutation.mutate(
      projectFormData.id
    );
    closeDeleteModal();
  };

  const handlePicUpload = ({
    val,
    setFieldValue,
  }) => {
    const file = val[0];
    setUploadedPic(URL.createObjectURL(file));
    setFieldValue("file", file);
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl flex-1">
      <Header title="Projects" category="Page" />

      {isCreateModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          close={handleCloseModal}
          dialogClassName={
            " w-full h-full max-w-[600px] bg-white py-5"
          }
        >
          <div className="w-full flex justify-between p-2 px-3 mb-3">
            <p className="font-semibold">
              {postState === "update"
                ? "Edit Project"
                : "New Project"}
            </p>
            <button
              className="text-lg text-gray-500"
              onClick={handleCloseModal}
            >
              <IoIosClose
                style={{ fontSize: "30px" }}
              />
            </button>
          </div>

          <div className="flex justify-center items-center">
            <Formik
              initialValues={
                projectFormData ??
                defaultProjectFormData
              }
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isValid,
                setFieldValue,
                /* and other goodies */
              }) => (
                <form
                  className="w-full max-w-[400px] flex flex-col gap-5"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <Input
                      placeholder={"Project Name"}
                      value={values.projectName}
                      name={"projectName"}
                      className={"w-full"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.projectName &&
                    errors.projectName ? (
                      <div className="text-xs text-red-400">
                        {errors.projectName}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-gray-500/80 capitalize text-sm">
                      Select project status
                    </p>
                    <Select
                      name="status"
                      placeholder="Status"
                      value={{
                        value: values.status,
                        label: values.status,
                      }}
                      onChange={(val) => {
                        setFieldValue(
                          "status",
                          val.value
                        );
                      }}
                      options={options}
                      className="border-gray-400/30 dark:border-gray-100 rounded-sm"
                      onBlur={handleBlur}
                    />
                    {touched.status &&
                    errors.status ? (
                      <div className="text-xs text-red-400">
                        {errors.status}
                      </div>
                    ) : null}
                  </div>
                  {/* <Input placeholder = {'Status'} value= name={'status'} className={"w-full"} onChange={handleChange}/> */}

                  <div>
                    <Input
                      placeholder={"Budget"}
                      value={values.budget}
                      type={"number"}
                      name={"budget"}
                      className={"w-full"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      min={0}
                    />
                    {touched.budget &&
                    errors.budget ? (
                      <div className="text-xs text-red-400">
                        {errors.budget}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <Input
                      placeholder={
                        "Duration (Weeks)"
                      }
                      value={values.duration}
                      name={"duration"}
                      type={"number"}
                      className={"w-full"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      min={0}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-gray-500/80 capitalize text-sm">
                      Select Picture
                    </p>

                    {values.file && (
                      <button
                        onClick={() => {
                          setUploadedPic(null);
                          setFieldValue(
                            "file",
                            null
                          );
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
                          URL.revokeObjectURL(
                            uploadedPic
                          );
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

                  <button
                    type="submit"
                    disabled={
                      !isValid ||
                      isSubmitting ||
                      addProjectMutation.isLoading
                    }
                    className=" disabled:opacity-30 disabled:cursor-not-allowed text-white py-2 px-2 rounded-sm data-[disabled]:opacity-30"
                    style={{
                      background: currentColor,
                    }}
                  >
                    {postState === "update"
                      ? "Update"
                      : "Create"}
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </Modal>
      )}

      {deleteModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          close={closeDeleteModal}
          dialogClassName={
            "flex flex-col gap-6 w-fit h-fit max-w-[600px] bg-white p-7"
          }
        >
          <p className="font-semibold text-lg">
            You are about to delete this row
          </p>
          <div className="flex gap-2 justify-end items-center">
            <button
              className="border border-gray-400 px-2 py-1"
              onClick={closeDeleteModal}
            >
              Cancel
            </button>
            <button
              className="bg-slate-900 text-white px-2 py-1"
              onClick={handleDelete}
            >
              Proceed
            </button>
          </div>
        </Modal>
      )}

      <button
        onClick={() => {
          handleCreate();
        }}
        style={{ background: currentColor }}
        className="text-white bg-main-bg my-4 px-2 py-1 rounded-sm"
      >
        New Project +
      </button>

      <div className="w-full flex justify-center">
        {isLoading && (
          <p className="absolute z-10 top-[50%] left-[50%]">
            loading...
          </p>
        )}
        {isError && (
          <p>Oops!, Failed to fetch data</p>
        )}
      </div>
      {data && data.length > 0 && (
        <Table
          data={[...data]}
          columns={ordersGrid({
            handleEdit,
            handleDelete: handleDeleteModal,
          })}
        />
      )}

      {data && data.length === 0 && (
        <p>
          Click 'New Project' to create your first
          project!
        </p>
      )}
    </div>
  );
};

export default Orders;
