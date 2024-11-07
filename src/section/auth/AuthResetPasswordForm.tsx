import * as z from "zod";
// form
import { useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
// routes
// components
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "../../utils/axios";
import SnackAlert from "../../components/snackbar/SnackAlert";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "../../routes/paths";

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
};

export default function AuthResetPasswordForm() {
  const navigate = useNavigate();
  const snackAlertRef = useRef<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ResetPasswordSchema = z.object({
    email: z
      .string()
      .min(1, "E-mail é obrigatório")
      .email("O e-mail deve ser um endereço de e-mail válido"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { email: "" },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    setIsSubmitting(true);
    const body = {
      Email: data.email,
    };
    try {
      const res = await axiosInstance.post("/v1/Auth/forgot-password", body);
      if (snackAlertRef.current) {
        snackAlertRef.current.showAlert(res.data.message, "success");
      }
      setTimeout(() => {
        reset();
        navigate(PATH_DASHBOARD.root);
      }, 2000);
    } catch (error) {
      snackAlertRef.current.showAlert("Erro ao enviar dados.", "warning");
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SnackAlert ref={snackAlertRef} />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField name="email" label="Email" />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          Enviar
        </LoadingButton>
      </FormProvider>
    </>
  );
}
