import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { useState } from "react";
import { UserContext } from "../components/UserContext.js";
import { useContext } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TransactionsPage() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [operationPageDisable, setOperationPageDisable] = useState(false);
  const { tipo: type } = useParams();
  const { config, setUserData, userData } = useContext(UserContext);
  const navigate = useNavigate();
  // console.log(tipo);

  function getOperationData(event) {
    event.preventDefault();
    // console.log("botao");
    setOperationPageDisable(true);
    // console.log(config);
    // console.log(config.headers.Authorization);
    const operationSendableObject = {
      type,
      amount: Number(amount),
      description
    };
    // console.log(operationSendableObject);
    // console.log("antes promisse");
    const promise = axios.post(`http://localhost:5000/nova-transacao/${type}`, operationSendableObject, config);
    promise.then((res) => {
      // console.log("chegou no then");
      // console.log(res);
      setOperationPageDisable(false);
      // console.log(res.data);
      // setUserData(...)
      // console.log(userData);
      // console.log(res.data);
      setUserData(res.data);
      // console.log(userData);
      navigate('/home');
    });
    promise.catch((res) => {
      console.log("chegou no catch");
      alert(res.response.data);
      setOperationPageDisable(false);
    });
  }

  return (
    <TransactionsContainer>
      <h1>Nova {type}</h1>
      <form onSubmit={getOperationData}>
        {/* <input placeholder="Valor" type="text" /> */}
        <input disabled={operationPageDisable} required
          type="number" value={amount} onChange={e => setAmount(e.target.value)}
          placeholder="Valor" />
        {/* <input placeholder="Descrição" type="text" /> */}
        <input disabled={operationPageDisable} required
          type="text" value={description} onChange={e => setDescription(e.target.value)}
          placeholder="Descrição" />
        <button>Salvar {type}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
