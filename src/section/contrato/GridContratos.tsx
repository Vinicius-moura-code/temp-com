import {
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Stack,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { pxToRem } from "../../theme/typography";
import Carousel from "../../components/Carousel";

const columns = [
  {
    description: "N° Contrato",
  },
  {
    description: "Status",
  },
  {
    description: "Adesão",
  },
  {
    description: "Vencimento",
  },
  {
    description: "Código da instalação",
  },
  {
    description: "Responsável",
  },
  {
    description: "Serviço Adicional",
  },
  {
    description: "Endereço",
  },
  {
    description: "Baixar",
  },
];

const rows = [
  {
    contrato: "12345678",
    status: "Ativo",
    adesao: "20/11/2023",
    vencimento: "30/11/2024",
    codigoInstalacao: "1234567890",
    responsavel: "Lindsey Souza",
    servicoAdicional: "Não",
    endereco: "Fidelis Papini 100, Vila Prudente, CEP 03132-020 São Paulo SP",
  },

  {
    contrato: "12345000",
    status: "Inativo",
    adesao: "31/10/2023",
    vencimento: "31/10/2024",
    codigoInstalacao: "1234567890",
    responsavel: "Lindsey Souza",
    servicoAdicional: "Não",
    endereco: "Fidelis Papini 100, Vila Prudente, CEP 03132-020 São Paulo SP",
  },
];

interface TypeValueProps {
  type: "text" | "status" | "download";
}
interface StackItemProps {
  label: string;
  value?: string | number;
  typeValue?: TypeValueProps;
}

const StackItem: React.FC<StackItemProps> = ({
  label,
  value,
  typeValue = { type: "text" },
}) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
      sx={{
        width: typeValue.type === "download" ? "159px" : "100%",
      }}
    >
      <Typography
        sx={{
          color: "#000000",
          fontSize: pxToRem(14),
          fontWeight: 500,
          lineHeight: pxToRem(16.59),
          textTransform: "uppercase",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
        }}
      >
        {label}
      </Typography>

      {typeValue.type === "status" && (
        <Chip
          label={value}
          sx={{
            backgroundColor: value === "Ativo" ? "#D1FADA" : "#FFF4CC",
            color: value === "Ativo" ? "#36BD54" : "#C09807",
            width: "fit-content",
          }}
        />
      )}

      {typeValue.type === "text" && (
        <Typography
          sx={{
            color: "#797979",
            fontSize: pxToRem(14),
            fontWeight: 400,
            lineHeight: pxToRem(16.59),
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
          }}
        >
          {value}
        </Typography>
      )}

      {typeValue.type === "download" && (
        <IconButton color="primary" aria-label={label}>
          <DownloadIcon />
        </IconButton>
      )}
    </Stack>
  );
};

const renderCards = () => {
  return rows.map((row, index) => (
    <Box
      key={index}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <StackItem label="N° Contrato" value={row.contrato} />
      <StackItem
        label="Status"
        value={row.status}
        typeValue={{ type: "status" }}
      />
      <StackItem label="Adesão" value={row.adesao} />
      <StackItem label="Código da instalação" value={row.codigoInstalacao} />
      <StackItem label="Responsável" value={row.responsavel} />
      <StackItem label="Endereço" value={row.endereco} />
      <StackItem label="Serviço Adicional" value={row.servicoAdicional} />
      <StackItem label="Baixar" typeValue={{ type: "download" }} />
    </Box>
  ));
};

const GridContratosTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {isMobile ? (
        <Carousel cards={renderCards()} />
      ) : (
        <TableContainer component={Paper}>
          <Table
            aria-label="contratos table"
            sx={{
              borderCollapse: "separate",
              borderSpacing: "0 16px",
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                {columns.map((colum, index) => (
                  <TableCell key={index} sx={headStyle}>
                    {colum.description}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.contrato}
                  sx={{
                    "& td": {
                      backgroundColor: "#DDDDDD4D",
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      borderTopLeftRadius: "6px",
                      borderBottomLeftRadius: "6px",
                    }}
                  >
                    {row.contrato}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      sx={{
                        backgroundColor:
                          row.status === "Ativo" ? "#D1FADA" : "#FFF4CC",
                        color: row.status === "Ativo" ? "#36BD54" : "#C09807",
                        border: "none",
                      }}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{row.adesao}</TableCell>
                  <TableCell>{row.vencimento}</TableCell>
                  <TableCell>{row.codigoInstalacao}</TableCell>
                  <TableCell>{row.responsavel}</TableCell>
                  <TableCell>{row.servicoAdicional}</TableCell>
                  <TableCell width={260}>{row.endereco}</TableCell>
                  <TableCell  sx={{
                      borderTopRightRadius: "6px",
                      borderBottomRightRadius: "6px",
                    }}>
                    <IconButton color="primary" aria-label="download">
                      <DownloadIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

const headStyle = {
  color: "#000000",
  fontSize: pxToRem(16),
  fontWeight: 500,
  lineHeight: pxToRem(20),
};

export default GridContratosTable;
