import Footer from "./Footer";
import Header from "./Header";
import UserContext from "./Context/UserContext";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import HabitosHoje from "./HabitosHoje";
import styled from "styled-components";
import dayjs from 'dayjs';

function Hoje() {
  const dias= ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado']
  const { login, setLogin } = useContext(UserContext);
  const [habitosHoje, setHabitosHoje] = useState([])
  const [click, setClick]= useState(false)
  const [checks, setChecks]= useState([]);
  const { percentage,setPercentage } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const dadosLogin = window.localStorage.getItem("dadosLogin");
    if (dadosLogin) {
      const dadosLoginOBJ = JSON.parse(dadosLogin);
      setLogin(dadosLoginOBJ);
    } else {
      navigate("/");
    }
  }, [setLogin,navigate]);
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
          setHabitosHoje(data);
          const filtraCheck= data.filter ( habito=> habito.done)
          setChecks(filtraCheck)
          const porcentagem =((filtraCheck.length/data.length)*100).toFixed(0)
          setPercentage(porcentagem)
        })
        .catch((err) => {
          const message = err.response.statusText;
          alert(message);
        });
    }
  }, [login,click,setPercentage]);
  return (
    <>
      <Header />
      <Container>
        <DiaSemana checks={checks}>
          <h1>{`${dias[dayjs().format('d')]}, ${dayjs().format('DD')}/${dayjs().format('MM')}`}</h1>
          {checks.length===0 ? <h2>Nenhum hábito concluido ainda</h2> : <h2>{`${percentage}% dos hábitos já concluídos`}</h2>}
        </DiaSemana>
        <ContainerHabitosHoje>
            {
                habitosHoje ? 
                habitosHoje.map ((habito) =>
                    <HabitosHoje key={habito.id} click={click} setClick={setClick} id={habito.id} done={habito.done} name={habito.name} 
                    currentSequence={habito.currentSequence} highestSequence={habito.highestSequence}/>
                    ) : "Carregando"
            }
        </ContainerHabitosHoje>
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
  overflow-y:scroll;
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
    color: ${props => props.checks.length===0 ? '#bababa' : '#8FC549'}
  }
`;

const ContainerHabitosHoje = styled.div`
  margin-top: 28px;
`;
