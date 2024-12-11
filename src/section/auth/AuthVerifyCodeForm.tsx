import * as z from "zod";
import { useNavigate, useParams } from "react-router-dom";
// form
import { useForm } from "react-hook-form";
// @mui
import { Stack, FormHelperText, Typography, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// routes
import { PATH_AUTH, PATH_DASHBOARD } from "../../routes/paths";
// components
import { useSnackbar } from "../../components/snackbar";
import FormProvider, { RHFCodes } from "../../components/hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "../../auth/useAuthContext";
import { pxToRem } from "../../theme/typography";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";

// ----------------------------------------------------------------------

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
  afterSubmit?: string;
};


export default function AuthVerifyCodeForm() {
  const { mfaEmail } = useAuthContext();
  const { _email } = useParams();
  const navigate = useNavigate();
  const { verifyMfa } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutos em segundos
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {

    if(!mfaEmail || !_email){
      navigate(PATH_AUTH.login, { replace: true });
    }

  }, [mfaEmail, _email, navigate]);
  
  useEffect(() => {
    let timer = null;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer!);
      setIsRunning(false); // Para automaticamente quando chega a zero
    }

    return () => clearInterval(timer!);
  }, [isRunning, timeLeft]);

  const startCountdown = () => {
    setTimeLeft(5 * 60); // Reseta para 5 minutos
    setIsRunning(true);
  };

  const onResend = async () => {
    try {
      await axiosInstance.post("/v1/Auth/mfa/resend", { email: mfaEmail });
  
      enqueueSnackbar("Código reenviado com sucesso!", {
        variant: "success",
      });
  
      startCountdown();
      reset();
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    }
  };

  const VerifyCodeSchema = z.object({
    code1: z.string().min(1, "Code is required"),
    code2: z.string().min(1, "Code is required"),
    code3: z.string().min(1, "Code is required"),
    code4: z.string().min(1, "Code is required"),
    code5: z.string().min(1, "Code is required"),
    code6: z.string().min(1, "Code is required"),
  });

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await verifyMfa(Object.values(data).join(""));
      enqueueSnackbar("Login realizado com sucesso!");
      navigate(PATH_DASHBOARD.root);
    } catch (error: any) {
      setError("afterSubmit", {
        ...error!,
        message: String(error.message),
      });

      setError("code1", error.message);
      setError("code2", error.message);
      setError("code3", error.message);
      setError("code4", error.message);
      setError("code5", error.message);
      setError("code6", error.message);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFCodes
          keyName="code"
          inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
          sx={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            boxShadow: "0px 1px 2px 0px #0000000D",
            borderRadius: "8px",
          }}
        />

        {(!!errors.code1 ||
          !!errors.code2 ||
          !!errors.code3 ||
          !!errors.code4 ||
          !!errors.code5 ||
          !!errors.code6) && (
          <FormHelperText
            error
            sx={{
              display: "flex",
              pl: "4.2rem",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "21px",
            }}
          >
            {errors.afterSubmit?.message || "Code is required"}
          </FormHelperText>
        )}

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          Verificar
        </LoadingButton>

        <Typography
          component="p"
          sx={{
            color: "#000000",
            fontSize: pxToRem(16),
            fontWeight: 400,
            lineHeight: pxToRem(24),
          }}
        >
          O código expira em {formatTime(timeLeft)}
        </Typography>

        <Button onClick={onResend} disabled={isRunning}>
          Reenviar código
        </Button>
      </Stack>
    </FormProvider>
  );
}
