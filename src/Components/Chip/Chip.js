import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

const names = [
  "Football",
  "Other tag",
  "tag",
  "Voxing",
  "Volleyball ",
  "Baseball ",
  "Diving",
  "Golf",
  "Cycling",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip(props) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleDelete = (e, value) => {
    e.preventDefault();
    setPersonName(personName.filter((name) => name !== value));
  };

  return (
    <div>
      <FormControl sx={{ marginTop: "9px", width: "100%" }}>
        <InputLabel style={{ color: "#666666" }} id="demo-multiple-gert-label">
          {props.label}
        </InputLabel>
        <Select
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#118C94",
            },
            ".MuiSvgIcon-root ": {
              fill: "#CCCCCC !important",
            },
          }}
          labelId="demo-multiple-Choose tag-label"
          id="demo-multiple-Choose tag"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label={props.label} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  clickable="true"
                  deleteIcon={
                    <CancelIcon onMouseDown={(e) => e.stopPropagation()} />
                  }
                  onDelete={(e) => handleDelete(e, value)}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
