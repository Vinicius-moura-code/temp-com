import React from "react";
import { Controller, Control, FieldError } from "react-hook-form";
import { FormControl, InputLabel, FormHelperText } from "@mui/material";
import InputBase, { InputBaseComponentProps } from "@mui/material/InputBase";

interface CustomTextFieldProps {
  label: string;
  control: Control<any>;
  name: string;
  error?: FieldError | undefined;
  helperText?: string;
  inputComponent?: React.ElementType<InputBaseComponentProps>;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  control,
  name,
  error,
  helperText,
  inputComponent: InputComponent,
}) => {
  return (
    <FormControl
      variant="outlined"
      fullWidth
      error={!!error}
      sx={{
        mb: 1.5,
      }}
    >
      <InputLabel
        shrink
        htmlFor={name}
        sx={{
          fontFamily: "Rubik",
          color: "white",
          left: -14,
          top: -10,
          fontSize: "1rem",
          "&.Mui-focused": {
            color: "white",
          },
        }}
      >
        {label}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <InputBase
            {...field}
            id={name}
            sx={{
              fontFamily: "Rubik",
              background: "white",
              color: "black",
              borderRadius: "8px",
              ...(helperText && {
                border: "solid 1px",
                borderColor: "error.main",
              }),
              height: 42,
              //width: 250,
              padding: 2,
            }}
            inputComponent={InputComponent}
          />
        )}
      />
      {helperText && (
        <FormHelperText sx={{ marginLeft: 0, mb: 1 }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomTextField;
