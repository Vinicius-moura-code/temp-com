import { forwardRef } from "react";
import { InputBaseComponentProps } from "@mui/material/InputBase";
import { IMaskInput } from "react-imask"; // Certifique-se de que você está importando corretamente

interface CustomProps extends InputBaseComponentProps {
  name: string;
}

const TelephoneField = forwardRef<HTMLInputElement, CustomProps>(function TextMaskCustom(props, ref) {
  const { onChange, name, ...other } = props;
  
  return (
    <IMaskInput
      {...other}
      mask="(#0) 0000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value: any) =>
        onChange({ target: { name, value } })
      }
      overwrite
    />
  );
});


export default TelephoneField;
