import * as React from "react";
import { FunctionComponent } from "react";
import { Button, ButtonGroup, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ModeToggle: FunctionComponent<{ mode: "show" | "edit"; id?: string }> = ({ mode, id }) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sx={{ display: "flex", flexDirection: "row-reverse" }}>
      <ButtonGroup variant="outlined" size="small" disableElevation aria-label="outlined button group">
        <Button
          variant={mode === "show" ? "contained" : "outlined"}
          sx={{ p: 1.5 }}
          onClick={() => {
            navigate("/user/" + id);
          }}
        >
          Show
        </Button>
        <Button
          variant={mode === "show" ? "outlined" : "contained"}
          sx={{ p: 1.5 }}
          onClick={() => {
            navigate("/user/edit/" + id);
          }}
        >
          Edit
        </Button>
      </ButtonGroup>
    </Grid>
  );
};
export default ModeToggle;
