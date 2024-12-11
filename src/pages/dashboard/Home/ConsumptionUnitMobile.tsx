import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { pxToRem } from "../../../theme/typography";
import { useAuthContext } from "../../../auth/useAuthContext";
import { useState } from "react";

type ConsumptionUnitMobileProps = {
  open: boolean;
  onClose: () => void;
};

const ConsumptionUnitMobile = ({
  open,
  onClose,
}: ConsumptionUnitMobileProps) => {
  const { SetPhysicalAssets, physicalAssetsSelected, user } = useAuthContext();
  const [value, setValue] = useState(physicalAssetsSelected);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  const handleContinuar = () => {
    SetPhysicalAssets(value!);
    onClose();
  };

  return (
    <Modal
      open={open}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
    >
      <Box sx={{ ...style }}>
        <Stack direction="column" alignItems="flex-start" spacing={4}>
          <Box sx={{
            display: "flex",
            justifyContent:"center",
            alignItems:"center",
            width: "100%",
            height: pxToRem(28)
          }}>
            <Box
              sx={{
                border: "4px solid #CBD5E1",
                width: pxToRem(30),
                borderRadius: pxToRem(4),
              }}
            ></Box>
          </Box>
          <IconButton onClick={onClose}>
            <Box
              component="img"
              src="/assets/home/arrow back.svg"
              sx={{
                width: pxToRem(20),
                height: pxToRem(20),
                cursor: "pointer",
                mr: pxToRem(8),
              }}
              alt="arrow back"
            />
            <Typography
              component="p"
              sx={{
                color: "#0F172A",
                fontSize: pxToRem(20),
                fontWeight: 500,
                lineHeight: pxToRem(23.7),
              }}
            >
              Unidade de consumo
            </Typography>
          </IconButton>

          <Typography
            component="p"
            sx={{
              color: "#0F172A",
              fontSize: pxToRem(16),
              fontWeight: 400,
              lineHeight: pxToRem(18.96),
            }}
          >
            Selecione o contrato e o unidade de consumo quedeseja consultar.
          </Typography>

          <FormControl fullWidth>
            <Stack spacing={2}>
              <InputLabel
                id="buttonSections-label"
                sx={{
                  color: "#797979",
                  fontSize: pxToRem(16),
                  fontWeight: 500,
                  lineHeight: pxToRem(18.96),
                }}
              >
                Unidade de Consumo
              </InputLabel>
              <Select
                labelId="buttonSections-label"
                id="buttonSectionsSelect"
                placeholder="Unidade de Consumo"
                label="Unidade de Consumo"
                value={value!}
                onChange={handleChange}
                sx={{
                  width: "100%",
                  "& .MuiSelect-select": {
                    color: "#909090",
                  },
                  background: "#FFFFFF",
                }}
              >
                {user?.physicalAssets?.map((section: any, index: number) => (
                  <MenuItem
                    value={section.id}
                    key={index}
                    sx={{
                      color: "#909090",
                      fontSize: pxToRem(16),
                      fontWeight: 400,
                      lineHeight: pxToRem(18.96),
                    }}
                  >
                    {section.name}
                  </MenuItem>
                ))}
              </Select>

              <Button
                variant="contained"
                onClick={handleContinuar}
                sx={{
                  height: pxToRem(50),
                  borderRadius: pxToRem(25),
                  padding: "16px 25px",
                }}
              >
                Continuar
              </Button>
            </Stack>
          </FormControl>
        </Stack>
      </Box>
    </Modal>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100vw",
  height: "100vh",
  overflowY: "auto",
  bgcolor: "#F1F7FF",
  boxShadow: 24,
  p: pxToRem(16),
  //   borderRadius: pxToRem(19),
};

export default ConsumptionUnitMobile;
