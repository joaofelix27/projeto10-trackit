import Footer from './Footer';
import Header from './Header'
import styled from 'styled-components';
import {  useState } from 'react';

function Habitos() {
    const [criarHabito, setCriarHabito ]= useState(false);
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
                <div>
                    <h1>Meus hábitos</h1>
                    <button onClick={()=>setCriarHabito(!criarHabito)}>+</button>
                </div>
                {criarHabito===true ? 
                <div>
                Opa
                </div> : "Nada"
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
    margin-top: 98px;
`;
const HabitosBody = styled.div`
    div {
        display:flex;
        justify-content:space-between;
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
`;
