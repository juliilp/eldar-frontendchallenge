import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function useUser() {
  const user = useContext(UserContext);
  return { user };
}
