import {
  AlertColor,
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TelephoneField from "../../../components/FormComponents";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axiosInstance from "../../../utils/axios";
import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { bgBlur } from "../../../utils/cssStyles";
import CustomTextField from "./CustomTextField";
import CustomSelect from "./CustomSelect";
import CustomSlider from "./CustomSlider";

import Brightness1Icon from "@mui/icons-material/Brightness1";
import Brightness1OutlinedIcon from "@mui/icons-material/Brightness1Outlined";
import CellphoneField from "../../../components/FormComponents/CellphoneField";
import UploadButton from "../../../components/UploadButton";
import useResponsive from "../../../hooks/useResponsive";
import { pxToRem } from "../../../theme/typography";
import Calendar from "../../../components/Calendar/Calendar";
import { ResponseForm } from "../../../components/Calendar/types";

const phoneRegex = /^\(\d{2}\)\s9\d{4}-\d{4}$/;

const schema = z.object({
  nomeContato: z.string().min(1, "Nome do contato é obrigatório"),
  email: z.string().email("E-mail inválido"),
  distribuidora: z.string().min(1, "Distribuidora é obrigatória"),
  telefone: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        return /^\(\d{2}\)\s?\d{4}-\d{4}$/.test(value);
      },
      {
        message: "Número de telefone inválido",
      }
    ),
  celular: z
    .string()
    .min(10, "Celular é obrigatório")
    .regex(phoneRegex, "Celular inválido"),
  razaoSocial: z.string().min(1, "Razão Social é obrigatória"),
  vlrMensal: z.number().min(0, "Valor mensal deve ser maior que 0"),
  unidadeConsumidora: z.boolean().optional(),
  aceitePrivacidade: z.boolean().refine((val) => val === true, {
    message: "É necessário aceitar a política de privacidade",
  }),
  aceiteEmailMarketing: z.boolean().optional(),
  fatura: z.string().nullable().optional(),
});

