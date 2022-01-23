import { useState } from "react";
import AddEventForm from "./Events/AddEventForm";
import NewEvent from "./Events/NewEvent";
import { PageWrapper } from "../../common/page-wrapper/page-wrapper";

const CalendarList = () => {
  const [items, setItems] = useState([
    { item: "Data 1", alert: false, date: "2022-01-23", id: 1 },
    { item: "Data 2", alert: false, date: "2022-01-24",id: 2 },
    { item: "Data 3", alert: true, date: "2022-01-25",id: 3 },
    { item: "Data 4", alert: true, date: "2022-01-26",id: 4 },
  ]);
  const [name, setName] = useState("");
  const [alert, setAlert] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    const newItem = {
      item: name,
      alert: alert,
      date: date,
      id: Date.now(),
    };
    items.push(newItem);
    setName("");
  };

  return (
    <PageWrapper>
        <AddEventForm
          item={name}
          setItem={setName}
          setAlert={setAlert}
          setDate={setDate}
          handleSubmit={handleSubmit}
        />
        <NewEvent items={items} setItems={setItems} />
    </PageWrapper>
  );
};

export default CalendarList;
