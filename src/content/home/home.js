import { HomeLogin } from "./HomeLogin";
import { Intro } from "./Intro";
import { useContext } from "react";
import { UserContext } from "../../userContext/UserContext";
import(UserContext);

export const Home = () => {
  const { user } = useContext(UserContext);

  return user ? <HomeLogin /> : <Intro />;
};
