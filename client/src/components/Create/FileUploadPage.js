import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import cuid from "cuid";
import ImageList from "./ImageList";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  CardImg,
  CardText,
  CardSubtitle,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Alert,
  Row,
  Col,
  CardImgOverlay,
} from "reactstrap";

const FileUpload = (props) => {
  const [state, setState] = useState({
    hasPhoto: false,
    fileName: "Drag a file or choose one to upload",
  });
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      return;
    }
    //
    acceptedFiles.map((file) => {
      // Initialize FileReader browser API
      const reader = new FileReader();
      // onload callback gets called after the reader reads the file data
      reader.onload = function (e) {
        // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it.
        setImages((prevState) => [
          ...prevState,
          { id: cuid(), src: e.target.result },
        ]);
      };

      // Read the file as Data URL (since we accept only images)
      reader.readAsDataURL(file);
      setState({ fileName: "Will upload after confirmation", hasPhoto: true });

      const fileData = {
        image: file,
      };

      props.imgData(fileData);

      return file;
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: props.accept,
    multiple: false,
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <p key={file.path}>
      {errors.map((e) => (
        <h6>
          <Alert color="danger">
            ❌ <strong>Error!</strong> {e.message}
          </Alert>
        </h6>
      ))}
    </p>
  ));

  return (
    <>
      <Container className="borderedUpload">
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive && "isActive"}`}
        >
          <input {...getInputProps()} />
          <h6>{fileRejectionItems}</h6>
          {state.hasPhoto ? (
            <>
              <Alert color="success">
                <h5>✔️ Got it!</h5>
              </Alert>
            </>
          ) : (
            <p></p>
          )}
          {isDragActive ? (
            <>
              <h6>Release file to upload it</h6>
              <p>.PNG, .JPEG, .JPG, .GIF</p>
            </>
          ) : (
            <>
              <h6>{state.fileName}</h6>
              <p>.PNG, .JPEG, .JPG, .GIF</p>
            </>
          )}
        </div>
      </Container>
      <Container>
        <Col>
          <ImageList images={images} />
        </Col>
      </Container>
    </>
  );
};
export default FileUpload;
