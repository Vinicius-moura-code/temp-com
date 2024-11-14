import { z } from "zod";
import { isValidCNPJ, isValidCPF } from "../../utils/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormProvider from "../../components/hook-form/FormProvider";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, InputBaseComponentProps, Stack } from "@mui/material";
import { forwardRef, useState } from "react";
import { IMaskInput } from "react-imask";
import { RHFTextField } from "../../components/hook-form";
import axiosInstance from "../../utils/axios";
import VerifyAccountModal from "./VerifyAccountModal";

type FormValuesProps = {
  cpfCnpj: string;
  email: string;
  afterSubmit?: string;
};

const AuthFirstAccessForm = () => {
  const [open, setOpen] = useState(false);
  const [email, setemail] = useState("");

  const FirstAccessSchema = z.object({
    cpfCnpj: z
      .string()
      .min(1, "CPF ou CNPJ é obrigatório")
      .refine((value) => {
        const cleanValue = value.replace(/[^\d]+/g, "");
        return cleanValue.length === 11
          ? isValidCPF(cleanValue)
          : isValidCNPJ(cleanValue);
      }, "CPF ou CNPJ inválido"),
    email: z
      .string()
      .min(1, "E-mail é obrigatório")
      .email("O e-mail deve ser um endereço de e-mail válido"),
  });

  const defaultValues = {
    cpfCnpj: "",
    email: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(FirstAccessSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await axiosInstance.post("/v1/Auth/first-access", {
        cnpj: data.cpfCnpj.replace(/[^\d]+/g, ""),
        email: data.email,
      });

      setemail(data.email);
      setOpen(true);
      reset();
    } catch (error: any) {
      console.error(error);

      setError("afterSubmit", {
        ...error!,
        message:
          String(error.message) || "Erro interno, tente novamente mais tarde.",
      });
    }
  };

  interface CustomProps extends InputBaseComponentProps {
    name: string;
  }

  const TextMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
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

  const handleCloseModal = () => setOpen(false);
  return (
    <>
      <VerifyAccountModal open={open} email={email} onClose={handleCloseModal} />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Stack spacing={4}>
            {!!errors.afterSubmit && (
              <Alert severity="error">{errors.afterSubmit.message}</Alert>
            )}

            <RHFTextField
              name="cpfCnpj"
              label="CPF ou CNPJ*"
              InputProps={{
                inputComponent: TextMaskCustom,
              }}
            />

            <RHFTextField name="email" label="Email" />

            <LoadingButton
              fullWidth
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitSuccessful || isSubmitting}
              sx={{
                bgcolor: "primary.main",
                color: (theme) =>
                  theme.palette.mode === "light" ? "common.white" : "grey.800",
                borderRadius: "25px",
                "&:hover": {
                  bgcolor: "#418FDE",
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "common.white"
                      : "grey.800",
                },
              }}
            >
              Enviar
            </LoadingButton>
          </Stack>
        </Box>
      </FormProvider>
    </>
  );
};

export default AuthFirstAccessForm;
