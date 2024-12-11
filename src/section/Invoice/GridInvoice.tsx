import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { pxToRem } from "../../theme/typography";
import { formatToMoney } from "../../utils/format";
import InvoiceMobile from "./InvoiceMobile";

const columns = [
  {
    description: "Referência",
  },
  {
    description: "Valor da fatura",
  },
  {
    description: "Vencimento",
  },
  {
    description: "Status",
  },
  {
    description: "Enviar por e-mail",
  },
  {
    description: "Nota Fiscal",
  },
  {
    description: "Baixar fatura",
  },
];

const rows = [
  {
    referencia: "10/10/2024",
    valorFatura: 350.50,
    vencimento: "20/10/2024",
    status: "Pago",
  },
  {
    referencia: "10/09/2024",
    valorFatura: 300.30,
    vencimento: "20/09/2024",
    status: "Pendente",
  },
  {
    referencia: "10/08/2024",
    valorFatura: 250.50,
    vencimento: "20/08/2024",
    status: "Pago",
  },
  {
    referencia: "10/07/2024",
    valorFatura: 200.20,
    vencimento: "20/07/2024",
    status: "Pendente",
  },
  {
    referencia: "10/06/2024",
    valorFatura: 150.50,
    vencimento: "20/06/2024",
    status: "Pago",
  },
  {
    referencia: "10/05/2024",
    valorFatura: 100.10,
    vencimento: "20/05/2024",
    status: "Pendente",
  },
  {
    referencia: "10/04/2024",
    valorFatura: 100.10,
    vencimento: "20/04/2024",
    status: "Pendente",
  },
];

const GridInvoice = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {isMobile ? (
        <InvoiceMobile data={rows}/>
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
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "& td": {
                      backgroundColor: "#DDDDDD4D",
                      textAlign: "center",
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      borderTopLeftRadius: "6px",
                      borderBottomLeftRadius: "6px",
                    }}
                  >
                    {row.referencia}
                  </TableCell>

                  <TableCell>{formatToMoney(row.valorFatura)}</TableCell>
                  <TableCell>{row.vencimento}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      sx={{
                        backgroundColor:
                          row.status === "Pago" ? "#D1FADA" : "#FFF4CC",
                        color: row.status === "Pago" ? "#36BD54" : "#C09807",
                        border: "none",
                      }}
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell>
                    <IconButton color="primary" aria-label="download">
                      <img
                        src="/assets/icons/mark-email.svg"
                        alt="icone email"
                        style={{ width: "1.3em", height: "1.3em" }}
                      />
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    <IconButton color="primary" aria-label="download">
                      <img
                        src="/assets/icons/download.svg"
                        alt="icone download"
                        style={{ width: "1.3em", height: "1.3em" }}
                      />
                    </IconButton>
                  </TableCell>

                  <TableCell
                    sx={{
                      borderTopRightRadius: "6px",
                      borderBottomRightRadius: "6px",
                    }}
                  >
                    <IconButton color="primary" aria-label="download">
                      <img
                        src="/assets/icons/download.svg"
                        alt="icone download"
                        style={{ width: "1.3em", height: "1.3em" }}
                      />
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
  textAlign: "center",
};

export default GridInvoice;
