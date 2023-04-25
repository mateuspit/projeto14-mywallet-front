import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignUpPage() {
  const [signInPageDisable, setSignInPageDisable] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function getSignInData(event) {
    event.preventDefault();
    setSignInPageDisable(true);
    const signInSendableObject = {
      email,
      password,
      username
    };
    if (password === passwordConfirm) {
      const promise = axios.post('http://localhost:5000/cadastro', signInSendableObject);
      promise.then((res) => {
        setSignInPageDisable(false);
        console.log(res);
        navigate('/');
      });
      promise.catch((res) => {
        alert(res.response.data);
        setSignInPageDisable(false);
      });
    }
    else {
      alert("Senhas incompativeis, preenche senha e confirmar senha de novo!");
      setPassword("");
      setPasswordConfirm("");
      setSignInPageDisable(false);
    }
  }

  return (
    <SingUpContainer>
      <form onSubmit={getSignInData}>
        <MyWalletLogo />
        <input required disabled={signInPageDisable}
          type="text"
          value={username} onChange={e => setUsername(e.target.value)}
          placeholder="Nome" />
        <input required disabled={signInPageDisable}
          type="email"
          value={email} onChange={e => setEmail(e.target.value)}
          placeholder="E-mail" />
        <input required disabled={signInPageDisable}
          value={password} onChange={e => setPassword(e.target.value)}
          type="password"
          minLength={3}
          placeholder="Senha"
          autocomplete="new-password" />
        {/* <input placeholder="Confirme a senha" type="password" autocomplete="new-password" /> */}
        <input required disabled={signInPageDisable}
          value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)}
          type="password"
          minLength={3}
          placeholder="Confirme a senha"
          autocomplete="new-password" />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to={`/`}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
