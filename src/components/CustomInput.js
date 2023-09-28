import React from "react";

const CustomInput = (props) => {
  const { type, placeholder, classname, name, value, onChange, onBlur } = props;
  return (
    <div>
      <input
        type={type}
        name={name}
        className={`form-control mb-3 ${classname}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default CustomInput;
