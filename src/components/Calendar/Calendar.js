import { useEffect, useState } from "react";

import AddEventForm from "./Events/AddEventForm";
import NewEvent from "./Events/NewEvent";
import { PageWrapper } from "../../common/page-wrapper/page-wrapper";
import { Typography } from "@mui/material";

import { firestore } from "../../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const CalendarList = () => {
  const docRef = collection(firestore, "calendar");
  const docRefOrdered = query(docRef, orderBy("date"));

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    onSnapshot(docRefOrdered, (doc) => {
      let data = [];
      doc.docs.forEach((element) => {
        data.push({ ...element.data(), id: element.id });
      });
      setItems(data);
    });
  };

  const [item, setItem] = useState("");
  const [date, setDate] = useState("");
  const [alert, setAlert] = useState(true);

  return (
    <PageWrapper>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", marginBottom: "40px" }}
      >
        Kalendarz
      </Typography>
      <AddEventForm
        item={item}
        setItem={setItem}
        date={date}
        setDate={setDate}
        alert={alert}
        setAlert={setAlert}
        docRef={docRef}
      />
      <NewEvent items={items} setItems={setItems} firestore={firestore} />
    </PageWrapper>
  );
};

export default CalendarList;
