import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../components/UserContext.js";
import { UserContext } from "../components/UserContext.js";
// import dotenv from "dotenv";
// dotenv.config();




export default function SignInPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginPageDisable, setLoginPageDisable] = useState(false);
  const { setConfig, setUserData, lsData, login, setLogin } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (lsData) {
      const promise = axios.post(`${process.env.REACT_APP_API_URL}/signIn`, lsData);
      promise.then((res) => {
        setLoginPageDisable(false);
        const userToken = res.data.token;
        let username = res.data.username;
        username = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
        const userHistory = res.data.userHistory;
        console.log(res.data)
        const config = {
          headers: {
            "Authorization": `Bearer ${userToken}`
          }
        }
        const userData = {
          username,
          userHistory
        };
        setUserData(userData);
        setConfig(config);
        navigate('/home');
      });
      promise.catch((res) => {
        alert(res.response.data);
        setLoginPageDisable(false);
        setPassword("");
      });
    }
  }, [])

  function getLoginData(event) {
    event.preventDefault();
    setLoginPageDisable(true);
    const loginSendableObject = {
      email,
      password
    };
    console.log(process.env.REACT_APP_API_URL);
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/signIn`, loginSendableObject);
    promise.then((res) => {
      console.log("then");
      setLogin(loginSendableObject);
      setLoginPageDisable(false);
      const userToken = res.data.token;
      let username = res.data.username;
      username = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
      const userHistory = res.data.userHistory;
      console.log(res.data)
      const config = {
        headers: {
          "Authorization": `Bearer ${userToken}`
        }
      }
      const userData = {
        username,
        userHistory
      };
      setUserData(userData);
      setConfig(config);
      console.log(userData)
      console.log(loginSendableObject);
      localStorage.setItem("user", JSON.stringify(loginSendableObject))
      navigate('/home');
    });
    promise.catch((res) => {
      console.log("catch");
      alert(res.response.data);
      setLoginPageDisable(false);
      setPassword("");
    });
  }


  // useEffect(() => {
  //   console.log("test");
  // }, []);

  return (
    <SingInContainer>
      <form onSubmit={getLoginData}>
        <MyWalletLogo />
        <input disabled={loginPageDisable} required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input disabled={loginPageDisable} minLength={3} required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" autocomplete="new-password" />
        <button disabled={loginPageDisable} type="submit">Entrar</button>
      </form >

      <Link to={`/cadastro`}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
