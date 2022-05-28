import styled from "styled-components";
import loginLogo from "../assets/images/login.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { useContext } from "react";
import UserContext from "./Context/UserContext";

function Login() {
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login, setLogin } = useContext(UserContext);
  const navigate = useNavigate();

  function fazerLogin(event) {
    event.preventDefault();

    if (email !== "") {
      const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login`;
      const profileData = {
        email: email,
        password: senha,
      };
      console.log(profileData);
      const promise = axios.post(URL, profileData);
      setDisabled(true);

      promise.then((response) => {
        const { data } = response;
        setLogin(data);
        const dadosLoginString = JSON.stringify(data);
        console.log('login:',dadosLoginString)
        window.localStorage.setItem("dadosLogin", dadosLoginString);
        navigate("/hoje");
      });

      promise.catch((err) => {
        alert("Erro no Login, dados incorretos!");
        setDisabled(false);
      });
    }
  }

  function montarFormularioLogin() {
    return (
      <>
        <form>
          <input
            type="email"
            placeholder="email"
            disabled={disabled}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="senha"
            disabled={disabled}
            onChange={(e) => setSenha(e.target.value)}
          ></input>
          <button type="submit">
            {" "}
            {disabled === false ? (
              "Entrar"
            ) : (
              <Oval color="#00BFFF" height={40} width={40} />
            )}
          </button>
        </form>
        <Link to="/cadastro" style={{ color: "#52B6FF" }}>
          <h1>Não tem uma conta? Cadastre-se!</h1>
        </Link>
      </>
    );
  }
  const formularioLogin = montarFormularioLogin();

  return (
    <Container>
      <img src={loginLogo} alt="logo" />
      <FormularioLogin disabled={disabled} onSubmit={fazerLogin}>
        {formularioLogin}
      </FormularioLogin>
    </Container>
  );
}
export default Login;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  padding: 0 36px;
  padding-top: 68px;
  padding-bottom: 169px;

  img {
    height: 180px;
    width: 180px;
    margin-bottom: 33px;
  }
`;
const FormularioLogin = styled.div`
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  input {
    height: 45px;
    width: 303px;
    border-radius: 5px;
    margin-bottom: 6px;
    border: 1px solid #d4d4d4;
    font-family: Lexend Deca;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    font-family: Lexend Deca;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    padding-left: 11px;
    padding-bottom: 11px;
    padding-top: 9px;
    background-color: ${(props) => (props.disabled ? "#F2F2F2" : "#FFFFFF")};
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${(props) => (props.disabled ? "auto" : "45px")};
    opacity: ${(props) => (props.disabled ? 0.7 : 1)};
    color: #ffffff;
    width: 303px;
    border-radius: 4.6px;
    background-color: #52b6ff;
    border: 0;
    font-family: Lexend Deca;
    font-size: 21px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0em;
    margin-bottom: 25px;
  }
  h1 {
    font-family: Lexend Deca;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    color: #52b6ff;
  }
`;
