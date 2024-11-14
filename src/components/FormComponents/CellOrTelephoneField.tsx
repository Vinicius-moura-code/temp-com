import { forwardRef } from "react";
import { FieldProps } from "./types";
import { IMaskInput } from "react-imask";

 const CellOrTelephoneField = forwardRef<HTMLInputElement, FieldProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, name, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={[
          { mask:"(00) 00000-0000", lazy: true }, 
          { mask: "(00) 0000-0000", lazy: true },
        ]}
      
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: name, value } })}
        overwrite
      />
    );
  }
);


export default CellOrTelephoneField