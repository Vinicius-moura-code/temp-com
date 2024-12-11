import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { pxToRem } from "../../theme/typography";
import Carousel from "../../components/Carousel";
import { formatToMoney } from "../../utils/format";
import { useState } from "react";
import { DataType } from "./types";
import dayjs from "dayjs";


interface InvoiceMobileProps {
  data: DataType[]; 
}


const InvoiceMobile: React.FC<InvoiceMobileProps> = ({ data }) => {
  const events = [
    {
      description: "Enviar por e-mail",
      icone: "/assets/icons/mark-email.svg",

      style: {
        width: "21px",
        height: "18px",
      },
    },
    {
      description: "Nota Fiscal",
      icone: "/assets/icons/download.svg",

      style: {
        width: "16px",
        height: "16px",
      },
    },
    {
      description: "Baixar Fatura",
      icone: "/assets/icons/download.svg",

      style: {
        width: "16px",
        height: "16px",
      },
    },
  ];



  const renderCards = () => {
    return data.map((row, index) => (
      <Box
        key={index}
        sx={{
          display: "flex",
          flexDirection: "column",

          width: "181px",
          height: "69px",
          border: "1px solid #3677E0",
          borderRadius: "12px",
          padding: "16px 32px",
          backgroundColor: index === selectedCardIndex ? "#3677E0" : "transparent", 
        }}
      >
        <Typography
          component="p"
          sx={{
            color: index === selectedCardIndex ? "#FFFFFF" : "#3677E0",
            fontSize: pxToRem(16),
            fontWeight: 500,
            lineHeight: pxToRem(20),
            textAlign: "center",
            
          }}
        >
          {row.vencimento}
        </Typography>
        <Typography
          component="p"
          sx={{
            color: index === selectedCardIndex ? "#FFFFFF" : "#3677E0",
            fontSize: pxToRem(16),
            fontWeight: 500,
            lineHeight: pxToRem(20),
            textAlign: "center",
          }}
        >
          {formatToMoney(row.valorFatura)}
        </Typography>
      </Box>
    ));
  };

  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  
  const handleSelectedChange = (index: number) => {
    setSelectedCardIndex(index);
  };

  return (
    <>
      <Typography component="p" sx={{
        color: "#000000",
        fontSize: pxToRem(16),
        fontWeight: 400,
        lineHeight: pxToRem(20),
      }}>Selecione a fatura desejada abaixo</Typography>

      <Box sx={{ height: "69px", mt: "24.5px", mb: "31px" }}>
        <Carousel cards={renderCards()} visibledOrden={false} onSelectedChange={handleSelectedChange} />
      </Box>

      <Stack direction="column" spacing={1}>
        <Typography
          component="p"
          sx={{
            color: "#797979",
            fontSize: pxToRem(14),
            fontWeight: 400,
            lineHeight: pxToRem(16.59),
            textTransform: "capitalize"
          }}
        >
         {dayjs(data[selectedCardIndex].vencimento, "DD/MM/YYYY").format("MMMM YYYY")}
        </Typography>
        <Typography
          component="p"
          sx={{
            color: "#3677E0",
            fontSize: pxToRem(24),
            fontWeight: 500,
            lineHeight: pxToRem(28.44),
            
          }}
        >
         {formatToMoney(data[selectedCardIndex].valorFatura)}
        </Typography>
        <Typography
          component="p"
          sx={{
            color: "#797979",
            fontSize: pxToRem(14),
            fontWeight: 400,
            lineHeight: pxToRem(16.59),
          }}
        >
          Status
        </Typography>
        <Chip
          label={data[selectedCardIndex].status}
          sx={{
            backgroundColor: data[selectedCardIndex].status === "Pago" ? "#D1FADA" : "#FFF4CC",
            color: data[selectedCardIndex].status === "Pago" ? "#36BD54" : "#C09807",
            width: "fit-content",
            border: "none",
          }}
          variant="outlined"
        />
        <Typography
          component="p"
          sx={{
            color: "#797979",
            fontSize: pxToRem(14),
            fontWeight: 400,
            lineHeight: pxToRem(16.59),
          }}
        >
          Vencimento {data[selectedCardIndex].vencimento}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{mt:"16px"}}>
        {events.map((event, index) => (
          <Box key={index} sx={{ width: pxToRem(70), padding: "8px 5px" }}>
            <Card
              sx={{
                width: 60,
                height: 60,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: "8px",
              }}
            >
              <CardActionArea sx={{ width: "auto" }}>
                <CardMedia
                  component="img"
                  image={event.icone}
                  sx={event.style}
                />
              </CardActionArea>
            </Card>
            <Typography
              component="p"
              sx={{
                color: "#33323D",
                fontSize: pxToRem(12),
                fontWeight: 400,
                lineHeight: pxToRem(14.22),
                textAlign: "center",
              }}
            >
              {event.description}
            </Typography>
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default InvoiceMobile;
