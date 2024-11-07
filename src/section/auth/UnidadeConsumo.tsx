import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { pxToRem } from "../../theme/typography";
import LogoAzulCenter from "../../components/logo/LogoAzulCenter";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import FormProvider from "../../components/hook-form";

type FormValuesProps = {
  contrato: string;
  unidadeConsumo: string;
  afterSubmit?: string;
};

const UnidadeConsumo = () => {
  const UnidadeConsumoSchema = z.object({
    contrato: z.string().min(1, "Contrato é obrigatório"),
    unidadeConsumo: z.string().min(1, "Unidade de Consumo é obrigatório"),
  });

  const defaultValues = {
    contrato: "",
    unidadeConsumo: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(UnidadeConsumoSchema),
    defaultValues,
  });
  const {
    reset,
    setError,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      console.log("dados ", data);
    } catch (error) {
      console.error(error);
      reset();
      setError("afterSubmit", {
        ...error!,
        message: String(error),
      });
    }
  };

  return (
    <>
      <LogoAzulCenter />
      <Typography
        component="p"
        sx={{
          color: "#797979",
          fontWeight: 400,
          fontSize: pxToRem(24),
          lineHeight: pxToRem(28.44),
        }}
      >
        Selecione o contrato e o unidade de consumo quedeseja consultar.
      </Typography>

      <Box
        sx={{
          display: {
            xl: "flex",
            md: "flex",
            xs: "block",
          },
          justifyContent: "center",
          textAlign: "start"
        }}
      >
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
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

              <FormControl fullWidth margin="normal" error={!!errors.contrato}>
                <InputLabel id="contrato-label">Contrato</InputLabel>
                <Controller
                  name="contrato"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="contrato-label"
                      label="Contrato"
                    >
                      <MenuItem value="contrato1">Contrato 1</MenuItem>
                      <MenuItem value="contrato2">Contrato 2</MenuItem>
                      <MenuItem value="contrato3">Contrato 3</MenuItem>
                    </Select>
                  )}
                />
                {errors.contrato && (
                  <Typography color="error">
                    {errors.contrato.message}
                  </Typography>
                )}
              </FormControl>

              <FormControl
                fullWidth
                margin="normal"
                error={!!errors.unidadeConsumo}
              >
                <InputLabel id="unidade-consumo-label">
                  Unidade de Consumo
                </InputLabel>
                <Controller
                  name="unidadeConsumo"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="unidade-consumo-label"
                      label="Unidade de Consumo"
                    >
                      <MenuItem value="unidade1">Unidade 1</MenuItem>
                      <MenuItem value="unidade2">Unidade 2</MenuItem>
                      <MenuItem value="unidade3">Unidade 3</MenuItem>
                    </Select>
                  )}
                />
                {errors.unidadeConsumo && (
                  <Typography color="error">
                    {errors.unidadeConsumo.message}
                  </Typography>
                )}
              </FormControl>

              <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitSuccessful || isSubmitting}
                sx={{
                    my: 3,
                  bgcolor: "primary.main",
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "common.white"
                      : "grey.800",
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
                Continuar
              </LoadingButton>
              
            </FormProvider>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default UnidadeConsumo;
