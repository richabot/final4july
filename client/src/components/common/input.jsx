import React from "react";

const input = ({ name, label, error, ...rest }) => {
  console.log(name, error, "fprm name")
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default input;
