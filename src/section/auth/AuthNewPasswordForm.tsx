import { useState } from "react";
import * as z from "zod";
import { useParams } from "react-router-dom";
// form
import { useForm } from "react-hook-form";
// @mui
import { Stack, IconButton, InputAdornment, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// routes
// components
import Iconify from "../../components/iconify";
import { useSnackbar } from "../../components/snackbar";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "../../utils/axios";
import { pxToRem } from "../../theme/typography";
import RegistrationCompletedModal from "./RegistrationCompletedModal";

// ----------------------------------------------------------------------

type FormValuesProps = {
  // email: string;
  password: string;
  confirmPassword: string;
};

export default function AuthNewPasswordForm() {
  const { _email, _code } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  // const emailRecovery = _email;

  const VerifyCodeSchema = z
    .object({
      // email: z
      //   .string()
      //   .min(1, "E-mail é obrigatório")
      //   .email("O e-mail deve ser um endereço de e-mail válido"),
      password: z
        .string()
        .min(8, "A senha deve ter pelo menos 8 caracteres")
        .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
        .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
        .regex(/[0-9]/, "A senha deve conter pelo menos um número")
        .regex(
          /[@#$%^&*]/,
          "A senha deve conter pelo menos um caractere especial, como @, #, $, %, ^, &, *"
        ),
      confirmPassword: z.string().min(1, "Nova senha é obrigatório"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas não correspondem",
      path: ["confirmPassword"],
    });

  const defaultValues = {
    // email: emailRecovery || "",
    password: "",
    confirmPassword: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const body = {
      Email: _email,
      Code: _code,
      NewPassword: data.password,
    };
    try {
      await axiosInstance.post("/v1/Auth/reset-password", body);
      // enqueueSnackbar("Alteração de senha realizada com sucesso!");
      //navigate(PATH_DASHBOARD.root);
      setOpen(true);
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <RegistrationCompletedModal open={open} />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {/* <RHFTextField
          name="email"
          label="Email"
          disabled={!!emailRecovery}
          InputLabelProps={{ shrink: true }}
        /> */}
          <RHFTextField
            name="password"
            label="Senha"
            type={showPassword ? "text" : "password"}
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

          <Typography
            component="p"
            sx={{
              color: "#6C7786",

              fontSize: {
                md: pxToRem(12),
                xl: pxToRem(12),
                xs: pxToRem(10),
              },
              fontWeight: 400,
              lineHeight: {
                md: pxToRem(13.79),
                xl: pxToRem(13.79),
                xs: pxToRem(11.85),
              },
              textAlign: "left",
            }}
          >
            Deve ter no mínimo 8 caracteres. <br />
            Deve incluir pelo menos uma letra maiúscula (A-Z). <br />
            Deve incluir pelo menos uma letra minúscula (a-z). <br />
            Deve conter pelo menos um número (0-9). <br />
            Deve conter pelo menos um símbolo ou caractere especial, como ! @ #
            $ % ^ & *
          </Typography>

          <RHFTextField
            name="confirmPassword"
            label="Confirmar nova senha"
            type={showPassword ? "text" : "password"}
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

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{
              mt: 3,
              minWidth: pxToRem(215),
              minHeight: pxToRem(50),
              borderRadius: pxToRem(25),
            }}
          >
            Confirmar
          </LoadingButton>
        </Stack>
      </FormProvider>
    </>
  );
}
