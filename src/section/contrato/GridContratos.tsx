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
  Tooltip,
  CircularProgress,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { pxToRem } from "../../theme/typography";
import Carousel from "../../components/Carousel";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useAuthContext } from "../../auth/useAuthContext";
import { formatToDate } from "../../utils/format";
import dayjs from "dayjs";
import { enqueueSnackbar } from "../../components/snackbar";

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
    description: "Responsável",
  },
  {
    description: "Endereço",
  },
  {
    description: "Baixar",
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

interface contracts {
  success: boolean;
  message: string | null;
  response: {
    contracts: contratoProps[];
  };
}

interface contratoProps {
  code: string;
  partyName: string;
  counterPartyName: string;
  startDate: string;
  endDate: string;
  price: number;
  value: number;
  partyProfileAcronym: string;
  counterPartyProfileAcronym: string;
}

const downloadContract = async (code: string) => {
  try {
    const { data } = await axiosInstance.post(
      "/v1/Operation/download-contract",
      { contractId: code },
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${code}.${data.type.split("/")[1]}`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  } catch (error: any) {
    console.error(error);
    enqueueSnackbar("Arquivo não encontrado", {
      variant: "error",
    });
  }
};

const getStatus = (item: contratoProps) => {
  const dataAtual = dayjs();
  const dataInicio = dayjs(item.startDate);
  const dataFim = dayjs(item.endDate);

  const status =
    dataAtual.isAfter(dataInicio) && dataAtual.isBefore(dataFim)
      ? "Ativo"
      : "Inativo";
  // console.log(status);
  return status;
};

interface ChipProps {
  value: string;
}

const ChipStatus: React.FC<ChipProps> = ({ value }) => {
  return (
    <Chip
      label={value}
      sx={{
        backgroundColor: value === "Ativo" ? "#D1FADA" : "#FFF4CC",
        color: value === "Ativo" ? "#36BD54" : "#C09807",
        width: "fit-content",
      }}
    />
  );
};

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

      {typeValue.type === "status" && <ChipStatus value={value as string} />}

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
        <IconButton
          color="primary"
          aria-label={label}
          onClick={() => downloadContract(value as string)}
        >
          <DownloadIcon />
        </IconButton>
      )}
    </Stack>
  );
};

const renderCards = (contracts: contratoProps[]) => {
  return contracts.map((row, index) => (
    <Box
      key={index}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <StackItem label="N° Contrato" value={row.code} />
      <StackItem
        label="Status"
        value={getStatus(row)} //{row.status}
        typeValue={{ type: "status" }}
      />
      <StackItem label="Adesão" value={formatToDate(row.startDate)} />
      <StackItem label="Responsável" value={row.counterPartyName} />
      <StackItem label="Endereço" value={row.partyProfileAcronym} />
      <StackItem
        label="Baixar"
        value={row.code}
        typeValue={{ type: "download" }}
      />
    </Box>
  ));
};


const GridContratosTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { physicalAssetsSelected, user } = useAuthContext();
  const [contracts, setContracts] = useState<contratoProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMyContracts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post<contracts>(
        "/v1/Account/my-contracts",
        { physicalAssetId: physicalAssetsSelected }
      );

      setContracts(data.response.contracts);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [physicalAssetsSelected]);

  const getAddress = (): string => {
    const address = user?.address;
    return `${address?.street ?? ''} ${address?.number ?? ''}, ${address?.neighborhood ?? ''}, ${address?.city ?? ''}, ${address?.state ?? ''}${address?.zipcode ? ` - CEP ${address.zipcode}` : ''}`.trim();
  };

  useEffect(() => {
    getMyContracts();
  }, [getMyContracts]);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : isMobile ? (
        <Carousel cards={renderCards(contracts)} />
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
                {columns.map((column, index) => (
                  <TableCell key={index} sx={headStyle}>
                    {column.description}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {contracts.map((row, key) => (
                <TableRow
                  key={key}
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
                    {row.code}
                  </TableCell>
                  <TableCell>
                    <ChipStatus value={getStatus(row)} />
                  </TableCell>
                  <TableCell>{formatToDate(row.startDate)}</TableCell>
                  <TableCell>{formatToDate(row.endDate)}</TableCell>
                  <TableCell>
                    {user?.physicalAssets.find(
                      ({ id }) => id === physicalAssetsSelected
                    )?.name || "Not Found"}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: "200px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Tooltip title={getAddress()} arrow>
                      <span>{getAddress()}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell
                    sx={{
                      borderTopRightRadius: "6px",
                      borderBottomRightRadius: "6px",
                    }}
                  >
                    <IconButton
                      color="primary"
                      aria-label="download"
                      onClick={() => downloadContract(row.code)}
                    >
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
