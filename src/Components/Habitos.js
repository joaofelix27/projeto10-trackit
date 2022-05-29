import Footer from "./Footer";
import Header from "./Header";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import UserContext from "./Context/UserContext";
import { useNavigate } from "react-router-dom";

function Habitos() {
  const diasBase = [
    { text: "D", day: "domingo", status: "normal" },
    { text: "S", day: "segunda", status: "normal" },
    { text: "T", day: "terça", status: "normal" },
    { text: "Q", day: "quarta", status: "normal" },
    { text: "Q", day: "quinta", status: "normal" },
    { text: "S", day: "sexta", status: "normal" },
    { text: "S", day: "sábado", status: "normal" },
  ];
  const [criarHabito, setCriarHabito] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [selecionados, setSelecionados] = useState([]);
  const [habitosCriados, setHabitosCriados] = useState([]);
  const [name, setName] = useState("");
  const { login, setLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const [dias, setDias] = useState(diasBase);
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
      const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`;
      const promise = axios
        .get(URL, config)
        .then((response) => {
          const { data } = response;
          setHabitosCriados(data);
        })
        .catch((err) => {
          const message = err.response.statusText;
          alert(message);
        });
    }
  }, [login]);

  function adicionaHabito() {
    const config = {
      headers: {
        Authorization: "Bearer " + login.token,
      },
    };
    const body = {
      name: name,
      days: selecionados,
    };
    setDisabled(true);

    const promisse = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      body,
      config
    );
    promisse.then((response) => {
      const novosHabitosCriados = [...habitosCriados, response.data];
      setHabitosCriados(novosHabitosCriados);
      setDisabled(false);
      setCriarHabito(false);
      setName("");
      setDias(diasBase);
      setSelecionados([]);
    });
    promisse.catch((erro) => {
      alert("Hábito não adicionado, tente novamente!");
      setDisabled(false);
    });
  }
  function selecionar(index) {
    const novoDias = [...dias];
    const diasSelecionados = [];
    if (novoDias[index].status === "normal") {
      novoDias[index].status = "selecionado";
    } else {
      novoDias[index].status = "normal";
    }
    for (let i = 0; i < novoDias.length; i++) {
      if (novoDias[i].status === "selecionado") {
        diasSelecionados.push(i);
      }
    }
    setDias(novoDias);
    setSelecionados(diasSelecionados);
  }
  function deletarHabito(id) {
    const config = {
      headers: {
        Authorization: "Bearer " + login.token,
      },
    };
    const promisse = axios.delete(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
      config
    );
    promisse.then(() => {
      const novosHabitosCriados = habitosCriados.filter(
        (habito) => habito.id !== id
      );
      setHabitosCriados(novosHabitosCriados);
    });
    promisse.catch(() => {
      alert("Hábito não deletado, tente novamente");
    });
  }
  function montarHabitos() {
    return (
      <HabitosBody disabled={disabled}>
        <Topo>
          <h1>Meus hábitos</h1>
          <button onClick={() => setCriarHabito(!criarHabito)}>
            <ion-icon name="add-outline"></ion-icon>
          </button>
        </Topo>
        {criarHabito === true ? (
          <Body disabled={disabled}>
            <input
              type="text"
              disabled={disabled}
              placeholder="nome do hábito"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <div>
              {dias.map((dia, index) => (
                <div
                  key={index}
                  onClick={() => selecionar(index)}
                  className={dia.status}
                >
                  {dia.text}
                </div>
              ))}
            </div>

            <div className="base">
              <h1 onClick={() => setCriarHabito(false)}>Cancelar</h1>
              <button
                onClick={() => {
                  if (name && selecionados.length !== 0) {
                    adicionaHabito();
                  } else {
                    alert("Preencha as informações corretamente");
                  }
                }}
              >
                {disabled === false ? (
                  "Salvar"
                ) : (
                  <Oval color="#00BFFF" height={25} width={25} />
                )}
              </button>
            </div>
          </Body>
        ) : (
          ""
        )}

        {habitosCriados == "" ? (
          <h1 className="noTrack">
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </h1>
        ) : (
          <div>
            {habitosCriados.map((habito, index1) => (
              <div className="habitos" key={index1}>
                <h1>{habito.name}</h1>
                <ion-icon
                  onClick={() => {
                    if (window.confirm("Você realmente quer deletar?")) {
                      deletarHabito(habito.id);
                    }
                  }}
                  name="trash-outline"
                ></ion-icon>
                <div>
                  {dias.map((dia, index) => (
                    <div
                      key={index}
                      className={
                        habito.days.some((day) => day === index)
                          ? "selecionado"
                          : "normal"
                      }
                    >
                      {dia.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </HabitosBody>
    );
  }
  const habitos = montarHabitos();
  return (
    <>
      <Header />
      <Container>{habitos}</Container>
      <Footer />
    </>
  );
}
export default Habitos;

const Container = styled.section`
  background-color: #f2f2f2;
  height: 100vh;
  padding: 98px 18px;
  overflow-y:scroll;
`;
const Topo = styled.div`
  display: flex;
  justify-content: space-between;
`;
const HabitosBody = styled.div`
  .habitos {
    margin-top: 20px;
    height: 91px;
    width: 340px;
    border-radius: 5px;
    background-color: #ffffff;
    border: 1px solid #d4d4d4;
    padding: 0 15px;
    padding-top: 13px;
    position: relative;
    div {
      display: flex;
      margin-top: 4px;
    }
    ion-icon {
      position: absolute;
      right: 10px;
      top: 11px;
      font-size: 20px;
    }

    h1 {
      font-family: Lexend Deca;
      font-size: 20px;
      font-weight: 400;
      line-height: 25px;
      letter-spacing: 0em;
      text-align: left;
      color: #666666;
    }
    .normal {
      margin-right: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      width: 30px;
      background-color: #ffffff;
      border: 1px solid #d4d4d4;
      border-radius: 5px;
      font-family: Lexend Deca;
      font-size: 20px;
      font-weight: 400;
      line-height: 25px;
      color: #dbdbdb;
    }
    .selecionado {
      margin-right: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      width: 30px;
      background-color: #cfcfcf;
      border: 1px solid #cfcfcf;
      border-radius: 5px;
      font-family: Lexend Deca;
      font-size: 20px;
      font-weight: 400;
      line-height: 25px;
      color: #ffffff;
    }
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 40px;
    border-radius: 4.63px;
    background-color: #52b6ff;
    color: #ffffff;
    font-family: Lexend Deca;
    font-size: 27px;
    font-weight: 400;
    line-height: 34px;
    border: 0;
  }
  h1 {
    font-family: Lexend Deca;
    font-size: 23px;
    font-weight: 400;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;
    color: #126ba5;
  }
  .noTrack {
    margin-top: 28px;
    font-family: Lexend Deca;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    color: #666666;
  }
`;

const Body = styled.div`
  margin-top: 20px;
  height: 180px;
  width: 340px;
  border-radius: 5px;
  background-color: #ffffff;
  border: 1px solid #d4d4d4;
  padding: 0 18px;
  padding-top: 18px;

  input {
    height: 45px;
    width: 303px;
    border-radius: 5px;
    border: 0px;
    font-family: Lexend Deca;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    padding-left: 11px;
    border: 1px solid #d4d4d4;
    color: ${(props) => (props.disabled ? "#B3B3B3" : "#666666")};
    background-color: ${(props) => (props.disabled ? "#F2F2F2" : "#FFFFFF")};
  }
  div {
    display: flex;
    margin-top: 4px;
  }
  .base {
    margin-top: 29px;
    display: flex;
    justify-content: right;
    align-items: center;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 35px;
      width: 84px;
      border-radius: 4.636363506317139px;
      background-color: #52b6ff;
      color: #ffffff;
      font-family: Lexend Deca;
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0em;
      margin-left: 23px;
      opacity: ${(props) => (props.disabled ? 0.7 : 1 )};
    }

    h1 {
      font-family: Lexend Deca;
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: center;
      color: #52b6ff;
    }
  }

  .normal {
    margin-right: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    background-color: #ffffff;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    font-family: Lexend Deca;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    color: #dbdbdb;
    pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  }
  .selecionado {
    margin-right: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    background-color: #cfcfcf;
    border: 1px solid #cfcfcf;
    border-radius: 5px;
    font-family: Lexend Deca;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    color: #ffffff;
    pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  }
`;
