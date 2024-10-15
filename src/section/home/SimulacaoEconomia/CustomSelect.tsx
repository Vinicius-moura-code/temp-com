import React from "react";
import { Controller, Control, FieldError } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";

interface CustomSelectProps {
  label: string;
  control: Control<any>;
  name: string;
  options: string[]; // Você pode mudar para um tipo mais específico se necessário
  error?: FieldError | undefined;
  helperText?: string;
  labelId: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  control,
  name,
  options,
  error,
  helperText,
  labelId,
}) => {
  return (
    <FormControl variant="outlined" fullWidth error={!!error}>
      <InputLabel
        id={labelId}
        shrink
        // htmlFor={name}
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
          <Select
            {...field}
            labelId={labelId}
            label={label}
            id={name}
            fullWidth
            MenuProps={{
              style: {
                maxHeight: 400,
              },
            }}
            sx={{
              background: "white",
              color: "black",
              borderRadius: "8px",
              height: 42,
              //maxWidth: 250,
              padding: 2,
              textAlign: "start",
              pl: 0,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            disabled={options.length == 0}
          >
            {options.map((option, index) => (
              <MenuItem
                key={index}
                value={option}
                sx={{
                  // width: 210,
                  fontFamily: "Rubik",
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {helperText && (
        <FormHelperText sx={{ marginLeft: 0, my: 1 }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomSelect;
