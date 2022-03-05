import styled from "styled-components";
import { Theme } from "../../common/theme/theme";

import { PageWrapper } from "../../common/page-wrapper/page-wrapper";

import { Typography } from "@mui/material";

import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BarChartIcon from "@mui/icons-material/BarChart";
import { BoxContainer } from "./BoxContainer";
import { BoxContainerDashboard } from "./BoxContainerDashboard";

import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Box } from "@mui/system";
import { BoxPanel } from "./BoxPanel";

const TileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 800px;
  justify-content: center;
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }
`;

const HorizontalLine = styled.hr`
  background-color: ${Theme.palette.primary.contrastText};
  border-color: ${Theme.palette.primary.contrastText};
  width: 70%;
  height: 0.25rem;
  margin: 1rem;
`;

export const HomeLogin = ({
  usersNumber,
  tasksNumber,
  eventsNumber,
  name,
  surname,
}) => {
  return (
    <PageWrapper title="Home App">
      <Typography variant="h4">
        <strong> {`${name} ${surname}`}</strong> witaj w aplikacji Home Organizer!
      </Typography>
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

        <BoxContainerDashboard>
          <Box sx={{ flexGrow: "5", width: "75rem" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <Typography
                variant="h4"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: ".5rem",
                }}>
                <BarChartIcon
                  paragraph="true"
                  sx={{ marginLeft: "1rem", fontSize: "3rem" }}
                />
                <Typography
                  paragraph="true"
                  sx={{ margin: "0 0 0 .5rem", fontSize: "2rem" }}>
                  Panel
                </Typography>
              </Typography>
              <Typography
                paragraph="true"
                sx={{ align: "center", margin: ".5rem", fontSize: "1rem" }}>
                Sprawdź dane i zasoby aplikacji.
              </Typography>
            </Box>

            <HorizontalLine style={{ margin: "0 auto", width: "90%" }} />
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
              {usersNumber}
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
