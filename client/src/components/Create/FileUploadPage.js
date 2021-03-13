import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
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
  Row,
  Col,
  CardImgOverlay,
} from "reactstrap";

const FileUpload = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // do something here
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <>
      <Container className="borderedUpload">
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive && "isActive"}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <>
              <h6>Drag a file or choose one to upload</h6>
              <p>.PNG, .JPEG, .JPG, .GIF</p>
            </>
          )}
        </div>
      </Container>
    </>
  );
};
export default FileUpload;
