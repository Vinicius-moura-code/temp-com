import { Box, Typography } from "@mui/material";
import { pxToRem } from "../../theme/typography";
import dayjs from "dayjs";
import useResponsive from "../../hooks/useResponsive";
import { Payload } from "./types";

interface AgendamentoProps {
  payload: Payload;
}

const ResumoSeuAgendamento: React.FC<AgendamentoProps> = ({ payload }) => {
  const isMobile = useResponsive("down", "sm");
  const getData = (dia: string) => {
    const day = dayjs(dia);

    const data = {
      diaSemana: day.format("dddd"),
      dia: day.date(),
      mes: day.format("MMMM"),
      ano: day.year(),
    };
    return data;
  };

  const getFormattedTime = (dateTime: string): string => {
    return dayjs(dateTime).format("HH:mm");
  };

  const agendamento = payload.agendamento;
  const cliente = payload.cliente;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        //isMobile ? "32px 24px 24px 24px" : "32px 40px 60px 40px"
        padding: {
          lg: "32px 40px 60px 40px",
          xs: "32px 24px 24px 24px"
        },

        overflowY: "auto",
        height: {
          xl: "100%",
          lg: "85%",
          md: "80%",
          xs: "100%"
        },
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
      <img
        src="assets/ResumoAgendamento/agendamento/check.svg"
        alt="icone check"
        style={{
          width: pxToRem(62.5),
          height: pxToRem(62.5),
          paddingBottom: pxToRem(15.25),
        }}
      />
      <Typography
        component="p"
        sx={{
          fontSize: isMobile ? pxToRem(32) : pxToRem(40),
          fontWeight: 600,
          lineHeight: pxToRem(30),
          color: "#F7A600",
          pb: pxToRem(34),
          textAlign: "center",
        }}
      >
        Você está agendado
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: isMobile ? pxToRem(23) : pxToRem(32),
          fontWeight: 400,
          lineHeight: pxToRem(30),
          color: "#797979",
          pb: isMobile ? pxToRem(32) : pxToRem(40),
          textAlign: "center",
        }}
      >
        Resumo do seu agendamento
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          pb: isMobile ? pxToRem(32) : pxToRem(40),
          gap: pxToRem(8),
          width: "100%",
        }}
      >
        <img
          src="assets/ResumoAgendamento/agendamento/user.svg"
          alt="icone check"
          style={{
            width: pxToRem(32),
            height: pxToRem(31.05),
          }}
        />

        <Typography
          sx={{
            fontSize: isMobile ? pxToRem(16) : pxToRem(24),
            fontWeight: 400,
            lineHeight: pxToRem(30),
            color: "#797979",
            textAlign: "justify",
          }}
        >
          {cliente.nomeContato}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          pb: isMobile ? pxToRem(32) : pxToRem(40),
          gap: pxToRem(8),
          width: "100%",
        }}
      >
        <img
          src="assets/ResumoAgendamento/agendamento/calendario.svg"
          alt="icone check"
          style={{
            width: pxToRem(36),
            height: pxToRem(40),
          }}
        />

        <Typography
          component="p"
          sx={{
            fontSize: isMobile ? pxToRem(16) : pxToRem(24),
            fontWeight: 400,
            lineHeight: pxToRem(30),
            color: "#797979",
            textAlign: "justify",
            "& strong": {
              fontSize: isMobile ? pxToRem(16) : pxToRem(24),
              fontWeight: 500,
              lineHeight: pxToRem(30),
            },
          }}
        >
          {getData(agendamento.meetingSuggestion.startDateTime).diaSemana}{" "}
          <Typography component="strong">
            {getData(agendamento.meetingSuggestion.startDateTime).dia}
          </Typography>
          , de{" "}
          <Typography component="strong">
            {getData(agendamento.meetingSuggestion.startDateTime).mes}
          </Typography>{" "}
          de{" "}
          <Typography component="strong">
            {getData(agendamento.meetingSuggestion.startDateTime).ano}
          </Typography>
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          pb: isMobile ? pxToRem(32) : pxToRem(40),
          gap: pxToRem(8),
          width: "100%",
        }}
      >
        <img
          src="assets/ResumoAgendamento/agendamento/horario.svg"
          alt="icone check"
          style={{
            width: pxToRem(40),
            height: pxToRem(40),
          }}
        />

        <Typography
          component="p"
          sx={{
            fontSize: isMobile ? pxToRem(16) : pxToRem(24),
            fontWeight: 400,
            lineHeight: pxToRem(30),
            color: "#797979",
            textAlign: "justify",
            "& strong": {
              fontSize: isMobile ? pxToRem(16) : pxToRem(24),
              fontWeight: 500,
              lineHeight: pxToRem(30),
            },
          }}
        >
          <Typography component="strong">
            {getFormattedTime(agendamento.meetingSuggestion.startDateTime)}-{" "}
            {getFormattedTime(agendamento.meetingSuggestion.endDateTime)}
          </Typography>{" "}
          Horário de Brasilia
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          pb: isMobile ? pxToRem(32) : pxToRem(40),
          gap: pxToRem(8),
          width: "100%",
        }}
      >
        <img
          src="assets/ResumoAgendamento/agendamento/localidade.svg"
          alt="icone check"
          style={{
            width: pxToRem(32),
            height: pxToRem(40),
          }}
        />

        <Typography
          sx={{
            fontSize: isMobile ? pxToRem(16) : pxToRem(24),
            fontWeight: 400,
            lineHeight: pxToRem(30),
            color: "#797979",
            textAlign: "justify",
          }}
        >
          Online: Microsoft Teams
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: pxToRem(8),
          width: "100%",
        }}
      >
        <img
          src="assets/ResumoAgendamento/agendamento/video.svg"
          alt="icone check"
          style={{
            width: pxToRem(40),
            height: pxToRem(32),
          }}
        />

        <Typography
          component="p"
          sx={{
            fontSize: isMobile ? pxToRem(16) : pxToRem(24),
            fontWeight: 400,
            lineHeight: isMobile ? pxToRem(20) : pxToRem(40),
            color: "#797979",
            textAlign: "justify",
            "& strong": {
              fontSize: isMobile ? pxToRem(16) : pxToRem(24),
              fontWeight: 500,
              lineHeight: isMobile ? pxToRem(20) : pxToRem(30),
              color: "#F7A600",
            },
          }}
        >
          O convite e os detalhes da reunião serão encaminhados para o <br />
          e-mail : <Typography component="strong">{cliente.email}</Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default ResumoSeuAgendamento;
