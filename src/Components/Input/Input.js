import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";

function Input(props) {

  const Icon = (props) => <IconButton>{props.Icon}</IconButton>;

  const {initialValue} = props;

  return (
    <div>

      {props.isCssTextField && (
        <FormControl fullWidth>
          <TextField
            autoComplete={props.autoComplete}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            label={props.label}
            variant={props.variant}
            helperText={props.error ? props.errortext : ""}
            errortext={props.errortext}
            error={props.error}
            onBlur={props.onBlur}
            sx={{
              "& .MuiInput-underline:after": {
                borderBottomColor: "#118C94",
              },
            }}
            InputLabelProps={{
              style: { color: "#999999", width: "100%" },
            }}
          />
        </FormControl>
      )}

      {props.IsUsername && (
        <TextField
          style={{ marginBottom: 16 }}
          helperText={props.error ? props.errortext : ""}
          errortext={props.errortext}
          type={props.type}
          id={props.id}
          label={props.label}
          autoComplete={props.autoComplete}
          onBlur={props.onBlur}
          value={props.value}
          onChange={props.onChange}
          defaultValue={initialValue}
          error={props.error}
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
              "& input[type=number]::-webkit-outer-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "& input[type=number]::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
            },
          }}
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
                {<Icon Icon={props.Icon} />}
              </InputAdornment>
            ),
          }}
        />
      )}
      {props.isPassword && (
        <FormControl fullWidth>
          <TextField
            value={props.value}
            onChange={props.onChange}
            helperText={props.error ? props.errortext : ""}
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
