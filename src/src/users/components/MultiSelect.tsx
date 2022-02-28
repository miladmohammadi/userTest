import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Dispatch, FunctionComponent, SetStateAction } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Roles = ["ADMIN", "STAFF", "MEMBER"];

function getStyles(role: string, Roles: readonly string[], theme: Theme) {
  return {
    fontWeight: Roles.indexOf(role) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

const MultiSelect: FunctionComponent<{ ro: string[]; setRo: Dispatch<SetStateAction<string[]>> }> = ({ ro, setRo }) => {
  const theme = useTheme();
  const handleChange = (event: SelectChangeEvent<typeof ro>) => {
    const {
      target: { value },
    } = event;
    setRo(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-multiple-chip-label">Roles</InputLabel>
      <Select
        variant={"filled"}
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={ro}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" fullWidth />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} size={"small"} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {Roles.map((role) => (
          <MenuItem key={role} value={role} style={getStyles(role, ro, theme)}>
            {role}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default MultiSelect;
