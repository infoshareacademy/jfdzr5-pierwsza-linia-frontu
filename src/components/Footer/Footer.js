import { AppBar, Typography } from "@mui/material";
import { Theme } from "../../common/theme/theme";

export const Footer = () => {
  return (
    <>
      <AppBar position="static" theme={Theme} color="secondary">
        <Typography
          variant="string"
          sx={{ padding: "10px", fontSize: "0.8rem" }}>
          Designed by: First Front Line ⓒ Wszelkie prawa zastrzeżone.
        </Typography>
      </AppBar>
    </>
  );
};
