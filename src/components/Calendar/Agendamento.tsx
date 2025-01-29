import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { pxToRem } from "../../theme/typography";
import useResponsive from "../../hooks/useResponsive";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  DateCalendar,
  DesktopDatePicker,
  PickersCalendarHeaderProps,
} from "@mui/x-date-pickers";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axiosInstance from "../../utils/axios";
import { MeetingSuggestion, RequestSchedule, ResponseForm } from "./types";
import { LoadingButton } from "@mui/lab";

interface CalendarProps {
  onAgendarClick: (requestSchedule: RequestSchedule) => void;
  onCancelarClick: () => void;
  responseForm?: ResponseForm;
}

const CustomCalendarHeaderRoot = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 16px",
  alignItems: "center",
});

const schema = z.object({
  date: z
    .date()
    .nullable()
    .refine((date) => date !== null, {
      message: "Data é obrigatória",
    }),
  horario: z.string().nonempty("Horário é obrigatório"),
});

interface FormData {
  date: Dayjs | null;
  horario: string;
}

function CustomCalendarHeader(props: PickersCalendarHeaderProps<Dayjs>) {
  const { currentMonth, onMonthChange } = props;

  const selectNextMonth = () =>
    onMonthChange(currentMonth.add(1, "month"), "left");
  const selectPreviousMonth = () =>
    onMonthChange(currentMonth.subtract(1, "month"), "right");

  return (
    <CustomCalendarHeaderRoot>
      <Stack spacing={1} direction="row">
        <IconButton
          onClick={selectPreviousMonth}
          title="Previous month"
          sx={{
            "&:hover": {
              color: "white",
              background: "#F7A600",
            },
          }}
        >
          <ChevronLeft height={pxToRem(12.85)} width={pxToRem(7.58)} />
        </IconButton>
      </Stack>

      <Typography
        variant="h6"
        sx={{
          fontSize: pxToRem(24),
          fontWeight: 500,
          lineHeight: pxToRem(24),
          letterSpacing: pxToRem(0.1),
          textAlign: "center",
          color: "#F7A600",
          textTransform: "capitalize",
        }}
      >
        {currentMonth.format("MMMM YYYY")}
      </Typography>
      <Stack spacing={1} direction="row">
        <IconButton
          onClick={selectNextMonth}
          title="Next month"
          sx={{
            "&:hover": {
              color: "white",
              background: "#F7A600",
            },
          }}
        >
          <ChevronRight height={pxToRem(12.85)} width={pxToRem(7.58)} />
        </IconButton>
      </Stack>
    </CustomCalendarHeaderRoot>
  );
}

