import Footer from "./Footer";
import Header from "./Header";
import UserContext from "./Context/UserContext";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import HabitosHoje from "./HabitosHoje";
import styled from "styled-components";

function Hoje() {
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
  }, [setLogin]);
  useEffect(() => {
    if (login.token) {
      const config = {
        headers: {
          Authorization: "Bearer " + login.token,
        },
      };
      const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`;
      const promise = axios
        .get(URL, config)
        .then((response) => {
          const { data } = response;
          console.log(data);
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
        <DiaSemana>
          <h1>Dia da Semana</h1>
          <h2>Nenhum hábito concluido ainda</h2>
        </DiaSemana>
        <HabitosHoje />
      </Container>
      <Footer />
    </>
  );
}
export default Hoje;

const Container = styled.section`
  padding: 98px 18px;
  background-color: #f2f2f2;
  height: 100vh;
`;

const DiaSemana = styled.div`
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
    font-family: Lexend Deca;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    color: #BABABA;
  }
`;
