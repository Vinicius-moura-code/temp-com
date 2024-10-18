import { Modal, Box, IconButton } from "@mui/material";
import { pxToRem } from "../../theme/typography";
import CloseIcon from "@mui/icons-material/Close";
import Agendamento from "./Agendamento";
import { useEffect, useState } from "react";
import ResumoSeuAgendamento from "./ResumoSeuAgendamento";
import useResponsive from "../../hooks/useResponsive";
import { Payload, RequestSchedule, ResponseForm } from "./types";

const CalendarModal = ({
  openCalendar,
  onClosed,
  responseForm,
}: {
  openCalendar: boolean;
  onClosed: React.Dispatch<React.SetStateAction<boolean>>;
  responseForm?: ResponseForm;
}) => {
  const isMobile = useResponsive("down", "sm");
  const [open, setOpen] = useState(false);
  const [openResumo, setOpenResumo] = useState(false);
  const [payload, setPayload] = useState<Payload>();

  useEffect(() => {
    setOpen(openCalendar);
  }, [openCalendar]);
  //isXL ? "85vh" : isMobile || openResumo ? "auto" : "95vh"
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "98vw" : openResumo ? pxToRem(876) : pxToRem(997),
    height: {
      xl: "auto",
      md: "95vh",
      sm: "auto",
      xs: openResumo ? "auto" : "92vh"
    },
    overflowY: "auto",
    bgcolor: "#FFFFFF",
    boxShadow: 24,
    borderRadius: pxToRem(19),
  };

  const handleClose = () => {
    setOpen(false);
    setOpenResumo(false);
    onClosed(false);
  };

  const handleAgendarClick = (requestSchedule: RequestSchedule) => {
    setPayload({
      agendamento: requestSchedule,
      cliente: responseForm!,
    });
    setOpenResumo(true);
  };

  const handleCancelarClick = () => {
    handleClose();
  };

  return (
      <Modal
      open={open}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
    >
      <Box sx={{ ...style }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            height: pxToRem(41),
            padding: `${pxToRem(24)} ${pxToRem(10)}`,
            boxSizing: "border-box",
          }}
        >
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon
              sx={{
                color: "#797979",
                fontSize: pxToRem(15),
              }}
            />
          </IconButton>
        </Box>

        {!openResumo ? (
          <Agendamento
            onAgendarClick={handleAgendarClick}
            responseForm={responseForm}
            onCancelarClick={handleCancelarClick}
          />
        ) : (
          <ResumoSeuAgendamento payload={payload!} />
        )}
      </Box>
    </Modal>
  );
};

export default CalendarModal;
