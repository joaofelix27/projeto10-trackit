import styled from "styled-components";
import axios from "axios";
import UserContext from "./Context/UserContext";
import { useState, useContext } from "react";

function HabitosHoje({
  name,
  id,
  done,
  currentSequence,
  highestSequence,
  setClick,
  click,
}) {
  const { login } = useContext(UserContext);

  function marcarDesmarcar(id, done) {
    const config = {
      headers: {
        Authorization: "Bearer " + login.token,
      },
    };
    if (!done) {
      const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;
      const promise = axios
        .post(URL, "", config)
        .then((response) => {
          console.log(response);
          setClick(!click);
        })
        .catch((err) => {
          const message = err.response.statusText;
          alert(message);
        });
    } else {
      const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;
      const promise = axios
        .post(URL, "", config)
        .then((response) => {
          console.log(response);
          setClick(!click);
        })
        .catch((err) => {
          const message = err.response.statusText;
          alert(message);
        });
    }
  }

  return (
    <Habito done={done}>
      <HabitoEsquerda done={done} currentSequence={currentSequence} highestSequence={highestSequence}>
        <h1>{name} </h1>
        <div>
          <h2>Sequência atual:</h2> <h3> {currentSequence} dias</h3>
        </div>
        <div>
          <h2>Seu recorde: </h2> <h4> {highestSequence} dias</h4>
        </div>
      </HabitoEsquerda>
      <ion-icon
        onClick={() => marcarDesmarcar(id, done)}
        name="checkbox"
      ></ion-icon>
    </Habito>
  );
}
export default HabitosHoje;

const Habito = styled.div`
  height: 94px;
  width: 340px;
  border-radius: 5px;
  background: #ffffff;
  padding: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  ion-icon {
    font-size: 89px;
    color: ${(props) => (props.done ? "#8FC549" : "#EBEBEB")};
  }
`;

const HabitoEsquerda = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-family: Lexend Deca;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;
    color: #666666;
    margin-bottom:8px;
  }
  div {
    display: flex;

    h2 {
      font-family: Lexend Deca;
      font-size: 13px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: left;
      color: #666666;
    }
    h3 {
      font-family: Lexend Deca;
      font-size: 13px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: left;
      color: ${(props) => (props.done ? "#8FC549" : "#666666")};
      margin-left:4px;
    }
    h4 {
      font-family: Lexend Deca;
      font-size: 13px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: left;
      color:${(props) => (props.highestSequence>0 ? props.highestSequence===props.currentSequence ? "#8FC549" : "#666666":'#666666' )};
      margin-left:4px;
    }
    
  }
`;
