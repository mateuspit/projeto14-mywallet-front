import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [config, setConfig] = useState({});
  const [userData, setUserData] = useState({});
  const lsUser = JSON.parse(localStorage.getItem("user"))
  const [lsData, setLsData] = useState(lsUser);
  const [login, setLogin] = useState({});
  //   const [userHabits, setUserHabits] = useState([]);
  //   const [userPorcent, setUserPorcent] = useState([0])

  return (
    // <UserContext.Provider value={{ config, setConfig, userData, setUserData, userHabits, setUserHabits, userPorcent, setUserPorcent }}>
    <UserContext.Provider value={{ config, setConfig, userData, setUserData, lsData, login, setLogin, setLsData }}>
      {children}
    </UserContext.Provider>
  );
};