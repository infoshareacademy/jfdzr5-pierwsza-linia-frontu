import styled from "styled-components";
import { Theme } from "../../common/theme/theme";

import { PageWrapper } from "../../common/page-wrapper/page-wrapper";

import { Typography } from "@mui/material";

import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BarChartIcon from "@mui/icons-material/BarChart";
import { BoxContainerUnlogged } from "./BoxContainerUnlogged";
import { BoxContainerDashboard } from "./BoxContainerDashboard";
import { Box } from "@mui/system";
import { BoxPanel } from "./BoxPanel";

import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

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

export const Intro = ({ tasksNumber, eventsNumber }) => {
  return (
    <PageWrapper title="Home App">
      <Typography variant="h4"> Witaj w aplikacji Home Organizer!</Typography>
      <Typography sx={{ textAlign: "center" }} variant="h6">
        Jeśli chcesz zapisać swoje zadania, zorganizować swój budżet domowy, nie
        zapomnieć ważnym wydarzeniu - załóż konto i zacznij korzystać z naszej
        aplikacji.
      </Typography>
      <TileContainer>
        <BoxContainerUnlogged>
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
        </BoxContainerUnlogged>
        <BoxContainerUnlogged>
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
        </BoxContainerUnlogged>
        <BoxContainerUnlogged>
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
        </BoxContainerUnlogged>

        <BoxContainerDashboard>
          <Box sx={{ flexGrow: "5", width: "75rem" }}>
            <Box>
              <Typography
                variant="h4"
                sx={{ margin: "1rem", textAlign: "center" }}>
                <BarChartIcon sx={{ marginLeft: "1rem", fontSize: "3rem" }} />
                Panel
                <Typography
                  paragraph="true"
                  sx={{ margin: "1rem", fontSize: "1rem" }}>
                  Sprawdź dane i zasoby aplikacji.
                </Typography>
              </Typography>
            </Box>

            <HorizontalLine style={{ width: "96%" }} />
          </Box>
          <BoxPanel>
            <GroupIcon sx={{ marginLeft: "1rem", fontSize: "2rem" }} />
            <Typography variant="h6" sx={{ margin: "1rem" }}>
              Użytkownicy
            </Typography>
            <HorizontalLine />
            <Typography
              paragraph="true"
              sx={{ margin: "1rem", fontSize: "2rem" }}>
              -
            </Typography>
          </BoxPanel>
          <BoxPanel>
            <ListAltIcon sx={{ marginLeft: "1rem", fontSize: "2rem" }} />
            <Typography variant="h6" sx={{ margin: "1rem" }}>
              Zadania
            </Typography>
            <HorizontalLine />
            <Typography
              paragraph="true"
              sx={{ margin: "1rem", fontSize: "2rem" }}>
              {tasksNumber}
            </Typography>
          </BoxPanel>
          <BoxPanel>
            <NotificationsActiveIcon
              sx={{ marginLeft: "1rem", fontSize: "2rem" }}
            />
            <Typography variant="h6" sx={{ margin: "1rem" }}>
              Wydarzenia
            </Typography>
            <HorizontalLine />
            <Typography
              paragraph="true"
              sx={{ margin: "1rem", fontSize: "2rem" }}>
              {eventsNumber}
            </Typography>
          </BoxPanel>
        </BoxContainerDashboard>
      </TileContainer>
    </PageWrapper>
  );
};
