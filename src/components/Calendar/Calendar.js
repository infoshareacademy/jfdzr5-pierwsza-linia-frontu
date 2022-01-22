import { useState } from "react";
import AddEventForm from "./Events/AddEventForm";
import NewEvent from "./Events/NewEvent";

import Container from "@mui/material/Container";
import { Theme } from "../../common/theme";
import { Typography } from "@mui/material";

const CalendarList = () => {
  const [items, setItems] = useState([
    { item: "Data 1", isChecked: false, id: 1 },
    { item: "Data 2", isChecked: true, id: 2 },
    { item: "Data 3", isChecked: true, id: 3 },
    { item: "Data 4", isChecked: true, id: 4 },
  ]);
  const [item, setItem] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    const newItem = {
      item: item,
      isChecked: false,
      id: Math.floor(Math.random() * 1000),
    };
    items.push(newItem);
    setItem("");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: Theme.palette.secondary.main,
        margin: "0 auto",
        marginTop: "10px",
      }}>
      <Container>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Lista wydarzeń
        </Typography>
        <AddEventForm
          item={item}
          setItem={setItem}
          handleSubmit={handleSubmit}
        />
        <NewEvent items={items} setItems={setItems} />
      </Container>
    </Container>
  );
};

export default CalendarList;
