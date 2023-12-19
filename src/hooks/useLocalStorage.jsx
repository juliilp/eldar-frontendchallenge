import React from "react";

export default function useLocalStorage() {
  const getUser = localStorage.getItem("userLogin");
  const allUsers = localStorage.getItem("allUsers");
  const removeLogin = localStorage.removeItem("userLogin");
  return [getUser, allUsers, removeLogin];
}
