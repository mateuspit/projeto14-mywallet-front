import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState, useContext } from "react"
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
  const { setConfig, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  function getLoginData(event) {
    event.preventDefault();
    setLoginPageDisable(true);
    const loginSendableObject = {
      email,
      password
    };
    // console.log("apertou botão?");
    console.log(process.env.REACT_APP_API_URL);
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/signIn`, loginSendableObject);
    // const promise = axios.post(`http://localhost:5000/signIn`, loginSendableObject);
    promise.then((res) => {
      // console.log("chegou no then");
      // console.log(res);
      setLoginPageDisable(false);
      const userToken = res.data.token;
      let username = res.data.username;
      username = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
      // console.log(userToken);
      // console.log(username);

      const userHistory = res.data.userHistory;
      // console.log(res.data.username)

      // const userImage = res.data.image;
      navigate('/home');
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
      // console.log(config);
      // const userObject = { userImage: userImage }
      // setUserData(userObject);

    });
    promise.catch((res) => {
      // console.log("chegou no catch");
      // console.log(res);
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
