import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";
import AttachmentIcon from "@mui/icons-material/Attachment";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { IconButton } from "@mui/material";
import Button from "../Button/Button";
import { ButtonTypes } from "../Button/ButtonTypes";

function Input(props) {

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#118C94",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#118C94",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#EBEBEB",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#118C94",
      },
    },
  });

  const PostButton = () => (
    <IconButton>
      <Button type={ButtonTypes.POST} btnText="Post" />
    </IconButton>
  );

  const RedditTextField = styled((props) => (
    <TextField InputProps={{}} {...props} />
  ))(({ theme }) => ({
    "& .MuiFilledInput-root": {
      border: "1px solid #e2e2e1",
      overflow: "hidden",
      borderRadius: 4,
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      "&:hover": {
        backgroundColor: "transparent",
      },
      "&.Mui-focused": {
        backgroundColor: "transparent",
        boxShadow: `none`,
        borderColor: "#118C94",
      },
      "& input[type=number]::-webkit-outer-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
      "& input[type=number]::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
    },
  }));

  const [value, setValue] = React.useState(null);

  return (
    <div>
      {props.isClaendar && (
        <FormControl fullWidth>
          <LocalizationProvider variant="filled" dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Calendar"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#EBEBEB",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#118C94",
                  },
                },
                "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root": {
                  color: "#666666",
                },
                "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                  {
                    color: "#666666",
                  },
              }}
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </LocalizationProvider>
        </FormControl>
      )}

      {props.isPosting && (
        <FormControl fullWidth>
        <TextField
          label={props.label}
          type={props.type}
          variant={props.variant}
          autoComplete="off"
          sx={{
            "& .MuiFilledInput-root": {
              border: "1px solid #e2e2e1",
              overflow: "hidden",
              backgroundColor: "transparent",
              borderRadius: 1,
              "&.Mui-focused": {
                backgroundColor: "transparent",
                boxShadow: `none`,
                borderColor: "#118C94",
              },
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
          }}
          InputProps={{
          disableUnderline: true,
          endAdornment:
          <PostButton value={props.value} onClick={props.onClick} 
          /> 
        }}
          InputLabelProps={{
            style: { color: "#666666" },
          }}
        /></FormControl>
      )}

      {props.isAttachment && (
        <FormControl fullWidth>
          <RedditTextField
            label={props.label}
            type={props.type}
            id={props.id}
            variant={props.variant}
            InputLabelProps={{
              style: { color: "#666666" },
            }}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment
                  sx={{
                    width: 30,
                  }}
                  position="end"
                >
                  <AttachmentIcon />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      )}

      {props.isPeople && (
        <FormControl fullWidth>
          <RedditTextField
            label={props.label}
            type={props.type}
            id={props.id}
            autoComplete={props.autoComplete}
            variant={props.variant}
            InputLabelProps={{
              style: { color: "#666666" },
            }}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment
                  sx={{
                    width: 30,
                  }}
                  position="end"
                >
                  <PeopleOutlineIcon />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      )}

      {props.isCssTextField && (
        <FormControl fullWidth>
          <CssTextField
            autoComplete={props.autoComplete}
            id={props.id}
            label={props.label}
            variant={props.variant}
            InputLabelProps={{
              style: { color: "#999999", width: "100%" },
            }}
          />
        </FormControl>
      )}
      {props.IsUsername && (
        <TextField
          style={{ marginBottom: 16 }}
          helperText={props.error ? props.errorText : ""}
          type={props.type}
          id={props.id}
          label={props.label}
          value={props.value}
          onChange={props.onChange}
          error={props.error}
          onBlur={props.onBlur}
          variant={props.variant}
          fullWidth
          sx={{
            "& .MuiFilledInput-root": {
              border: "1px solid #e2e2e1",
              overflow: "hidden",
              backgroundColor: "transparent",
              borderRadius: 1,
              "&.Mui-focused": {
                backgroundColor: "transparent",
                boxShadow: `none`,
                borderColor: "#118C94",
              },
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
          }}
          InputLabelProps={{
            style: { color: "#666666" },
          }}
          InputProps={{
            disableUnderline: true,
          }}
        />
      )}
      {props.isPassword && (
        <FormControl fullWidth>
          <TextField
            value={props.value}
            onChange={props.onChange}
            helperText={props.error ? props.errorText : ""}
            error={props.error}
            label={props.label}
            onBlur={props.onBlur}
            variant={props.variant}
            id={props.id}
            type={props.type ? "text" : "password"}
            InputLabelProps={{
              style: { color: "#666666" },
            }}
            sx={{
              "& .MuiFilledInput-root": {
                border: "1px solid #e2e2e1",
                overflow: "hidden",
                backgroundColor: "transparent",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&.Mui-focused": {
                  backgroundColor: "transparent",
                  boxShadow: `none`,
                  borderColor: "#118C94",
                },
              },
            }}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment
                  sx={{
                    width: 30,
                  }}
                  position="end"
                  aria-label="toggle password visibility"
                  onClick={props.onClick}
                  onMouseDown={props.onMouseDown}
                >
                  {props.type ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      )}
    </div>
  );
}

export default Input;
