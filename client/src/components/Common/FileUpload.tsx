import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNewMediaMutation } from "../../generated/graphql";

const FileUpload = () => {
  const [newMedia] = useNewMediaMutation();
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      console.log(file);
      console.log(file instanceof File);

      newMedia({
        variables: {
          file,
        },
      });
    },
    [newMedia]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive && "isActive"}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </>
  );
};

export default FileUpload;
