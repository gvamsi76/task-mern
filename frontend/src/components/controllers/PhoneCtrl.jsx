import React from "react"
import { Controller } from "react-hook-form";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";
import { startsWith } from 'lodash';

const PhoneCtrl = ({
  control,
  showError,
  name,
  required,
  id,
  label,
  className = "",
  defaultValue,
  placeholder
}) => {
  const rules = {
    required: required,
    pattern: {
      value: /^(?!\s*$).+/,
      message: "Field is invalid",
    },
  };

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if(defaultValue){
      setValue(defaultValue)
    }
  }, [defaultValue]);

  return (
    <Controller
      rules={rules}
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <Form.Group className={`mb-3`}>
            <Form.Label
              htmlFor={id}
              className={`${label === "" ? "d-none" : ""}`}
            >
              {label} {required && <span className='text-danger'>*</span>}
            </Form.Label>
            <PhoneInput
             country={'in'}
              onChange={(newPhone, country) => {
                if (!startsWith(value, country.dialCode)) {
                  setValue(country.dialCode);
                  field.onChange(country.dialCode);
                  return;
                }
                setValue(newPhone);
                field.onChange(newPhone);
              }}
              value={value}
              placeholder={placeholder}
              inputClass={`react-phone-input-field ${className}`}
              countryCodeEditable={false}
              inputProps={{
                name: name,
                required: true,
                autoFocus: false,
              }}
              
            />
            {showError && showError(name) ? (
              <Form.Control.Feedback type='invalid' className='d-block'>
                {showError(name)}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
        </>
      )}
    />
  );
};

export default PhoneCtrl;
