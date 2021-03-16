import React from "react";
import { Alert } from "reactstrap";
const FormErrors = ({ formErrors }) => (
  <div className="formErrors">
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <Alert color="danger">
            <p key={i}>{formErrors[fieldName]}</p>
          </Alert>
        );
      } else {
        return "";
      }
    })}
  </div>
);
export default FormErrors;
