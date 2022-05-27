import Footer from './Footer';
import Header from './Header'
import styled from 'styled-components';
import { useState } from 'react';

function Habitos() {
    const [criarHabito, setCriarHabito] = useState(false);
    const dias = [
        { text: "D", day: "domingo" },
        { text: "S", day: "segunda" },
        { text: "T", day: "terça" },
        { text: "Q", day: "quarta" },
        { text: "Q", day: "quinta" },
        { text: "S", day: "sexta" },
        { text: "S", day: "sábado" },
    ]
    function montarHabitos() {
        return (
            <HabitosBody>
                <div className='topo'>
                    <h1>Meus hábitos</h1>
                    <button onClick={() => setCriarHabito(!criarHabito)}><ion-icon name="add-outline"></ion-icon></button>
                </div>
                {criarHabito === true ?
                    <div className='body'>
                        <input type="text" placeholder='nome do hábito'  ></input>
                        <div>
                        {dias.map((dia, index) =>
                            <div className='dias'>
                                {dia.text}
                            </div>
                        )}
                        </div>
                      

                    </div> : ""
                }
                <h1 className='noTrack'>  Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear! </h1>
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
            margin-top:8px;
        }
        .dias {
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
