import React from "react";
import { Controller } from "react-hook-form";
import { Form } from "react-bootstrap";
import Select from 'react-select';

const SelectCtrl = ({
	control,
	showError,
	placeholder,
	name,
	required,
	disabled,
	id,
	startAdornment,
	endAdornment,
	startAdornmentIcon,
	endAdornmentIcon,
	label,
	options,
	onSelect,
	className = '',
}) => {
	const rules = {
		required: required,
		pattern: {
			value: /[A-Za-z0-9]{1,20}/,
			message: "Field is invalid",
		},
	};

	const onSelectHandler = (e) => {
		const value = e?.target?.value;
		let found;
		if (value && Number(value)) {
			found = options.find(option => Number(option.value) === Number(value));
		} else if (value) {
			found = options.find(option => option.value === value);
		}
		if (found && onSelect) {
			onSelect(found);
		}
	};

	return (
		<Controller
			rules={rules}
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<>
					<Form.Group className={`mb-3 w-100 ${className}`}>
						<Form.Label htmlFor={id} className={`${label === '' ? 'd-none' : ''}`}>
							{label}{" "}
							{required && <span className="text-danger">*</span>}
						</Form.Label>
						<Select
							{...field}
							inputId={id}
							isDisabled={disabled}
							placeholder={placeholder}
							options={options}
							classNamePrefix="react-select"
							className="react-select-container w-100"
							value={options.find((o) => o.value == field.value)}
							onChange={(selectedOption) => {
								if (selectedOption) {
									field.onChange(selectedOption.value);
									if (onSelect) {
										onSelect(selectedOption);
									}
								}
							}}
						/>
						{showError && showError(name) ? (
							<Form.Control.Feedback
								type="invalid"
								className="d-block"
							>
								{showError(name)}
							</Form.Control.Feedback>
						) : null}
					</Form.Group>
				</>
			)}
		></Controller>
	);
};

export default SelectCtrl;
