import {
  Box,
  Button,
  IconButton,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import React, { useState } from "react";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import { ISimule } from "../section/home/SimulacaoEconomia/types";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

const formatosPermitidos = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/heif",
  "image/heic",
  "image/bmp",
];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface UploadButtonProps {
  setError: UseFormSetError<ISimule>;
  setValue: UseFormSetValue<ISimule>;
  clearErrors: UseFormClearErrors<ISimule>;
  fatura: string;
  erro: FieldErrors<ISimule>;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  setError,
  setValue,
  clearErrors,
  fatura,
  erro
}) => {
  const [name, setName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const files = event.target.files; // 'files' pode ser FileList | null

    if (files && files.length > 0) {
      const file = files[0]; // Pegamos o primeiro arquivo
      setName(file.name);
      if (!formatosPermitidos.includes(file.type)) {
        setError("fatura", {
          type: "manual",
          message:
            "Formato de arquivo inválido. Formatos permitidos: PDF, JPEG, JPG, PNG, GIF, HEIF, HEIC, BMP.",
        });
        setValue("fatura", "");
      } else {
        convertToBase64(file);
        clearErrors("fatura");
      }
    }
  };

  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setValue("fatura", base64String);
    };
    reader.onerror = (error) => {
      console.error("Erro ao converter arquivo para Base64: ", error);
    };
  };

  if (name && fatura) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: 56,
          width: {
            sm: 244,
            xs: "100%"
          },
          border: "1px dashed #F7A600",
          borderRadius: "0.875rem",
          padding: "0 8px",
          boxSizing: "border-box",
        }}
      >
        <DescriptionOutlinedIcon
          fontSize="large"
          sx={{
            fontSize: 30,
            flexShrink: 0,
          }}
        />

        <Tooltip title={name}>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
        </Tooltip>

        <IconButton
          aria-label="Remover arquivo de conta"
          onClick={() => {
            setValue("fatura", "");
            setName("");
          }}
          sx={{
            flexShrink: 0,
          }}
        >
          <HighlightOffOutlinedIcon
            fontSize="large"
            color="warning"
            sx={{
              fontSize: 30,
            }}
          />
        </IconButton>
      </Box>
    );
  }

  return (
    <>
      <Button
        component="label"
        variant="contained"
        tabIndex={-1}
        startIcon={
          <FileUploadOutlinedIcon
            fontSize="large"
            sx={{
              fontSize: 40,
            }}
          />
        }
        sx={{
          fontFamily: "Rubik",
          fontWeight: 400,
          fontSize: "0.75rem",
          lineHeight: "1.125rem",

          height: 56,
          width: {
            sm: 244,
            xs: "100%"
          },

          border: "1px dashed #F7A600",
          borderRadius: "0.875rem",
          //textTransform: "none",
          color: "#FFF",
          backgroundColor: "transparent",
        }}
      >
        Adicione aqui a conta
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          accept=".pdf, .jpeg, .jpg, .png, .heif, .heic, .bmp"
          aria-label="Adicionar arquivo de conta"
        />
      </Button>
      {erro.fatura && (
        <Typography color="error" sx={{ fontSize: "0.75rem" }}>
          {erro.fatura.message}
        </Typography>
      )}
    </>
  );
}


export default UploadButton;