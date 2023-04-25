import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext.js";
import { useContext } from 'react';
import axios from "axios";

export default function HomePage() {

  const { userData, config } = useContext(UserContext);

  const navigate = useNavigate();

  function logout() {
    console.log(config);
    const promise = axios.delete('http://localhost:5000/logout', config);
    promise.then((res) => {
      console.log(res);
      navigate('/');
    });
    promise.catch((res) => {
      alert(res.response.data);
    });
  }
  // console.log(userData);
  // console.log(userData.username);
  const balanceIndex = (userData.userHistory.length) - 1;
  // console.log(balanceIndex)
  // console.log(userData.userHistory)

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
          <Value color={"positivo"}>{userData.userHistory[balanceIndex].balance.toFixed(2)}</Value>
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