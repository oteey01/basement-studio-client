import { useState } from "react";
import { Formik } from "formik";
import { IoIosClose } from "react-icons/io";
import Select from "react-select";
import { MdDelete } from "react-icons/md";
import * as Yup from "yup";
import { useStateContext } from "../contexts/ContextProvider";
import { useDisclosure } from "../hooks/use-disclosure";
import Header from "./Header";
import { Modal } from "./Modal";
import { ordersGrid } from "../data/dummy";
import Table from "./Table";
// import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'

// const options = [
//   { value: "pending", label: "pending" },
//   { value: "active", label: "active" },
//   { value: "terminated", label: "terminated" },
// ];

const DisplayTemplate = ({
  postMutation,
  getMutation,
  updateMutation,
  deleteMutation,
  defaultFormData,
  formField: FormField,
  validationSchema,
  title,
  columns,
}) => {
  const { currentColor } = useStateContext();
  const [formData, setFormData] = useState(null);
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

  // const table = useReactTable({ data:ordersData, columns:ordersGrid, getCoreRowModel: getCoreRowModel() })

  const handleCreate = () => {
    setPostState("create");
    openCreateModal();
  };

  const handleCloseModal = () => {
    closeCreateModal();
    setFormData(null);
  };
  const handleEdit = (id, props) => {
    setPostState("update");
    //(id, props);

    setFormData({
      id: id,
      ...props,
    });
    openCreateModal();
  };
  const handleDeleteModal = (id) => {
    setFormData({ id });
    openDeleteModal();
  };

  const handleSubmit = (
    values,
    { setSubmitting }
  ) => {
    if (postState === "update") {
      // if there is content to be edited update project
      //(values.id);

      updateMutation.mutate(values, values.id);
    } else {
      //("creating...");
      // create new instead
      postMutation.mutate(values);
    }
    //("submitting...");
    setSubmitting(false);
    setFormData(null);
    closeCreateModal();
  };

  const handleDelete = () => {
    deleteMutation.mutate(formData.id);
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
      <Header title={`${title}s`} category="" />

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
                ? `Edit ${title}`
                : `New ${title}`}
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
                formData ?? defaultFormData
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
              }) => {
                //(formData);
                return (
                  <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-[400px] flex flex-col gap-5"
                  >
                    {
                      <FormField
                        handlePicUpload={
                          handlePicUpload
                        }
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={
                          handleChange
                        }
                        handleBlur={handleBlur}
                        setFieldValue={
                          setFieldValue
                        }
                        setUploadedPic={
                          setUploadedPic
                        }
                        uploadedPic={uploadedPic}
                      />
                    }
                    <button
                      type="submit"
                      disabled={
                        !isValid ||
                        isSubmitting ||
                        postMutation.isLoading
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
                );
              }}
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
        {`New ${title}`}
      </button>

      <div className="w-full flex justify-center">
        {getMutation.isLoading && (
          <p className="absolute z-10 top-[50%] left-[50%]">
            loading...
          </p>
        )}
        {getMutation.isError && (
          <p>Oops!, Failed to fetch data</p>
        )}
      </div>
      {getMutation.data &&
        getMutation.data.length > 0 && (
          <Table
            data={[...getMutation.data]}
            columns={columns({
              handleEdit,
              handleDelete: handleDeleteModal,
            })}
          />
        )}

      {getMutation.data &&
        getMutation.data.length === 0 && (
          <p>
            {` Click 'New ${title}' to create your
            first ${title}!`}
          </p>
        )}
    </div>
  );
};

export default DisplayTemplate;
