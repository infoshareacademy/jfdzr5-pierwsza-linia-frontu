import { AppBar, Button, Icon, Typography } from "@mui/material";
import { Theme } from "../../common/theme/theme";
import logo from "./git-hub-logo.svg";

export const Footer = () => {
  return (
    <>
      <AppBar position="static" theme={Theme} color="secondary">
        <Typography
          variant="string"
          sx={{ padding: "10px", fontSize: "0.8rem" }}>
          Designed by: First Front Line ⓒ Wszelkie prawa zastrzeżone.
          <Button
            sx={{
              color: Theme.palette.secondary.contrastText,
              ":hover": { color: "Theme.palette.primary.contrastText " },
            }}>
            <Icon>
              <a
                href="https://github.com/infoshareacademy/jfdzr5-pierwsza-linia-frontu"
                target="blank">
                <img src={logo} alt="github-logo" />
              </a>
            </Icon>
          </Button>
        </Typography>
      </AppBar>
    </>
  );
};
