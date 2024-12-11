import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { pxToRem } from "../../../theme/typography";
import { useAuthContext } from "../../../auth/useAuthContext";



const ConsumptionUnit = () => {
  const { SetPhysicalAssets, physicalAssetsSelected, user } = useAuthContext();

  const handleChange = (event: SelectChangeEvent) => {
    SetPhysicalAssets(event.target.value);
  };



  return (
    <FormControl fullWidth>
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
        value={physicalAssetsSelected!}
        onChange={handleChange}
        sx={{
          width: "399px",
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
    </FormControl>
  );
};

export default ConsumptionUnit;
