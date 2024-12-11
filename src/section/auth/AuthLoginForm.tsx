//import * as Yup from 'yup';
import { Link as RouterLink } from "react-router-dom";
// form
import { Controller, useForm } from "react-hook-form";

// @mui
import {
  Link,
  Stack,
  Alert,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  InputBaseComponentProps,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// routes
import { PATH_AUTH } from "../../routes/paths";
// auth
import { useAuthContext } from "../../auth/useAuthContext";

import FormProvider, { RHFTextField } from "../../components/hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { pxToRem } from "../../theme/typography";
import Iconify from "../../components/iconify";
import { forwardRef, useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import { isValidCNPJ, isValidCPF } from "../../utils/validation";
import { useSnackbar } from "../../components/snackbar";
// ----------------------------------------------------------------------

type FormValuesProps = {
  cpfCnpj: string;
  password: string;
  manterConectado: boolean;
  afterSubmit?: string;
};

export default function AuthLoginForm() {
  const { login } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const LoginSchema = z.object({
    cpfCnpj: z
      .string()
      .min(1, "CPF ou CNPJ é obrigatório")
      .refine((value) => {
        const cleanValue = value.replace(/[^\d]+/g, "");
        return cleanValue.length === 11
          ? isValidCPF(cleanValue)
          : isValidCNPJ(cleanValue);
      }, "CPF ou CNPJ inválido"),
    password: z.string().min(1, "Senha é obrigatório"),
    manterConectado: z.boolean().optional(),
  });

  const defaultValues = {
    cpfCnpj: "",
    password: "",
    manterConectado: false,
  };

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login(data.cpfCnpj, data.password);
      localStorage.setItem(
        "KeepConnected",
        JSON.stringify(data.manterConectado)
      );
      reset();
    } catch (error: any) {
      setError("afterSubmit", {
        ...error!,
        message: String(error.message),
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

  useEffect(() => {
    const manterConectado = localStorage.getItem("KeepConnected");
    if (manterConectado) {
      setValue("manterConectado", JSON.parse(manterConectado));
    }

    const data = localStorage.getItem("sessionExpired");
    if (JSON.parse(data!)) {
      enqueueSnackbar("Sessão expirada, faça login novamente.", {
        variant: "error",
      });

      localStorage.removeItem("sessionExpired");
    }
  }, [enqueueSnackbar, setValue]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          width: {
            xl: 400,
            md: 400,
            xs: "100%",
          },
        }}
      >
        <Stack spacing={3}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}

          <RHFTextField
            name="cpfCnpj"
            label="CPF ou CNPJ*"
            autoComplete="username"
            InputProps={{
              inputComponent: TextMaskCustom,
            }}
          />

          <RHFTextField
            name="password"
            label="Senha"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{ my: 3 }}
        >
          <Controller
            name="manterConectado"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox {...field} checked={field.value} size="small" />
                }
                label="Manter conectado"
                sx={{
                  color: "#797979",
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: "19.96px",
                }}
              />
            )}
          />
          <Link
            component={RouterLink}
            to={PATH_AUTH.resetPassword}
            variant="body2"
            color="inherit"
            underline="always"
            sx={{
              color: "#3677E0",
              fontSize: pxToRem(16),
              fontWeight: 400,
              lineHeight: pxToRem(18),
            }}
          >
            Esqueceu sua senha?
          </Link>
        </Stack>

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
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          Entrar
        </LoadingButton>
        <Typography
          component="p"
          sx={{
            color: "#6C7786",
            fontWeight: 400,
            fontSize: pxToRem(13),
            lineHeight: pxToRem(18),
            textAlign: "center",
            pt: pxToRem(24),
          }}
        >
          V.0.1.1446
        </Typography>
      </Box>
    </FormProvider>
  );
}
