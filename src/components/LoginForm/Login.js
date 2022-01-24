import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Theme } from "../../common/theme/theme";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";




export const Login = () => {
  const handleSubmit = () => {};

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: Theme.palette.secondary.main, 
  
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
          <Icon>lock</Icon>
        </Avatar>
        <Typography component="h1" variant="h5">
          Zaloguj się!
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 3, height: 350 }}
        >
          <TextField
            sx={{
              backgroundColor: "#808080",
              width: {
                lg: 400,
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            id="email"
            label= "Adres email"
            type="email"
            autoComplete="email"
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="email"
          />
          <TextField
            sx={{
              backgroundColor: "#808080",
              width: {
                lg: 400,
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            id="password"
            label="Hasło"
            type="password"
            autoComplete="current-password"
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="password"
          />
          <Button
            fullWidth
            sx={{ mt: 3, mb: 5, bgcolor: "primary.contrastText", color: "secondary.contrastText" }}
            variant="contained" type="submit">
            Zaloguj
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body3" color={"#808080"}>
                {"Nie masz konta? Zarejestruj się!"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};