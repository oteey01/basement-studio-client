import { useState } from "react";
import Dropzone from "react-dropzone";

const fileTypes = ["JPG", "PNG"];

function DragDrop({ handleChange, ...props }) {
  const handleDrop = (file) => {
    console.log(file);
    handleChange(file);
  };
  return (
    <Dropzone
      onDrop={handleDrop}
      accept={{ "image/jpeg": [".jpeg", ".png"] }}
      maxFiles={1}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div
            {...getRootProps({
              className:
                "cursor-pointer border-dashed border-2 border-gray-500/50 aspect-video flex items-center justify-center",
            })}
          >
            <input
              {...getInputProps({
                ...props,
                className: "text-center",
              })}
            />
            <p>
              Drag 'n' drop a picture here, or
              click to select files
            </p>
          </div>
        </section>
      )}
    </Dropzone>
  );
}

export default DragDrop;
