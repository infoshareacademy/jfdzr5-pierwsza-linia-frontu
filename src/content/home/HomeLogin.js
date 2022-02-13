import styled from "styled-components";
import { Theme } from "../../common/theme/theme";

import { PageWrapper } from "../../common/page-wrapper/page-wrapper";

import { Typography } from "@mui/material";

import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BarChartIcon from "@mui/icons-material/BarChart";
import { BoxContainer } from "./BoxContainer";

const TileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 800px;
  justify-content: center;
`;

const HorizontalLine = styled.hr`
  background-color: ${Theme.palette.primary.contrastText};
  border-color: ${Theme.palette.primary.contrastText};
  width: 70%;
  height: 0.25rem;
  margin: 1rem;
`;

export const HomeLogin = () => {
  return (
    <PageWrapper title="Home App">
      <Typography variant="h4"> Witaj w aplikacji Home Organizer!</Typography>
      <TileContainer>
        <BoxContainer to="/tasks">
          <FormatListNumberedIcon
            sx={{ marginLeft: "1rem", fontSize: "3rem" }}
          />
          <Typography variant="h4" sx={{ margin: "1rem" }}>
            Zadania
          </Typography>
          <HorizontalLine />
          <Typography
            paragraph="true"
            sx={{ margin: "1rem", fontSize: "1rem" }}>
            Przeglądaj zadania do wykonania, dodaj nowe lub edytuj już
            istniejące.
          </Typography>
        </BoxContainer>
        <BoxContainer to="/budget">
          <AccountBalanceWalletIcon
            sx={{ marginLeft: "1rem", fontSize: "3rem" }}
          />
          <Typography variant="h4" sx={{ margin: "1rem" }}>
            Budżet
          </Typography>
          <HorizontalLine />
          <Typography
            paragraph="true"
            sx={{ margin: "1rem", fontSize: "1rem" }}>
            Zarządzaj domowym budżetem, wprowadź wpływy i wydatki, analizuj
            strukturę wydatków.
          </Typography>
        </BoxContainer>
        <BoxContainer to="/calendar">
          <ScheduleIcon sx={{ marginLeft: "1rem", fontSize: "3rem" }} />
          <Typography variant="h4" sx={{ margin: "1rem" }}>
            Kalendarz
          </Typography>
          <HorizontalLine />
          <Typography
            paragraph="true"
            sx={{ margin: "1rem", fontSize: "1rem" }}>
            Dodaj daty, rocznice i terminy, o których już nigdy nie zapomnisz.
          </Typography>
        </BoxContainer>
        <BoxContainer to="/dashboard">
          <BarChartIcon sx={{ marginLeft: "1rem", fontSize: "3rem" }} />
          <Typography variant="h4" sx={{ margin: "1rem" }}>
            Dashboard
          </Typography>
          <HorizontalLine />
          <Typography
            paragraph="true"
            sx={{ margin: "1rem", fontSize: "1rem" }}>
            Sprawdź dane i zasoby aplikacji.
          </Typography>
        </BoxContainer>
      </TileContainer>
    </PageWrapper>
  );
};
