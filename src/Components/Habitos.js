import Footer from './Footer';
import Header from './Header'
import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from "./Context/UserContext";

function Habitos() {
    const [criarHabito, setCriarHabito] = useState(false);
    const [selecionados, setSelecionados] = useState([]);
    const [habitosCriados, setHabitosCriados] = useState([]);
    const [name, setName] = useState("");
    const { login, setLogin } = useContext(UserContext);
    const diasBase = [
        { text: "D", day: "domingo", status: "normal" },
        { text: "S", day: "segunda", status: "normal" },
        { text: "T", day: "terça", status: "normal" },
        { text: "Q", day: "quarta", status: "normal" },
        { text: "Q", day: "quinta", status: "normal" },
        { text: "S", day: "sexta", status: "normal" },
        { text: "S", day: "sábado", status: "normal" },
    ]
    const [dias, setDia] = useState(diasBase);
    useEffect(() => {
        const config = {
            headers: {
                Authorization: "Bearer " + login.token
            }
        }
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`;
        const promise = axios.get(URL, config);

        promise.then(response => {
            const { data } = response;
            setHabitosCriados(data)
            console.log(habitosCriados)
        });

        promise.catch(err => {
            const message = err.response.statusText;
            alert(message);
        });
    }, []);

    function mandarPost() {

        const config = {
            headers: {
                Authorization: "Bearer " + login.token
            }
        }
        const body = {
            name: name,
            days: selecionados
        }
        console.log(login.token)
        const promisse = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', body, config)
        promisse.then(response =>
            console.log(response.data)
        )
        promisse.catch(erro => {
            console.log("Deu ruim")
        })
        setCriarHabito(false)
    }


    function selecionar(index) {
        const novoDias = [...dias]
        const diasSelecionados = []
        if (novoDias[index].status === "normal") {
            novoDias[index].status = "selecionado"
        } else { novoDias[index].status = "normal" }
        for (let i = 0; i < novoDias.length; i++) {
            if (novoDias[i].status == "selecionado") {
                diasSelecionados.push(i + 1)
            }
        }
        setDia(novoDias)
        console.log(novoDias)
        setSelecionados(diasSelecionados)
        console.log(selecionados)
    }
    function montarHabitos() {
        return (
            <HabitosBody>
                <div className='topo'>
                    <h1>Meus hábitos</h1>
                    <button onClick={() => setCriarHabito(!criarHabito)}><ion-icon name="add-outline"></ion-icon></button>
                </div>
                {criarHabito === true ?
                    <div className='body'>
                        <input type="text" placeholder='nome do hábito' onChange={e => setName(e.target.value)}  ></input>
                        <div>
                            {dias.map((dia, index) =>
                                <div key={index} onClick={() => selecionar(index)} className={dia.status}>
                                    {dia.text}
                                </div>
                            )}
                        </div>
                        <div className='base' >
                            <h1>Cancelar</h1>
                            <button onClick={() => mandarPost()} >Salvar</button>
                        </div>

                    </div> : ""
                }

                {habitosCriados == [] ? <h1 className='noTrack'>  Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear! </h1> :
                    <div>
                        {habitosCriados.map((habito, index1) =>
                            <div className='habitos' key={index1}  >
                                <h1>{habito.name}</h1>
                                <div>
                                    {dias.map((dia, index) =>
                                        <div key={index} className={habito.days.some(day=>day==index)?"selecionado":"normal"}>
                                            {dia.text}
                                        </div>
                                    )}
                                    {/* {habito.days.map((dia, index) =>
                                        <div key={index} onClick={() => selecionar(index)} className={dia==index ? "selecionado" : "normal"}>
                                            {dia}
                                        </div>
                                    )} */}
                                </div>
                            </div>

                        )}
                    </div>
                }
            </HabitosBody>
        )
    }
    const habitos = montarHabitos()
    return (
        <>
            <Header />
            <Container>
                {habitos}
            </Container>
            <Footer />
        </>
    )
}
export default Habitos;

const Container = styled.section`
    padding: 0 18px;
    padding-top:98px;
`;
const HabitosBody = styled.div`

    .topo {
        display:flex;
        justify-content:space-between;
    }
    .habitos{
        margin-top: 20px;
        height: 91px;
        width: 340px;
        border-radius: 5px;
        background-color: #FFFFFF;
        border: 1px solid #D4D4D4;
        padding:0 15px;
        padding-top:13px;
        div{
            display:flex;
            margin-top:4px;
        }

        h1{
            font-family: Lexend Deca;
            font-size: 20px;
            font-weight: 400;
            line-height: 25px;
            letter-spacing: 0em;
            text-align: left;
            color: #666666;

        }
        .normal {
            margin-right:4px;
            display:flex;
            align-items:center;
            justify-content:center;
            height: 30px;
            width: 30px;
            background-color: #FFFFFF;
            border: 1px solid #D4D4D4;
            border-radius: 5px;
            font-family: Lexend Deca;
            font-size: 20px;
            font-weight: 400;
            line-height: 25px;
            color: #DBDBDB;
        }
        .selecionado {
            margin-right:4px;
            display:flex;
            align-items:center;
            justify-content:center;
            height: 30px;
            width: 30px;
            background-color: #CFCFCF;
            border: 1px solid #CFCFCF;
            border-radius: 5px;
            font-family: Lexend Deca;
            font-size: 20px;
            font-weight: 400;
            line-height: 25px;
            color: #FFFFFF;

        }
    }
    .body {
        margin-top: 20px;
        height: 180px;
        width: 340px;
        border-radius: 5px;
        background-color: #FFFFFF;
        border: 1px solid #D4D4D4;
        padding:0 18px;
        padding-top:18px;

        input {
            height: 45px;
            width: 303px;
            border-radius: 5px;
            border:0px;
            font-family: Lexend Deca;
            font-size: 20px;
            font-weight: 400;
            line-height: 25px;
            padding-left:11px;
            border: 1px solid #D4D4D4;
            color: #666666;
        }
        div{
            display:flex;
            margin-top:4px;
        }
        .base{
            margin-top:29px;
            display:flex;
            justify-content:right;
            align-items:center;

            button{
            height: 35px;
            width: 84px;
            border-radius: 4.636363506317139px;
            background-color: #52B6FF;
            color: #FFFFFF;
            font-family: Lexend Deca;
            font-size: 16px;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: 0em;
            text-align: center;
            margin-left:23px;
        }

        h1 {
            font-family: Lexend Deca;
            font-size: 16px;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: 0em;
            text-align: center;
            color: #52B6FF;

        }
        }
       
        .normal {
            margin-right:4px;
            display:flex;
            align-items:center;
            justify-content:center;
            height: 30px;
            width: 30px;
            background-color: #FFFFFF;
            border: 1px solid #D4D4D4;
            border-radius: 5px;
            font-family: Lexend Deca;
            font-size: 20px;
            font-weight: 400;
            line-height: 25px;
            color: #DBDBDB;
        }
        .selecionado {
            margin-right:4px;
            display:flex;
            align-items:center;
            justify-content:center;
            height: 30px;
            width: 30px;
            background-color: #CFCFCF;
            border: 1px solid #CFCFCF;
            border-radius: 5px;
            font-family: Lexend Deca;
            font-size: 20px;
            font-weight: 400;
            line-height: 25px;
            color: #FFFFFF;

        }
    }
    
    button{
        display:flex;
        justify-content:center;
        align-items:center;
        height: 35px;
        width: 40px;
        border-radius: 4.63px;
        background-color: #52B6FF;
        color:#FFFFFF;
        font-family: Lexend Deca;
        font-size: 27px;
        font-weight: 400;
        line-height: 34px;
        border:0;
    }
    h1 {
        font-family: Lexend Deca;
        font-size: 23px;
        font-weight: 400;
        line-height: 29px;
        letter-spacing: 0em;
        text-align: left;
        color: #126BA5;

    }
    .noTrack {
    margin-top:28px;
    font-family: Lexend Deca;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    color: #666666;
}
`;
