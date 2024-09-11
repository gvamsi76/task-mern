import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Form, InputGroup } from "react-bootstrap";


const InputCtrl = ({
  control,
  showError,
  placeholder,
  name,
  required,
  disabled,
  id,
  type,
  startAdornment,
  endAdornment,
  startAdornmentIcon,
  endAdornmentIcon,
  label,
  defaultValue,
  max,
  min,
  componentName,
  rules: customRoles,
  maxLength,
  minLength,
  className = "mb-3",
  renderInField = () => { },
}) => {

  const [errorMessage, setErrorMessage] = useState("");
  const rules = {
    required: required,
    pattern: {
      value: /[A-Za-z0-9]{1,20}/,
      message: "Field is invalid",
    },
    ...customRoles,
  };

  const addMinLength = (val) => {
    rules["minLength"] = {
      value: val,
      message: `Should be min ${val} char long`,
    };
  };

  const addMaxLength = (val) => {
    rules["maxLength"] = {
      value: val,
      message: `Should be max ${val} char long`,
    };
  };

  const addPattern = (value, messasge) => {
    rules["pattern"] = {
      value: value,
      message: messasge,
    };
  };

  if (maxLength) {
    addMaxLength(maxLength);
  }
  if (minLength) {
    addMinLength(minLength);
  }

  const containsOnlyNumbers = (str) => {
    const numberPattern = /^[0-9]+$/;
    return numberPattern.test(str);
  };
  const containsLetters = (str) => {
    const letterPattern = /[A-Za-z]/;
    return letterPattern.test(str);
  };

  const addressValid = (str) => {
    const addressPattern = /^[A-Za-z0-9\s.,#\-']+$/;
    return addressPattern.test(str);
  };

  if (componentName) {
    if (componentName === "Address") {
      addMinLength(3);
      addMaxLength(100);
      rules["validate"] = (val) => {
        if (containsOnlyNumbers(val)) {
          return "Address must contain letters, ex: '123 Main St'";
        } else if (!containsLetters(val) || !addressValid(val)) {
          return `Please enter a valid address with letters, numbers, spaces, commas, periods, hash, hyphens, and single quotes only.`;
        }
        return true;
      };
    } else if (componentName === "FullName") {
      addMinLength(3);
      addMaxLength(50);
      const namePattern = /^[A-Za-z]+(\s[A-Za-z]+)*$/;
      addPattern(
        namePattern,
        "Please enter a valid name with letters and spaces only."
      );
    } else if (componentName === "Name") {
      addMinLength(3);
      addMaxLength(50);

      const namePattern = /^[A-Za-z]+(\s[A-Za-z]+)*$/;

      addPattern(namePattern, "Please enter a valid name with letters only.");
    } else if (componentName === "Number") {
      const numberPattern = /^[0-9]*\.?[0-9]+$/;
      addPattern(numberPattern, "Please enter a valid number.");
    } else if (componentName === "Email") {
      addMinLength(6);
      addMaxLength(40);

      const emailPattern = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
      addPattern(emailPattern, `Invalid email address.`);
    } else if (componentName === "Website") {
      const urlPattern =
        /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
      addPattern(urlPattern, `Invalid website url`);
    } else if (componentName === "PhoneNumber") {
      const phonePattern = /^\+\d{1,3}\d{10}$/;
      addPattern(phonePattern, `Invalid phone number.`);
    }
  }



  return (
    <Controller
      rules={rules}
      name={name}
      control={control}
      render={({ field }) => (
        <>
          {startAdornment || endAdornment ? (
            <>
              <Form.Label htmlFor={id}>
                {label} {required && <span className="text-danger">*</span>}
              </Form.Label>
              <InputGroup className={`${className}`}>
                {startAdornment ? (
                  <InputGroup.Text id={`${id}-addon1`}>
                    {startAdornment}
                  </InputGroup.Text>
                ) : null}
                <Form.Control
                  {...field}
                  id={id}
                  disabled={disabled}
                  type={type}
                  placeholder={placeholder}
                  isInvalid={showError && showError(name) ? true : false}
                  defaultValue={defaultValue}
                  max={max}
                  min={min}
                  step="any"

                  onChange={(e) => {
                    if (componentName === 'PhoneNumber') {
                      let inputValue = e.target.value;
                      inputValue = inputValue.replace(/[^0-9+]/g, '');
                      if (inputValue.startsWith('+')) {
                        inputValue = '+' + inputValue.replace(/\+/g, '').trim();
                      }
                      e.target.value = inputValue;
                      if (maxLength && inputValue.length > maxLength) {
                        e.preventDefault()
                        return
                      }
                    }
                    field.onChange(e);
                  }}
                />

                {endAdornment ? (
                  <InputGroup.Text id={`${id}-addon1`}>
                    {endAdornment}
                  </InputGroup.Text>
                ) : null}
                {showError && showError(name) ? (
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {showError(name)}
                  </Form.Control.Feedback>
                ) : null}
              </InputGroup>
            </>
          ) : (
            <>
              <Form.Group className={`${className}`}>
                <Form.Label
                  htmlFor={id}
                  className={`${label === "" ? "d-none" : ""}`}
                >
                  {label} {required && <span className="text-danger">*</span>}
                </Form.Label>
                <span className="position-relative">
                  <Form.Control
                    {...field}
                    id={id}
                    disabled={disabled}
                    type={type}
                    placeholder={placeholder}
                    isInvalid={showError && showError(name) ? true : false}
                    defaultValue={defaultValue}
                    max={max}
                    min={min}
                    step="any"

                    onChange={(e) => {
                      if (componentName === 'PhoneNumber') {
                        let inputValue = e.target.value;
                        inputValue = inputValue.replace(/[^0-9+]/g, '');
                        if (inputValue.startsWith('+')) {
                          inputValue = '+' + inputValue.replace(/\+/g, '').trim();
                        }
                        e.target.value = inputValue;
                        if (maxLength && inputValue.length > maxLength) {
                          e.preventDefault()
                          return
                        }
                      }
                      field.onChange(e);
                    }}
                  />
                  {renderInField && renderInField()}
                </span>
                {showError && showError(name) ? (
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errorMessage && (
                      <div className="error-message text-danger">{errorMessage}</div>
                    )}
                    {showError(name)}

                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
            </>
          )}
        </>
      )}
    ></Controller>
  );
};

export default InputCtrl;
