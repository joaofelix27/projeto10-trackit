import styled from 'styled-components';
import login from "../assets/images/login.png"
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';



function Login() {
  const [disabled, setDisabled]=useState(false)

  function montarFormularioLogin (){
    return (
      <>
       <form>
        <input disabled={disabled} type="email" placeholder='email'  ></input>
        <input disabled={disabled} type="password" placeholder='senha'  ></input>
        <button>Entrar</button>
      </form>
      <Link to="/cadastro" style={{ color: '#52B6FF' }}>
      <h1>Não tem uma conta? Cadastre-se!</h1>
      </Link>
      </>
    )
  }
  const formularioLogin = montarFormularioLogin()

  return (
    <Container>
      <img src={login} alt="logo" />
      <FormularioLogin>{formularioLogin}</FormularioLogin>

    </Container>
  )
}
export default Login;
const Container = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width: 100%;
  cursor: pointer;
  padding: 0 36px;
  padding-top: 68px;
  padding-bottom:169px;
  
  img {
    height: 180px;
    width: 180px;
    margin-bottom:33px;
  }
`;
const FormularioLogin = styled.div`
  form{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
  
  input{
    height: 45px;
    width: 303px;
    border-radius: 5px;
    margin-bottom:6px;
    border: 1px solid #D4D4D4;
    background-color: #FFFFFF;
    font-family: Lexend Deca;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    font-family: Lexend Deca;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    color: #DBDBDB;
    padding-left:11px;
    padding-bottom:11px;
    padding-top:9px;

  }


  button {
    height: 45px;
    width: 303px;
    border-radius: 4.6px;
    background-color: #52B6FF;
    border: 0;
    font-family: Lexend Deca;
    font-size: 21px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0em;
    color: #FFFFFF;
    margin-bottom:25px;
  }
  h1{
    font-family: Lexend Deca;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    color: #52B6FF;
  }
`;