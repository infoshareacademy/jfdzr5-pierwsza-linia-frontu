import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {PageWrapper} from "../../common/page-wrapper/page-wrapper";
import { Theme } from "../../common/theme/theme";
import Typography from "@mui/material/Typography";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BarChartIcon from '@mui/icons-material/BarChart';

const TileContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
`;

const Tile = styled.div`
    display: inline-block;
    background: ${Theme.palette.secondary.main};
    margin: 2rem;
    padding: 1rem;
    min-width: 40rem;
    min-height: 15rem;
    border: 3px solid transparent;
    border-collapse: collapse;
    &:hover {
        cursor: pointer;
        border: 3px solid ${Theme.palette.primary.contrastText}
      }
`

const HorizontalLine = styled.hr`
    background-color: ${Theme.palette.primary.contrastText};
    border-color: ${Theme.palette.primary.contrastText};
    width: 70%;
    height: 0.25rem;
    margin: 1rem;
`

export const Home = () => {
    return <PageWrapper title="Home App">
            <Typography variant="h3" >Witaj w aplikacji Home Organizer!</Typography>  
            <TileContainer>
                <Tile component={Link} to="/tasks">
                <FormatListNumberedIcon sx={{marginLeft: "1rem", fontSize: "3rem"}}/>
                <Typography variant="h3" sx={{margin: "1rem"}}>Zadania</Typography>
                <HorizontalLine />
                <Typography paragraph="true" sx={{margin:"1rem", fontSize: "1rem"}}>Przeglądaj zadania do wykonania, dodaj nowe lub edytuj już istniejące.</Typography>
                </Tile>
                <Tile component={Link} to="/budget">
                <AccountBalanceWalletIcon sx={{marginLeft: "1rem", fontSize: "3rem"}}/>
                <Typography variant="h3" sx={{margin: "1rem"}}>Budżet</Typography>
                <HorizontalLine />
                <Typography paragraph="true" sx={{margin:"1rem", fontSize: "1rem"}}>Zarządzaj domowym budżetem, wprowadź wpływy i wydatki, analizuj strukturę wydatków.</Typography>
                </Tile>
                <Tile component={Link} to="/calendar">
                <ScheduleIcon sx={{marginLeft: "1rem", fontSize: "3rem"}}/>
                <Typography variant="h3" sx={{margin: "1rem"}}>Kalendarz</Typography>
                <HorizontalLine />
                <Typography paragraph="true" sx={{margin:"1rem", fontSize: "1rem"}}>Dodaj daty, rocznice i terminy, o których już nigdy nie zapomnisz.</Typography>
                </Tile>
                <Tile component={Link} to="/dashboard">
                <BarChartIcon sx={{marginLeft: "1rem", fontSize: "3rem"}}/>
                <Typography variant="h3" sx={{margin: "1rem"}}>Dashboard</Typography>
                <HorizontalLine />
                <Typography paragraph="true" sx={{margin:"1rem", fontSize: "1rem"}}>Sprawdź dane i zasoby aplikacji.</Typography>
                </Tile>
            </TileContainer>
    </PageWrapper>
}