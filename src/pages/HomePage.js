import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext.js";
import { useContext, useEffect } from 'react';
import axios from "axios";

export default function HomePage() {
  const { userData, config, lsData, setConfig, setUserData, setLsData } = useContext(UserContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!lsData) {
  //     console.log("lsData")
  //     const localStoreObject = {
  //       username: userData.username,
  //       token: config.headers.Authorization?.replace("Bearer ", "")
  //     };
  //     console.log(localStoreObject);
  //     localStorage.setItem("user", JSON.stringify(localStoreObject))
  //     console.log("gravou");
  //   }
  //   else {
  //     console.log("sem lsData")
  //     const promise = axios.get(`${process.env.REACT_APP_API_URL}/transacoes`, {
  //       headers: {
  //         Authorization: `Bearer ${lsData.token}`
  //       }
  //     });
  //     promise.then((res) => {
  //       console.log(res);
  //       const userToken = res.data.token;
  //       let username = res.data.username;
  //       username = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
  //       const userHistory = res.data.userHistory;
  //       const config = {
  //         headers: {
  //           "Authorization": `Bearer ${userToken}`
  //         }
  //       }
  //       const userData = {
  //         username,
  //         userHistory
  //       };
  //       setUserData(userData);
  //       setConfig(config);
  //     });
  //     promise.catch((res) => {
  //       alert(res.response.data);
  //     });
  //   }
  // }, []);

  function logout() {
    console.log(config);
    const promise = axios.delete('http://localhost:5000/logout', config);
    promise.then((res) => {
      console.log(res);
      localStorage.removeItem("user")
      setLsData(false);
      navigate('/');
    });
    promise.catch((res) => {
      alert(res.response.data);
    });
  }
  // console.log(userData);
  // console.log(userData.username);
  // let balanceIndex = 0;
  // if (!userData.userHistory) {
  //   userData.userHistory = [];
  //   balanceIndex = 0;
  //   userData.userHistory[balanceIndex] = {
  //     balance: 0
  //   };
  //   userData.userHistory[balanceIndex].balance = userData.userHistory[balanceIndex].balance.toFixed(2);
  // } else {
  //   balanceIndex = userData.userHistory.length - 1;
  //   userData.userHistory[balanceIndex].balance = userData.userHistory[balanceIndex].balance.toFixed(2);
  // }
  function getBalance() {
    if (userData.userHistory.length === 0) {

      return (
        <Value color={"positivo"}>0</Value>
      );
    }
    else {
      const balanceIndex = userData.userHistory.length - 1;
      const userBalance = userData.userHistory[balanceIndex].balance.toFixed(2)
      return (
        <Value color={userBalance >= 0 ? "positivo" : "negativo"}>{userBalance}</Value>
      );
    }
  }

  // console.log(balanceIndex)
  // console.log(userData.userHistory)
  // useEffect(() => {
  //   console.log(userData);
  // }, []);

  function plotOperations(userHistory) {
    let userDescription = "";
    if (userHistory.description.length > 16) {
      userDescription = userHistory.description.slice(0, 16) + "...";
    }
    else {
      userDescription = userHistory.description
    }
    if (userHistory.type.toLowerCase() === "saida") {
      return (
        <ListItemContainer>
          <div>
            <span>{userHistory.date}</span>
            <OperationDescription><strong>{userDescription}</strong></OperationDescription>
          </div>
          <Value color={"negativo"}><strong>{userHistory.amount.toFixed(2)}</strong></Value>
        </ListItemContainer>
      );
    }
    else {
      return (
        <ListItemContainer>
          <div>
            <span>{userHistory.date}</span>
            <OperationDescription><strong>{userDescription}</strong></OperationDescription>
          </div>
          <Value color={"positivo"}>{userHistory.amount.toFixed(2)}</Value>
        </ListItemContainer>
      );
    }
  }
  // console.log(userData.userHistory[balanceIndex].balance.toFixed(2));
  // console.log(balanceIndex);
  // console.log(userData.userHistory);
  console.log(userData); 
  // console.log(userHistory);

  return (
    <HomeContainer>
      <Header>
        <HelloUser>Olá, {userData.username}</HelloUser>
        <BiExit style={{ cursor: 'pointer' }} onClick={logout} />
      </Header>

      <TransactionsContainer>
        <OperationsList>
          {userData.userHistory.map((uh) => plotOperations(uh))}
        </OperationsList>

        <article>
          <strong>Saldo</strong>
          {getBalance()}
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate('/nova-transacao/entrada')}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate('/nova-transacao/saida')}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}



const OperationsList = styled.ul`
  overflow-y: scroll;
  line-height: 19px;
  max-height: 100%;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const OperationDescription = styled.strong`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const HelloUser = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 31px;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  max-height: 65%;
  /* padding-bottom: 19px; */
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`