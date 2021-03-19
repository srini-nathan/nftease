import React, { useEffect, useState } from "react";
import { useNewMediaMutation } from "../../generated/graphql";
import FileUpload from "../Common/FileUpload";

const Playground = () => {
  const [file, setFile] = useState<File | undefined>();

  const [newMedia, newMediaResponse] = useNewMediaMutation();

  useEffect(() => {
    console.log(newMediaResponse);
  }, [newMediaResponse]);

  return (
    <div>
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="file"
          onInput={(e) => {
            e.preventDefault();
            setFile(e.currentTarget.files![0]);
          }}
        />
        <input
          onClick={(e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append("media", file!);
            console.log(file);
            newMedia({ variables: { media: file } });
          }}
          type="submit"
        />
      </form> */}
      <FileUpload />
    </div>
  );
};

export default Playground;
