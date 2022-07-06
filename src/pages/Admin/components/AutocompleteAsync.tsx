import React, { useEffect } from "react";
import axios from "axios";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface PropsAutocomplete {
  endpoint: string;
  token: string;
  placeholder: string;
  handleInput: (e: any) => void;
}

const AutcompleteAsync = ({
  endpoint,
  token,
  placeholder,
  handleInput,
}: PropsAutocomplete) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly any[]>([]);
  const loading = open && options.length === 0;
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      let result: any[] = [];
      await axios
        .get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response: any) => {
          result = response.data.map((world: any) => {
            return world.nombre;
          });
        })
        .catch((error: any) => {
          console.log("Error", error);
          if (error.response.status === 401) {
            navigate("/login");
          }
        });

      if (active) {
        setOptions([...result]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      sx={{ width: 300, marginRight: "20px" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event: any, newValue: string | null) => {
        handleInput(newValue);
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          variant="standard"
          {...params}
          sx={{
            backgroundColor: "#FFFFFF",
            margin: "10px",
            width: "25vw",
            maxWidth: "300px",
            border: "3px solid #91be33",
            boxSizing: "border-box",
            borderRadius: "10px",
            padding: "5px",
            position: "relative",
            display: "block",
            input: {
              color: "#757575",
              fontWeight: "bold",
              fontSize: "1.1rem",
              height: "auto",
              wordBreak: "break-word",
            },
          }}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default AutcompleteAsync;
