import { Container, Typography } from "@mui/material";
import { PageWrapper } from "../../common/page-wrapper/page-wrapper";
import { Theme } from "../../common/theme/theme";
import { useState, useEffect } from "react";

import { collection, onSnapshot } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { UserDetails } from "./User/UserDetails";
import { useMediaQuery } from "@mui/material";

export const UserPanel = () => {
  //firestore
  const db = getFirestore();
  const colRef = collection(db, "user-data");

  const maxWidth1000 = useMediaQuery(
    `(max-width: ${Theme.breakpoints.maxWidth1000})`
  );

  const [userData, setUserData] = useState([]);
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
      <Typography
        variant="h3"
        sx={{ textAlign: "center", marginBottom: "40px" }}>
        Panel użytkownika
      </Typography>
      <Container
        maxWidth={maxWidth1000 ? "xl" : "md"}
        sx={{
          backgroundColor: Theme.palette.secondary.main,
          margin: "0 auto",
          marginTop: "10px",
        }}>
        <UserDetails userData={userData} db={db} />
      </Container>
    </PageWrapper>
  );
};
