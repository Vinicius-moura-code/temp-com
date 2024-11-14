import { useState } from "react";
import { z } from "zod";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import Iconify from "../../components/iconify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { pxToRem } from "../../theme/typography";
import axiosInstance from "../../utils/axios";

type FormValuesProps = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
  afterSubmit?: string;
};

type ModalProps = {
  submit: () => void;
};

const ChangePasswordForm = ({ submit }: ModalProps) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const VerifyPasswordSchema = z
    .object({
      currentPassword: z.string().min(1, "Senha atual é obrigatório"),
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
    currentPassword: "",
    password: "",
    confirmPassword: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(VerifyPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const body = {
        currentPassword: data.currentPassword,
        newPassword: data.password,
      };
      await axiosInstance.post("/v1/Auth/reset-password-authenticated", body);
      handleonSubmit();
    } catch (error: any) {
      setError("afterSubmit", {
        ...error!,
        message:
          String(error.message) || "Erro interno, tente novamente mais tarde.",
      });
    }
  };

  const handleonSubmit = () => {
    submit();
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} justifyContent="center" alignItems="center">
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <RHFTextField
          name="currentPassword"
          label="Senha atual"
          type={showCurrentPassword ? "text" : "password"}
          sx={{
            width: {
              md: pxToRem(400),
              xl: pxToRem(400),
              xs: pxToRem(366),
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={
                      showCurrentPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="password"
          label="Nova senha"
          type={showPassword ? "text" : "password"}
          sx={{
            width: {
              md: pxToRem(400),
              xl: pxToRem(400),
              xs: pxToRem(366),
            },
          }}
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

        <RHFTextField
          name="confirmPassword"
          label="Confirmar nova senha"
          type={showConfirmPassword ? "text" : "password"}
          sx={{
            width: {
              md: pxToRem(400),
              xl: pxToRem(400),
              xs: pxToRem(366),
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={
                      showConfirmPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography
          component="p"
          sx={{
            color: "#797979",
            fontSize: {
              md: pxToRem(14),
              xl: pxToRem(14),
              xs: pxToRem(12),
            },
            fontWeight: 400,
            lineHeight: pxToRem(18),
          }}
        >
          Ao continuar, você será desconectado de todos os dispositivos e
          precisará fazer login novamente.
        </Typography>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            mt: 3,
            width: {
              md: pxToRem(401),
              xl: pxToRem(401),
              xs: pxToRem(366),
            },
            height: pxToRem(50),
            minWidth: pxToRem(215),
            minHeight: pxToRem(50),
            borderRadius: pxToRem(25),
          }}
        >
          Alterar senha
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default ChangePasswordForm;
