import { useState } from "react";
import AddEventForm from "./Events/AddEventForm";
import NewEvent from "./Events/NewEvent";
import {PageWrapper} from "../../common/page-wrapper/page-wrapper";

import Container from "@mui/material/Container";
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
    <PageWrapper>
        <AddEventForm
          item={item}
          setItem={setItem}
          handleSubmit={handleSubmit}
        />
        <NewEvent items={items} setItems={setItems} />
    </PageWrapper>
  );
};

export default CalendarList;
