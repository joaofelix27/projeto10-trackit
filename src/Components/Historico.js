import Footer from "./Footer";
import Header from "./Header";
import styled from "styled-components";
import UserContext from "./Context/UserContext";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Historico() {
  const { login, setLogin } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const dadosLogin = window.localStorage.getItem("dadosLogin");
    if (dadosLogin) {
      const dadosLoginOBJ = JSON.parse(dadosLogin);
      setLogin(dadosLoginOBJ);
    } else {
      navigate("/");
    }
  }, [setLogin, navigate]);
  useEffect(() => {
    if (login.token) {
      const config = {
        headers: {
          Authorization: "Bearer " + login.token,
        },
      };
      const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`;
      const promise = axios
        .get(URL, config)
        .then((response) => {
          const { data } = response;
        })
        .catch((err) => {
          const message = err.response.statusText;
          alert(message);
        });
    }
  }, [login]);
  return (
    <>
      <Header />
      <Container>
        <h1>Histórico</h1>
        <h2>Em breve você poderá ver o histórico dos seus hábitos aqui!</h2>
      </Container>
      <Footer />
    </>
  );
}
export default Historico;

const Container = styled.section`
  background-color: #f2f2f2;
  height: 100vh;
  padding: 98px 18px;
  overflow-y: scroll;
  h1 {
    font-family: Lexend Deca;
    font-size: 23px;
    font-weight: 400;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;
    color: #126ba5;
  }
  h2 {
      margin-top:17px;
    font-family: Lexend Deca;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    color: #666666;
  }
`;
