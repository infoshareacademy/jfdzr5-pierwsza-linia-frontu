import styled from 'styled-components';
import {PageWrapper} from "../../common/page-wrapper/page-wrapper";
import { Theme } from "../../common/theme/theme";
import Typography from "@mui/material/Typography";
import GroupIcon from '@mui/icons-material/Group';
import ListAltIcon from '@mui/icons-material/ListAlt';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const TileContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
`;

const Tile = styled.div`
    display: inline-block;
    background: ${Theme.palette.secondary.main};
    margin: 2rem;
    padding: 3rem;
    min-width: 20rem;
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

const Dashboard = () => {
    return <PageWrapper title="Home App">  
            <TileContainer>
                <Tile>
                <GroupIcon sx={{marginLeft: "1rem", fontSize: "3rem"}}/>
                <Typography variant="h4" sx={{margin: "1rem"}}>Użytkownicy</Typography>
                <HorizontalLine />
                <Typography paragraph="true" sx={{margin:"1rem", fontSize: "3rem"}}>5</Typography>
                </Tile>
                <Tile>
                <ListAltIcon sx={{marginLeft: "1rem", fontSize: "3rem"}}/>
                <Typography variant="h4" sx={{margin: "1rem"}}>Zadania</Typography>
                <HorizontalLine />
                <Typography paragraph="true" sx={{margin:"1rem", fontSize: "3rem"}}>23</Typography>
                </Tile>
                <Tile>
                <NotificationsActiveIcon sx={{marginLeft: "1rem", fontSize: "3rem"}}/>
                <Typography variant="h4" sx={{margin: "1rem"}}>Wydarzenia</Typography>
                <HorizontalLine />
                <Typography paragraph="true" sx={{margin:"1rem", fontSize: "3rem"}}>33</Typography>
                </Tile>
            </TileContainer>
    </PageWrapper>
}

export default Dashboard;