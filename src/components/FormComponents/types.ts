import { InputBaseComponentProps } from "@mui/material";

export interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export interface FieldProps extends InputBaseComponentProps {
  name: string;
}