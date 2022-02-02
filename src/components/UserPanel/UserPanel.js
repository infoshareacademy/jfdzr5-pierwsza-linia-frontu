import { Container, Typography } from "@mui/material";
import { PageWrapper } from "../../common/page-wrapper/page-wrapper";
import { Theme } from "../../common/theme/theme";
import { useState, useEffect } from "react";

import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { UserDetails } from "./User/UserDetails";

export const UserPanel = () => {
  //firestore
  const db = getFirestore();
  const colRef = collection(db, "user-data");
  //   const colRefOrdered = query(colRef, orderBy("timeStamp"));

  const [userData, setUserData] = useState([]);
  console.log(userData);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    onSnapshot(colRef, doc => {
      let data = [];
      doc.docs.forEach(element => {
        data.push({ ...element.data(), id: element.id });
      });
      setUserData(data);
    });
  };

  return (
    <PageWrapper>
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: Theme.palette.secondary.main,
          margin: "0 auto",
          marginTop: "10px",
        }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Panel użytkownika
        </Typography>
        <UserDetails userData={userData} db={db} />
      </Container>
    </PageWrapper>
  );
};
