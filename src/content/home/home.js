import { Link } from "react-router-dom";

import styled from "styled-components";
import { Theme } from "../../common/theme/theme";

import { PageWrapper } from "../../common/page-wrapper/page-wrapper";

import { Box } from "@mui/material";
import { Typography } from "@mui/material";

import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BarChartIcon from "@mui/icons-material/BarChart";

import { HomeLogin } from "./HomeLogin";
import { Intro } from "./Intro";
import { useContext } from "react";
import { UserContext } from "../../userContext/UserContext";
import(UserContext);

const TileContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
`;

const HorizontalLine = styled.hr`
  background-color: ${Theme.palette.primary.contrastText};
  border-color: ${Theme.palette.primary.contrastText};
  width: 70%;
  height: 0.25rem;
  margin: 1rem;
`;

export const Home = () => {
  const { user,  } = useContext(UserContext);

  return user ? (
    <HomeLogin>Zalogowany</HomeLogin>
  ) : (
    <Intro>Niezalogowany</Intro>
  );
};
