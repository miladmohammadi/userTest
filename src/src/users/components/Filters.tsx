import { FunctionComponent, useEffect, useState } from "react";
import { useDebounce } from "@react-hook/debounce";
import { Box, Grid, TextField, Typography } from "@mui/material";
import MultiSelect from "./MultiSelect";
import * as React from "react";

const Filters: FunctionComponent<any> = ({ setRoles, setSearch }) => {
  const [searchString, setSearchString] = useState<string | undefined>("");
  const [debounced, setDebounced] = useDebounce<string | undefined>("", 100);
  const [rolesI, setRolesI] = useState<string[]>([]);
  useEffect(() => {
    setDebounced(searchString);
  }, [searchString]);
  useEffect(() => {
    setSearch(debounced?.toLowerCase());
  }, [debounced]);
  useEffect(() => {
    setRoles(rolesI);
  }, [rolesI]);
  return (
    <Grid item xs={12} sm={12} md={6} sx={{ my: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", alignItems: "center" }}>
        <Box>
          <Typography variant={"subtitle1"}>Filters:</Typography>
        </Box>
        <Box sx={{ mx: 1 }}>
          <TextField
            variant={"outlined"}
            label={"Email (starts with)"}
            placeholder={"milad@gmail.com"}
            value={searchString}
            fullWidth
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
          />
        </Box>
        <Box sx={{ mx: 1, minWidth: "200px" }}>
          <MultiSelect ro={rolesI} setRo={setRolesI} />
        </Box>
      </Box>
    </Grid>
  );
};
export default Filters;
