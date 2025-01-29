import { forwardRef } from "react";
import { IMaskInput } from "react-imask";
import { FieldProps } from "./types";

const CnpjField = forwardRef<HTMLInputElement, FieldProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, name, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={[
          { mask: "00.000.000/0000-00", lazy: true }, // CNPJ: 00.000.000/0000-00
        ]}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: name, value } })}
        overwrite
      />
    );
  }
);

export default CnpjField