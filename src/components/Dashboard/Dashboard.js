import { useState } from "react";

import styled from 'styled-components';
import { Theme } from "../../common/theme/theme";

import {PageWrapper} from "../../common/page-wrapper/page-wrapper";

import Typography from "@mui/material/Typography";
import GroupIcon from '@mui/icons-material/Group';
import ListAltIcon from '@mui/icons-material/ListAlt';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import { firestore } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const TileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

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
    const tasksRef = collection(firestore, "to-do-list");
    const eventsRef = collection(firestore, "calendar");

    const [tasksNumber, setTasksNumber] = useState();
    const [eventsNumber, setEventsNumber] = useState();
    
    let tasksCounter = 0;
    let eventsCounter = 0;

    const fetchTasks = () => {
        onSnapshot(tasksRef, doc => {
          doc.docs.forEach(element => {
            tasksCounter += 1;
          });
          setTasksNumber(tasksCounter);
        });
      };
      const fetchEvents = () => {
        onSnapshot(eventsRef, doc => {
          doc.docs.forEach(element => {
            eventsCounter += 1;
          });
          setEventsNumber(eventsCounter);
        });
      };
      fetchTasks();
      fetchEvents();

    return <PageWrapper title="Home App">  
            <TileContainer>
                <Tile>
                <GroupIcon sx={{marginLeft: "1rem", fontSize: "3rem"}}/>
                <Typography variant="h4" sx={{margin: "1rem"}}>Użytkownicy</Typography>
                <HorizontalLine />
                <Typography paragraph="true" sx={{margin:"1rem", fontSize: "3rem"}}>-</Typography>
                </Tile>
                <Tile>
                <ListAltIcon sx={{marginLeft: "1rem", fontSize: "3rem"}}/>
                <Typography variant="h4" sx={{margin: "1rem"}}>Zadania</Typography>
                <HorizontalLine />
                <Typography paragraph="true" sx={{margin:"1rem", fontSize: "3rem"}}>{tasksNumber}</Typography>
                </Tile>
                <Tile>
                <NotificationsActiveIcon sx={{marginLeft: "1rem", fontSize: "3rem"}}/>
                <Typography variant="h4" sx={{margin: "1rem"}}>Wydarzenia</Typography>
                <HorizontalLine />
                <Typography paragraph="true" sx={{margin:"1rem", fontSize: "3rem"}}>{eventsNumber}</Typography>
                </Tile>
            </TileContainer>
    </PageWrapper>
}

export default Dashboard;