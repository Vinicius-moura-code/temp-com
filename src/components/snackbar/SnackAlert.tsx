import {
  Alert,
  AlertProps,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import {
  forwardRef,
  SyntheticEvent,
  useImperativeHandle,
  useState,
} from "react";

interface SnackAlertHandle {
  showAlert: (message: string, severity: AlertProps["severity"]) => void;
}

const SnackAlert = forwardRef<SnackAlertHandle>((_, ref) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertProps["severity"]>("info");

  useImperativeHandle(ref, () => ({
    showAlert(msg: string, sev: AlertProps["severity"]) {
      setMessage(msg);
      setSeverity(sev);
      setOpen(true);
    },
  }));

  const handleClose = (
    _event: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
});

export default SnackAlert;