const Agendamento: React.FC<CalendarProps> = ({
  onAgendarClick,
  onCancelarClick,
  responseForm,
}) => {
  const isMobile = useResponsive("down", "sm");
  const today = dayjs();

  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [availableSchedule, setAvailableSchedule] = useState<
    MeetingSuggestion[]
  >([]);

  let data;

  if (today.day() === 5) {
    data = today.add(3, "day");
  } else if (today.day() === 6) {
    data = today.add(2, "day");
  } else {
    data = today.add(1, "day");
  }

  const handleClick = (index: number) => {
    setActiveButton(index);
  };

  const extractTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleClose = () => {
    onCancelarClick();
  };

  const getFormattedTime = (dateTime: string): string => {
    return dayjs(dateTime).format("HH:mm");
  };

  const { control, handleSubmit, watch, setValue, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: data,
      horario: "",
    },
  });

  const onSubmit = async () => {
    setLoadingButton(true);
    const body: RequestSchedule = {
      identifier: responseForm!.identifier,
      meetingSuggestion: availableSchedule?.filter((s) =>
        s.startDateTime.includes(watch("horario"))
      )[0],
    };

    try {
      await axiosInstance.post("/v1/Calendar/to-schedule", body);
      onAgendarClick(body);
      reset();
    } catch (error) {
      console.error(error);
      setAvailableSchedule([]);
    } finally {
      setLoadingButton(false);
    }
    // ;
  };

  const isWeekend = (date: dayjs.Dayjs) => {
    const day = date.day();
    return day === 6 || day === 0; // Sábado (6) ou Domingo (0)
  };

  const getDataWithDate = async () => {
    setValue("horario", "");
    fetchDataWithDate();
  };

  const fetchDataWithDate = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/v1/Calendar/available-schedule",
        {
          params: {
            day: watch("date")?.format("DD/MM/YYYY"),
          },
        }
      );

      const resData: MeetingSuggestion[] = response.data;
      const orderBayStartDate = resData.sort((a, b) =>
        dayjs(a.startDateTime).diff(dayjs(b.startDateTime))
      );
      setAvailableSchedule(orderBayStartDate);
    } catch (error) {
      console.error(error);
      setAvailableSchedule([]);
    } finally {
      setLoading(false);
    }
  };

  const watchDate = watch("date");
  useEffect(() => {
    getDataWithDate();
  }, [watchDate]);

  return (
    <Box
      sx={{
        padding: {
          md: "0 40px 30px 40px",
          xl: "0px 40px 40px 40px",
          xs: "0px 24px 24px 24px",
        },
        overflowY: "auto",
        height: {
          xl: "100%",
          lg: "90%",
        },
      }}
    >
      <Typography
        component="p"
        sx={{
          fontSize: {
            xl: pxToRem(40),
            lg: pxToRem(36),
            md: pxToRem(30),
            sm: pxToRem(34),
            xs: pxToRem(32),
          },
          fontWeight: 400,
          lineHeight: pxToRem(50),
          textAlign: "center",
          color: "#797979",
        }}
      >
        Agradecemos o seu interesse em fazer <br /> parte da{" "}
        <Typography
          component="strong"
          sx={{
            fontSize: {
              xl: pxToRem(40),
              lg: pxToRem(36),
              md: pxToRem(30),
              sm: pxToRem(34),
              xs: pxToRem(32),
            },
            fontWeight: 500,
            lineHeight: pxToRem(50),
            background: "linear-gradient(90deg, #3677E0 0%, #009A93 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Light COM
        </Typography>
      </Typography>

      <Typography
        component="p"
        sx={{
          fontSize: pxToRem(24),
          fontWeight: 400,
          lineHeight: pxToRem(30),
          textAlign: "center",
          color: "#797979",
          pt: isMobile ? pxToRem(32) : pxToRem(24.45),
          pb: pxToRem(9),
        }}
      >
        Recebemos o seu formulário!
      </Typography>

      <Typography
        component="p"
        sx={{
          fontSize: pxToRem(16),
          fontWeight: 400,
          lineHeight: pxToRem(24),
          textAlign: "center",
          color: "#797979",
          pb: isMobile ? pxToRem(16) : pxToRem(8),
        }}
      >
        Você pode agendar uma reunião online com nossos especialistas para
        esclarecer possíveis dúvidas ou aguardar nosso breve contato.
      </Typography>

      <Box
        component="div"
        sx={{
          background: "#0000001F",
          height: pxToRem(1),
        }}
      ></Box>

      <Typography
        component="p"
        sx={{
          color: "#797979",
          fontSize: pxToRem(24),
          fontWeight: 500,
          lineHeight: pxToRem(30),
          textAlign: "center",
          pt: isMobile ? pxToRem(16) : pxToRem(8),
        }}
      >
        Selecione uma data e horário para agendamento
      </Typography>

      <Typography
        component="p"
        sx={{
          color: "#797979",
          fontSize: pxToRem(16),
          fontWeight: 400,
          lineHeight: pxToRem(30),
          textAlign: "center",
          pb: pxToRem(8),
        }}
      >
        A reunião online terá duração de{" "}
        <Typography
          component="strong"
          sx={{
            color: "#797979",
            fontSize: pxToRem(16),
            fontWeight: 500,
            lineHeight: pxToRem(30),
            textAlign: "center",
          }}
        >
          30 minutos.
        </Typography>
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: "594px",
            }}
          >
            <Grid container spacing={2} justifyContent="center">
              <Grid
                size={{ md: 8, xs: 12 }}
                sx={{
                  pt: isMobile ? pxToRem(16) : "",
                }}
              >
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) =>
                    isMobile ? (
                      <DesktopDatePicker
                        {...field}
                        label="Data"
                        slots={{ calendarHeader: CustomCalendarHeader }}
                        shouldDisableDate={isWeekend}
                        disablePast
                        minDate={data}
                        value={field.value}
                        onChange={field.onChange}
                        slotProps={{
                          textField: {
                            inputProps: {
                              readOnly: true,
                            },
                          },
                        }}
                        disabled={loadingButton || loading}
                        sx={{
                          width: "100%",
                          "&.Mui-selected ": {
                            backgroundColor: "#F7A600 !important",
                            color: "white !important",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "#F7A600 !important",
                          },

                          "& Label": {
                            color: "#F7A600",
                            fontWeight: 500,
                            fontSize: pxToRem(14),
                            lineHeight: pxToRem(16.49),
                          },

                          "& Label .Mui-focused": {
                            color: "#F7A600 !important",
                          },
                        }}
                      />
                    ) : (
                      <>
                        <DateCalendar
                          {...field}
                          slots={{ calendarHeader: CustomCalendarHeader }}
                          shouldDisableDate={isWeekend}
                          disablePast
                          minDate={data}
                          defaultValue={data}
                          value={field.value}
                          onChange={field.onChange}
                          disabled={loadingButton || loading}
                          sx={{
                            color: "white",
                            boxShadow: "0px 8px 20px 0px #4184F73D",
                            width: pxToRem(350),
                            maxHeight: pxToRem(296),
                            "& .MuiDayCalendar-slideTransition": {
                              minHeight: pxToRem(200),
                            },
                            "& .Mui-selected": {
                              backgroundColor: "#F7A600 !important",
                            },
                            "& .Mui-selected:hover": {
                              backgroundColor: "#F7A600 !important",
                            },
                          }}
                        />
                        {watch("horario") && watch("date") ? (
                          <Typography
                            sx={{
                              p: pxToRem(8),
                              fontSize: pxToRem(16),
                              fontWeight: 400,
                              lineHeight: pxToRem(30),
                              textAlign: "center",
                              color: "#797979",
                            }}
                          >
                            <Typography
                              component="span"
                              sx={{
                                textTransform: "capitalize",
                              }}
                            >
                              {watch("date")?.format("dddd")}
                            </Typography>{" "}
                            <Typography
                              component="strong"
                              sx={{
                                fontSize: pxToRem(16),
                                fontWeight: 500,
                                lineHeight: pxToRem(30),
                                textAlign: "center",
                                color: "#797979",
                              }}
                            >
                              {watch("date")?.date()}
                            </Typography>{" "}
                            de{" "}
                            <Typography
                              component="span"
                              sx={{
                                textTransform: "capitalize",
                              }}
                            >
                              {" "}
                              {watch("date")?.format("MMMM")}
                            </Typography>{" "}
                            de {watch("date")?.year()}, às{" "}
                            <Typography
                              component="strong"
                              sx={{
                                fontSize: pxToRem(16),
                                fontWeight: 500,
                                lineHeight: pxToRem(30),
                                textAlign: "center",
                                color: "#797979",
                              }}
                            >
                              {watch("horario")}
                            </Typography>
                          </Typography>
                        ) : (
                          ""
                        )}
                      </>
                    )
                  }
                />
              </Grid>
              <Grid size={{ md: 4, xs: 12 }}>
                <Box
                  sx={{
                    minWidth: 190,
                    height: isMobile
                      ? "auto"
                      : availableSchedule.length > 6
                      ? "323px"
                      : "auto",
                    overflowY: loading
                      ? "unset"
                      : availableSchedule.length > 6
                      ? "auto"
                      : "unset",
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "#f0f0f0",
                      borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#F7A600",
                      borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: "#d18f00",
                    },
                  }}
                >
                  <Controller
                    name="horario"
                    control={control}
                    render={({ field }) =>
                      isMobile ? (
                        <FormControl fullWidth sx={{ marginTop: 2 }}>
                          <InputLabel
                            id="horario-label"
                            sx={{
                              color: "#F7A600",
                              fontWeight: 500,
                              fontSize: pxToRem(14),
                              lineHeight: pxToRem(16.49),
                              "&.Mui-focused": {
                                color: "#F7A600",
                              },
                            }}
                          >
                            Horário
                          </InputLabel>

                          {loading ? (
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                marginY: 2,
                              }}
                            >
                              <CircularProgress size={24}  sx={{color: "#F7A600"}}/>
                            </Box>
                          ) : (
                            <Select
                              {...field}
                              labelId="horario-label"
                              label="Horário"
                              sx={{
                                mb: pxToRem(16),
                                borderColor: "#919EAB",
                              }}
                              onChange={(e) => field.onChange(e.target.value)}
                              disabled={availableSchedule.length === 0} 
                            >
                              { availableSchedule.map((time, index) => (
                                  <MenuItem
                                    key={index}
                                    value={getFormattedTime(time.startDateTime)}
                                  >
                                    {getFormattedTime(time.startDateTime)}
                                  </MenuItem>
                                ))}
                            </Select>
                          )}
                        </FormControl>
                      ) : (
                        <Box sx={{ width: 180 }}>
                          {loading ? (
                            <Box
                              sx={{
                                minWidth: 180,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                              }}
                            >
                              <CircularProgress sx={{ color: "#F7A600" }} />
                            </Box>
                          ) : (
                            availableSchedule.map((time, index) => (
                              <Button
                                key={index}
                                size="medium"
                                variant="contained"
                                onClick={() => {
                                  handleClick(index);
                                  field.onChange(
                                    getFormattedTime(time.startDateTime)
                                  );
                                }}
                                sx={{
                                  bgcolor:
                                    activeButton === index
                                      ? "#F7A600"
                                      : "transparent",
                                  color:
                                    activeButton === index ? "#fff" : "#F7A600",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  borderRadius: "4px",
                                  border: `1px solid #F7A600`,
                                  padding: "16px 24px",
                                  height: "45px",
                                  width: "168px",
                                  fontSize: "16px",
                                  lineHeight: "30px",
                                  fontWeight: 500,
                                  mb: "8px",
                                  "&:hover": {
                                    bgcolor:
                                      activeButton === index
                                        ? "#F7A600"
                                        : "rgba(247, 166, 0, 0.1)",
                                  },
                                }}
                              >
                                {extractTime(time.startDateTime)}
                              </Button>
                            ))
                          )}
                        </Box>
                      )
                    }
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={1}
              sx={{ pt: pxToRem(29) }}
              justifyContent="center"
              textAlign="center"
            >
              <Grid size={{ md: 6, xs: 12 }} order={{ xs: 2, md: 1 }}>
                <Button
                  size="medium"
                  variant="outlined"
                  type="button"
                  onClick={handleClose}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    borderRadius: "1.563rem",
                    padding: "16px 24px",
                    height: pxToRem(50),
                    width: {
                      sm: pxToRem(215),
                      xs: "100%",
                    },
                    borderColor: "#F7A600",
                    color: "#F7A600",
                    "&:hover": {
                      borderColor: "#F7A600",
                      backgroundColor: "rgba(255, 165, 0, 0.1)",
                    },
                    fontSize: 15,
                    lineHeight: "18px",
                    fontWeight: 500,
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
              <Grid size={{ md: 5, xs: 12 }} order={{ xs: 1, md: 2 }}>
                <LoadingButton
                  size="medium"
                  variant="contained"
                  type="submit"
                  loading={loadingButton}
                  loadingPosition="center"
                  disabled={
                    !watch("horario") || !watch("date") || loadingButton
                  }
                  onClick={onSubmit}
                  sx={{
                    bgcolor: "#F7A600",
                    display: "inline-flex",
                    alignItems: "center",
                    borderRadius: "1.563rem",
                    padding: "16px 24px",
                    height: pxToRem(50),
                    minWidth: pxToRem(215),
                    width: {
                      sm: pxToRem(215),
                      xs: "100%",
                    },
                    fontSize: 15,
                    lineHeight: "18px",
                    fontWeight: 500,
                    "&.Mui-disabled": {
                      color: "#FFFFFF",
                    },
                  }}
                >
                  Agendar
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Agendamento;
