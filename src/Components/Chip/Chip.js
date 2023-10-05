import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel"; // Import InputLabel
import { useState } from "react";

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

const names = [
  "Football",
  "Cricket",
  "Hockey",
  "Tennis",
  "Volleyball",
  "Table Tennis",
  "Basketball",
  "Baseball",
  "Rugby",
  "Golf",
];

export default function MultipleSelect(props) {
  const [selectedNames, setSelectedNames] = useState([]);

  const handleSelectChange = (event) => {
    const selectedName = event.target.value;

    if (!selectedNames.includes(selectedName)) {
      setSelectedNames([...selectedNames, selectedName]);
      props.onChange(event);
    }
  };

  const availableNames = names.filter((name) => !selectedNames.includes(name));

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel
          style={{ color: "#666666" }}
          htmlFor="demo-multiple-name-label"
        >
          {" "}
          Tags
        </InputLabel>
        <Select
          label="tags"
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#118C94 !important",
              borderWidth: "1px",
            },
          }}
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={props.value}
          onChange={handleSelectChange}
          MenuProps={MenuProps}
        >
          {availableNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
