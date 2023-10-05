import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl } from "@mui/material";
import dayjs from "dayjs";

function Calendar(props) {
  const disablePastDates = (date) => {
    return date < dayjs().startOf("day");
  };

  return (
    <FormControl fullWidth>
      <LocalizationProvider  dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Calendar"
          ref={props.ref}
          sx={{
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#666666 !important", 
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#118C94 !important", 
                borderWidth: "1px !important", 
              },
          }}
          onChange={props.onChange}
          value={props.value}
          shouldDisableDate={disablePastDates}
        />
      </LocalizationProvider>
    </FormControl>
  );
}

export default Calendar;
