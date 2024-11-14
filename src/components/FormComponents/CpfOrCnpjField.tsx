import { forwardRef } from "react";
import { FieldProps } from "./types";
import { IMaskInput } from "react-imask";

 const CpfOrCnpjField = forwardRef<HTMLInputElement, FieldProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, name, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={[
          { mask: "000.000.000-00", lazy: true }, // CPF: 000.000.000-00
          { mask: "00.000.000/0000-00", lazy: true }, // CNPJ: 00.000.000/0000-00
        ]}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: name, value } })}
        overwrite
      />
    );
  }
);


export default CpfOrCnpjField