interface IDist {
  label: string;
  value: string;
  identifier: number;
}
interface FormProps {
  showAlert: (message: string, severity: AlertColor) => void;
}
export default function FormSimule({ showAlert }: FormProps) {
  const isMobile = useResponsive("down", "sm");

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [responseForm, setResponseForm] = useState<ResponseForm>();
  const [distribuidoras, setDistribuidoras] = useState<IDist[]>([]);
  const GetDistribuidoras = async () => {
    try {
      const response = await axiosInstance.get(`/v1/Web/take-default-options`, {
        params: {
          identifier: "Distributor__c",
        },
      });
      setDistribuidoras(response.data);
    } catch (error) {
      console.log("Deu erro: ", error);
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nomeContato: "",
      email: "",
      distribuidora: "",
      telefone: "",
      celular: "",
      razaoSocial: "",
      vlrMensal: 42000,
      aceitePrivacidade: false,
      aceiteEmailMarketing: false,
      unidadeConsumidora: false,
      fatura: "",
    },
  });

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const onSubmit = (data: any) => {
    createCliente(data);
  };

  const createCliente = async (data: any) => {
    setLoading(true);

    const arquivoFatura = {
      nomeArquivo: "fatura",
      extensao: data.fatura?.split(";")[0]?.split("/")[1],
      fatura: data.fatura?.split(";")[1]?.split(",")[1],
    };

    const body = {
      nomeContato: data.nomeContato,
      email: data.email,
      distribuidora: data.distribuidora,
      telefone: data.telefone,
      celular: data.celular,
      unidadeConsumidora: data.unidadeConsumidora,
      razaoSocial: data.razaoSocial,
      vlrMensal: data.vlrMensal,
      arquivoFatura: data.fatura?.length > 0 ? arquivoFatura : null,
      aceitePrivacidade: data.aceitePrivacidade,
      aceiteEmailMarketing: data.aceiteEmailMarketing,
    };

    try {
      const response = await axiosInstance.post("/v1/Cliente", body);
      setResponseForm(response.data);

      showAlert("Dados enviados com sucesso!", "success");
      setOpen(true);
      reset();
    } catch (error) {
      console.log(error);
      showAlert("Erro ao enviar dados.", "warning");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetDistribuidoras();
  }, []);

  return (
    <>
      <Calendar
        openCalendar={open}
        onClosed={setOpen}
        responseForm={responseForm}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            //width: 595,
            background: "#FCFDFE",
            borderRadius: "3rem",
            marginTop: "1em",
            //border: "1px solid #E8E8E8",
            boxShadow: "0px 16px 44px 0px #7090B040",
            textAlign: "center",
            padding: "2rem",
            paddingTop: "48px",
            color: "white",
            position: "relative",
            ...bgBlur({
              color: "#3677E0E5",

              // blur: 1,
              // opacity: 0.5,
            }),
            zIndex: 2,
          }}
        >
          <Grid container size={12}>
            <Typography
              component="p"
              sx={{
                fontFamily: "Rubik",
                fontSize: 16,
                fontWeight: 400,
                lineHeight: "1.875rem",
                color: "#fff",
                marginBottom: "3rem",
              }}
            >
              Faça o cálculo de quanto você pode economizar com a Light&nbsp;COM
            </Typography>
          </Grid>

          {/* Formulário */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="Razão Social"
                control={control}
                name="razaoSocial"
                error={errors.razaoSocial}
                helperText={errors.razaoSocial?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="Nome do contato"
                control={control}
                name="nomeContato"
                error={errors.nomeContato}
                helperText={errors.nomeContato?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="Telefone"
                control={control}
                name="telefone"
                error={errors.telefone}
                helperText={errors.telefone?.message}
                inputComponent={TelephoneField as any}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="Celular"
                control={control}
                name="celular"
                error={errors.celular}
                helperText={errors.celular?.message}
                inputComponent={CellphoneField as any}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="E-mail"
                control={control}
                name="email"
                error={errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomSelect
                label="Distribuidoras"
                control={control}
                name="distribuidora"
                labelId="distribuidoraId"
                error={errors.distribuidora}
                helperText={errors.distribuidora?.message}
                options={distribuidoras.map((item) => item.label)}
              />
            </Grid>
            {/* Valor Mensal */}
            <Grid
              container
              direction="column"
              alignItems="flex-start"
              size={12}
              spacing={2}
              sx={{
                paddingRight: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  width: "100%",
                  maxWidth: 516,
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    textAlign: "initial",
                  }}
                >
                  Valor mensal da conta de energia
                  <br />
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 0,
                  }).format(watch("vlrMensal"))}
                </Typography>

                <Controller
                  name="vlrMensal"
                  control={control}
                  render={({ field }) => (
                    <CustomSlider
                      {...field}
                      min={0}
                      max={350000}
                      step={100}
                      onChange={(_, newValue) =>
                        setValue("vlrMensal", newValue as number)
                      }
                      aria-label="valor mensal"
                    />
                  )}
                />
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    variant="caption"
                    gutterBottom
                    sx={{ display: "block" }}
                  >
                    {formatter.format(0)}
                  </Typography>
                  <Typography
                    variant="caption"
                    gutterBottom
                    sx={{ display: "block" }}
                  >
                    {formatter.format(350000)}
                  </Typography>
                </Stack>
              </Box>
            </Grid>

            <Grid size={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  fontFamily: "Rubik",
                  fontWeight: 400,
                  fontSize: "14px",
                }}
              >
                <Controller
                  name="unidadeConsumidora"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={watch("unidadeConsumidora")}
                          icon={<Brightness1OutlinedIcon />}
                          checkedIcon={<Brightness1Icon />}
                          sx={{
                            color: "#F7A600",
                            "&.Mui-checked": {
                              color: "#F7A600",
                            },
                          }}
                        />
                      }
                      label="Possuo mais de uma unidade consumidora"
                    />
                  )}
                />
              </Box>
            </Grid>

            <Grid container size={12} spacing={2}>
              <Grid
                size={{ xs: 12, md: 6 }}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={0}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    width: 244,
                    textAlign: {
                      xs: "start",
                      sm: "end",
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Rubik",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      lineHeight: "1.089rem",
                      color: "white",
                    }}
                  >
                    Anexe uma conta de energia
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      fontFamily: "Rubik",
                      fontWeight: 400,
                      fontSize: "0.75rem",
                      lineHeight: "1.125rem",
                      color: "#CECECE",
                    }}
                  >
                    Isso irá facilitar no retorno da simulação
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <UploadButton
                  setError={setError}
                  setValue={setValue}
                  clearErrors={clearErrors}
                  fatura={watch("fatura")}
                  erro={errors}
                />
              </Grid>
            </Grid>

            <Grid
              size={12}
              container
              justifyContent={{
                sm: "center",
                xs: "left",
              }}
              spacing={0}
            >
              <FormControlLabel
                control={
                  <Controller
                    name="aceitePrivacidade"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        sx={{
                          color: "#F7A600",
                          "&.Mui-checked": {
                            color: "#F7A600",
                          },
                        }}
                        checked={watch("aceitePrivacidade")}
                        onChange={(_, newValue) =>
                          setValue("aceitePrivacidade", newValue || false)
                        }
                        icon={<Brightness1OutlinedIcon />}
                        checkedIcon={<Brightness1Icon />}
                      />
                    )}
                  />
                }
                label={
                  <Typography
                    component="p"
                    sx={{
                      fontFamily: "Rubik",
                      fontWeight: 400,
                      fontSize: "0.875rem",
                      lineHeight: "1.089rem",
                      color: "#FFF",
                    }}
                  >
                    Concordo com os termos da{isMobile ? <br /> : " "}
                    <Link
                      href="https://www.light.com.br/SitePages/page-aviso-de-privacidade.aspx"
                      target="_blank"
                      underline="always"
                      color="#27272A"
                      sx={{
                        fontWeight: 400,
                        fontSize: "0.875rem",
                        lineHeight: "1.089rem",
                        color: "#F7A600",
                        textDecorationColor: "#F7A600",
                      }}
                    >
                      Política de Privacidade
                    </Link>
                  </Typography>
                }
              />

              {/* Exibe mensagem de erro */}
              {errors.aceitePrivacidade && (
                <Typography color="error" sx={{ fontSize: "0.75rem" }}>
                  {errors.aceitePrivacidade.message}
                </Typography>
              )}
            </Grid>

            <Grid size={12} container justifyContent="center">
              <LoadingButton
                size="medium"
                type="submit"
                loading={loading}
                loadingPosition="center"
                endIcon={<ArrowForwardIcon />}
                variant="contained"
                sx={{
                  bgcolor: "#F7A600",
                  //display: "inline-flex",
                  alignItems: "center",
                  borderRadius: "1.563rem",
                  padding: isMobile ? "10px 16px" : "16px 24px",
                  minHeight: isMobile ? pxToRem(50) : "3.125rem",
                  minWidth: isMobile ? pxToRem(20) : "25rem",
                  fontSize: isMobile ? 14 : 15,
                }}
              >
                Solicitar Simulação de Economia
              </LoadingButton>

              {/* <Button
                      type="submit"
                      variant="contained"
                      endIcon={<ArrowForwardIcon />}
                      color="primary"
                      id="clickSolicitar"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        borderRadius: "1.563rem",
                        padding: "16px 24px 16px 24px",
                        height: "3.125rem",
                        width: "25rem",
                      }}
                    >
                      Solicitar Simulação de Economia
                    </Button> */}
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
}
