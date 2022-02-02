import {
  Container,
  FormGroup,
  Input,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Theme } from "../../../common/theme/theme";

import { PageWrapper } from "../../../common/page-wrapper/page-wrapper";
import { Box } from "@mui/system";
import styled from "styled-components";

const DetailsContainer = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px;
  padding: 20px;
  background-color: grey;
  // justify-content: space-between;
`;

export const UserDetails = ({ userData }) => {
  return (
    <Container>
      <FormGroup sx={{ margin: "10px", padding: "10px" }}>
        {userData.map(element => (
          <>
            <Typography variant="h5">Dane użytkownika</Typography>
            <DetailsContainer>
              <TextField fullWidth label="Imie" value={`${element.name}`} />
              <TextField
                fullWidth
                label="Nazwisko"
                value={`${element.surname}`}
              />
              <TextField fullWidth label="Email" value={`mail`} />
              <TextField
                fullWidth
                label="Nr telefonu"
                value={`${element.telephone}`}
              />
            </DetailsContainer>

            <Typography variant="h5">Adres</Typography>
            <DetailsContainer style={{ flexWrap: "wrap" }}>
              <TextField
                fullWidth
                label="Ulica"
                value={`${element.street}`}
                s
              />
              <TextField
                fullWidth
                label="Nr domu/mieszkania"
                value={`${element.houseNumber}`}
              />
              <TextField
                fullWidth
                label="Miejscowość"
                value={`${element.city}`}
              />
              <TextField
                fullWidth
                label="Kod pocztowy"
                value={`${element.postcode}`}
              />
            </DetailsContainer>
          </>
        ))}
      </FormGroup>
    </Container>
  );
};
